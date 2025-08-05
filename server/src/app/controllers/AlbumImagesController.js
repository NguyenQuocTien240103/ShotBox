import AlbumImages from "../models/AlbumImages.js";

class AlbumImagesController {
    constructor(){
        this.albumImages = new AlbumImages();
    }

    async postImageToAlbum(req, res) {
        try {
            const { albumId, imageId } = req.body;
            await this.albumImages.create(albumId, imageId);
            return res.status(201).json({ message: "Push image into ablum successfully" });
        } catch (error) {
            console.error("Error:", error.message);
            return res.status(500).json({ message: "Push image into album is unsuccessful" });
        }
    }

    async postMultipleImageToAlbum(req, res) {
        try {
            const { albumId, listImageId } = req.body;
            // Validate input data
            if (!albumId || !Array.isArray(listImageId) || listImageId.length === 0) {
                return res.status(400).json({ message: "Failed to push images into album" });
            }
            // Process each image ID one by one
            for (const imageId of listImageId) {
                await this.albumImages.create(albumId, imageId);
            }
            return res.status(201).json({ message: "Images added to the album successfully" });
        } catch (error) {
            console.error("Error:", error.message);
            return res.status(500).json({ message: "Failed to push images into album" });
        }
    }

    async showImagesFromAlbum(req, res) {
        try {
            const urlParams = req.params.slug;
            const images = await this.albumImages.getAllImagesFromAlbum(urlParams);
            return res.status(200).json({ data: images, message: "Successfully got images from album" });
        } catch (error) {
            console.error("Error:", error.message);            
            return res.status(500).json({ message: "Fail to get images from album" });
        }
    }

    async deleteImageFromAlbum(req, res) {
        try {
            const albumImgId = req.params.id;
            const affectedRows = await this.albumImages.delete(albumImgId);

            if(!affectedRows) return res.status(404).json({ message: "Image not found" });

            return res.status(200).json({ message: "Image deleted successfully" });
        } catch (error) {
            console.error("Error:", error.message);
            res.status(500).json({ message: "Failed to delete image" });
        }
    }

    async deleteMultipleImageFromAlbum(req, res) {
        try {
            const listAlbumImgId = req.body;
            let deletedCount = 0;
            for (const albumImgId of listAlbumImgId) {
                let affectedRows = await this.albumImages.delete(albumImgId);
                // Nếu ảnh bị xóa thành công, tăng đếm
                if (affectedRows > 0) deletedCount++;
            }
            
            if(!deletedCount) return  res.status(404).json({ message: "No images found to delete" });

            return res.status(200).json({ message: "Image deleted successfully" });
        } catch (error) {
            console.error("Error:", error.message);
            return res.status(500).json({ message: "Failed to delete image" });
        }
    }
}

export default AlbumImagesController;