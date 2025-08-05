import { getDB } from '../../config/database.js';

class AlbumImages {
    constructor() {
        this.db = getDB();
    }

    async getAllImagesFromAlbum(urlParams) {
        try {
            const query = `
                SELECT 
                    album_images.id,  
                    images.id AS imageId, 
                    images.url, 
                    album.albumName,
                    album.description,
                    album.createdAt
                FROM album
                JOIN album_images ON album.id = album_images.albumId
                JOIN images ON album_images.imageId = images.id
                WHERE album.location = ?;
            `;

            const [rows] = await this.db.query(query, [urlParams]);
            return rows;
        } catch (error) {
            throw error;
        }
    }

    async findByIdAlbum(albumId) {
        try {
            const query = 'SELECT * FROM album_images WHERE albumId = ?';
            const [rows] = await this.db.query(query, [albumId]);
            return rows.length > 0 ? rows[0] : null;
        } catch (error) {
            throw error;
        }
    }

    async create(albumId, imageId) {
        try {
            const query = 'INSERT INTO album_images (albumId, imageId) VALUES (?, ?)';
            const [result] = await this.db.query(query, [albumId, imageId]);
            return result.insertId;
        } catch (error) {
            throw error;
        }
    }

    async delete(albumImgId) {
        try {
            const query = 'DELETE FROM album_images WHERE id = ?';
            const [result] = await this.db.query(query, [albumImgId]);
            return result.affectedRows;
        } catch (error) {
            throw error;
        }
    }

    async deleteByImgId(imageId) {
        try {
            const query = 'DELETE FROM album_images WHERE imageId = ?';
            const [result] = await this.db.query(query, [imageId]);
            return result.affectedRows;
        } catch (error) {
            console.error("Error deleting by imageId:", error);
            throw new Error("Failed to delete image. Please try again.");
        }
    }

    async deleteByAlbumId(albumId) {
        try {
            const query = 'DELETE FROM album_images WHERE albumId = ?';
            const [result] = await this.db.query(query, [albumId]);
            return result.affectedRows;
        } catch (error) {
            throw error;
        }
    }
}

export default AlbumImages;
