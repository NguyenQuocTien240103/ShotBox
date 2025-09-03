import Images from '../models/Images.js'
import AlbumImages from '../models/AlbumImages.js'
import DeletedImages from '../models/DeletedImages.js'

class ImagesController {
    constructor() {
        this.imagesModel = new Images();
        this.albumImagesModel = new AlbumImages();
        this.deletedImagesModel = new DeletedImages();
    }

    async getAllImages(req, res) {
        try {
            const { id } = req.user;
            const images = await this.imagesModel.getAllImages(id);
            return res.status(200).json({ data: images, message: "Successfully got all images" });
        } catch (error) {
            console.error("Error:", error.message);
            return res.status(500).json({ message: "Failed to get all images" });
        }
    }

    async postImages(req, res) {
        try {
            const { url } = req.body;
            const { id } = req.user;            
            await this.imagesModel.create(url, id);
            return res.status(201).json({ message: "Image created successfully" });
        } catch (error) {            
            console.error("Error:", error.message);
            return res.status(500).json({ message: "Failed to create image" });
        }
    }

    async deleteImages(req, res) {
        try {
            const imgId = req.params.id;
            const image = await this.imagesModel.getImage(imgId);

            if (!image || image.length === 0) return res.status(404).json({ message: "Image not found" });

            await this.deletedImagesModel.create(image);
            await this.albumImagesModel.deleteByImgId(imgId);
            const affectedRows = await this.imagesModel.delete(imgId);

            if(!affectedRows) res.status(404).json({ message: "Image not found" });

            return res.status(200).json({ message: "Image deleted successfully" });
        } catch (error) {
            console.error("Error:", error.message);
            return res.status(500).json({ message: "Failed to delete image" });
        }
    }

    async deleteMultiple(req, res) {
        try {
            const arrIdImg = req.body;

            if (!arrIdImg || arrIdImg.length === 0) return res.status(400).json({ message: "No image IDs provided" });
            
            const notFoundIds = [];
            const deletedImages = [];
            for (const id of arrIdImg) {
                const image = await this.imagesModel.getImage(id);

                if (!image || image.length === 0) {
                    notFoundIds.push(id);
                    continue;
                }

                await this.deletedImagesModel.create(image);
                await this.albumImagesModel.deleteByImgId(id);
                await this.imagesModel.delete(id);

                deletedImages.push(id);
            }

            if (notFoundIds.length > 0) {
                return res.status(207).json({
                    message: "Some images were not found",
                    deletedImages,
                    notFoundIds,
                });
            }

            return res.status(200).json({ message: "All images deleted successfully", deletedImages });
        } catch (error) {
            console.error("Error:", error.message);
            return res.status(500).json({ message: "Failed to delete images" });
        }
    }
}

export default ImagesController;
