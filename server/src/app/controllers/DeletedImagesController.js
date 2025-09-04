import DeletedImages from '../models/DeletedImages.js';
import Images from '../models/Images.js';
import extractPublicId from '../../utils/extractUtils.js';
import cloudinary from '../../config/cloudinary.js';
class DeletedImagesController {
    constructor(){
        this.deletedImagesModel = new DeletedImages();
        this.imagesModel = new Images();
    }
 
    async showAllDeletedImages(req, res) {
        try {
            const { id } = req.user; 
            const deletedImages = await this.deletedImagesModel.getAllDeletedImages(id);;
            return res.status(200).json({ data: deletedImages, message: "Successfully got all deleted images" });
        } catch (error) {            
            console.error("Error:", error.message);
            return res.status(500).json({ message: "Fail to get all deteted images" });
        }
    }

    async restoreDeletedImages(req, res) {
        try {
            const id = req.params.id;
            // step1: get and check exist deletedImage 
            const dataDeletedImage = await this.deletedImagesModel.getDeletedImageById(id);
            
            if (!dataDeletedImage) return res.status(404).json({ message: "Image not found in deleted images" });
            
            const { url, deletedBy } = dataDeletedImage; // get information deletedImage
            await this.imagesModel.create(url, deletedBy); //step2: restore by add image into table Images
            await this.deletedImagesModel.deleteById(id); //step3: delete deletedImage
            return res.status(200).json({ message: "Image restored successfully" });
        } catch (error) {
            console.error("Error:", error.message);
            return res.status(500).json({ message: "Failed to restore image" });
        }
    }

    async restoreMultipleDeletedImage(req, res) {
        const listIdDeletedImage = req.body;

        if (!Array.isArray(listIdDeletedImage) || listIdDeletedImage.length === 0) {
            return res.status(400).json({ message: "Invalid input" });
        }

        let successCount = 0;
        let failedIds = [];
        try {
            for (const idDeletedImage of listIdDeletedImage) {
                try {
                    // step1: get and check exist deletedImage 
                    const dataDeletedImage = await this.deletedImagesModel.getDeletedImageById(idDeletedImage);

                    if (!dataDeletedImage) {
                        failedIds.push(idDeletedImage); // Lưu ID không tồn tại
                        continue; // Bỏ qua ảnh này và tiếp tục với ảnh tiếp theo
                    }
                    // get information deletedImage
                    const { url, deletedBy } = dataDeletedImage;
                    //step2: restore by add image into table Images
                    await this.imagesModel.create(url, deletedBy);
                    //step3: delete deletedImage
                    await this.deletedImagesModel.deleteById(idDeletedImage);
                    successCount++;
                } catch (error) {
                    console.error("Error restoring images:", error);
                    failedIds.push(idDeletedImage);
                }
            }
            return res.status(200).json({
                message: `${successCount}Image restoration completed.`,
                successCount,
                failedCount: failedIds.length,
                failedIds,
            });
        } catch (error) {
            console.error("Error:", error.message);
            return res.status(500).json({ message: "An unexpected error occurred during image restoration" });
        }
    }

    async removeDeletedImages(req, res) {
        try {
            const id = req.params.id;
            const deletedImage = await this.deletedImagesModel.getDeletedImageById(id);

            if (!deletedImage) return res.status(404).json({ message: "Deleted image not found" });
            
            const { url } = deletedImage;

            const publicId = extractPublicId(url);
            
            if (!publicId) return res.status(400).json({ message: "Invalid image URL" });
            
            const result = await cloudinary.api.delete_resources(
                [publicId],
                { type: 'upload', resource_type: 'image', invalidate: true }
            );

            if ( result.deleted[publicId] !== 'deleted' && result.deleted[publicId] !== 'not_found' ) {
                return res.status(500).json({ message: "Failed to delete image from Cloudinary" });
            }

            const affectedRows = await this.deletedImagesModel.deleteById(id);

            if (affectedRows === 0) return res.status(404).json({ message: "Deleted image not found" });
            
            return res.status(200).json({ message: "Removed deleted image successfully" });
        } catch (error) {
            console.error("Error:", error.message);
            return res.status(500).json({ message: "Failed to remove deleted image" });
        }
    }

    async removeMultipleDeletedImages(req, res) {
        const listIdDeletedImage = req.body;

        if (!Array.isArray(listIdDeletedImage) || listIdDeletedImage.length === 0) {
            return res.status(400).json({ message: "Invalid input. Please provide an array of image IDs" });
        }
        
        let successCount = 0;
        let failedIds = [];
        let urls = [];
        try {
            for (const idDeletedImage of listIdDeletedImage) {
                try {
                    const deletedImage = await this.deletedImagesModel.getDeletedImageById(idDeletedImage);

                    if (!deletedImage) continue; 
                    
                    const affectedRows = await this.deletedImagesModel.deleteById(idDeletedImage);

                    if(affectedRows === 0){
                        failedIds.push(idDeletedImage);
                        continue;   
                    } 

                    urls.push(deletedImage.url);
                    successCount++;                    
                } catch (error) {
                    console.error(`Error deleting image with ID ${idDeletedImage}:`, error);
                    failedIds.push(idDeletedImage);
                }
            }
            const publicIds = urls.map((url) => extractPublicId(url));
            await cloudinary.api.delete_resources(
                publicIds, { type: 'upload', resource_type: 'image', invalidate: true }
            );
            return res.status(200).json({
                message: failedIds.length === 0
                    ? `${successCount} images deleted successfully.`
                    : `${successCount} images deleted successfully, ${failedIds.length} failed.`,
                successCount,
                failedCount: failedIds.length,
                failedIds,
            });
        } catch (error) {
            console.log("Error:", error.message);
            return res.status(500).json({ message: "An unexpected error occurred during the deletion process" });
        }
    }
}

export default DeletedImagesController;