import Album from '../models/Album.js';
import AlbumImages from '../models/AlbumImages.js';

class AlbumController {
    constructor() {
        this.albumModel = new Album();
        this.albumImagesModel = new AlbumImages();
    }

    async showAllAlbums(req, res) {
        try {
            const { id } = req.user;
            const albums = await this.albumModel.getAllAlbums(id);
            return res.status(200).json({ data: albums, message: "Successfully got all albums" });
        } catch (error) {
            console.error("Error:", error.message);
            return res.status(500).json({ message: "Failed to get albums" });
        }
    }

    async showAlbumDetail(req, res) {
        try {
            const urlParams = req.params.id;
            const albums = await this.albumModel.findAlbumByUrlParams(urlParams);
            if (!albums) return res.status(404).json({ message: "Album not found" });
            return res.status(200).json({ data: albums, message: "Successfully got album details" });
        } catch (error) {
            console.error("Error:", error.message);
            return res.status(500).json({ message: "Failed to get album details" });
        }
    }

    async postAlbum(req, res) {
        try {
            const data = req.body;
            const albumName = data.albumName;
            const { id } = req.user;
            const existsNameAlbum = await this.albumModel.isAlbumNameExists(albumName, id);

            if (existsNameAlbum) return res.status(409).json({ message: "Album name already exists" });

            await this.albumModel.create(data, id);
            return res.status(201).json({ message: "Album created successfully" });
        } catch (error) {
            console.error("Error:", error.message);
            return res.status(500).json({ message: "Failed to create album" });
        }
    }

    async updateAlbum(req, res) {
        try {
            const { id } = req.user;
            const albumId = req.params.id;
            const album = await this.albumModel.getAlbumDetail(albumId);

            if (!album) return res.status(404).json({ message: "Album not found" });

            const { albumName, description } = req.body;
            const isDuplicate = await this.albumModel.checkDuplicateAlbumName(albumId, albumName, id);

            if (isDuplicate) return res.status(400).json({ message: "Album name already exists" });

            const affectedRows = await this.albumModel.update(albumId, { albumName, description });

            if (!affectedRows) return res.status(404).json({ message: "Album not found or no changes made" });

            return res.status(200).json({ message: "Album updated successfully" });
        } catch (error) {
            console.error("Error:", error.message);
            return res.status(500).json({ message: "Failed to update album" });
        }
    }

    async deleteAlbum(req, res) {
        try {
            const id = req.params.id;
            const album = await this.albumModel.getAlbumDetail(id);

            if (!album) return res.status(404).json({ message: "Album not found" });

            const idAlbumExists = await this.albumImagesModel.findByIdAlbum(id);

            if (idAlbumExists) await this.albumImagesModel.deleteByAlbumId(id);

            const result = await this.albumModel.delete(id);

            if (!result) return res.status(404).json({ message: "Album not found or already deleted" });

            return res.status(200).json({ message: "Album deleted successfully" });
        } catch (error) {
            console.error("Error:", error.message);
            return res.status(500).json({ message: "Failed to delete album" });
        }
    }
}

export default AlbumController;
