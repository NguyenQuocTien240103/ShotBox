// models/DeletedImages.js
import { getDB } from '../../config/database.js';

class DeletedImages {
    constructor() {
        this.db = getDB();
    }

    async getAllDeletedImages(idUser) {
        try {
            const query = `SELECT * FROM deleted_images WHERE deletedBy = ?`;
            const [rows] = await this.db.query(query, [idUser]);
            return rows;
        } catch (error) {
            throw error;
        }
    }

    async getDeletedImageById(id) {
        try {
            const query = `SELECT * FROM deleted_images WHERE id = ?`;
            const [rows] = await this.db.query(query, [id]);
            return rows[0];
        } catch (error) {
            throw error;
        }
    }

    async create(data) {
        const { userId, fileName, fileSize, fileWidth, fileHeight, fileFormat, url } = data;
        try {
            const query = `
                INSERT INTO deleted_images (url, fileName, fileSize, fileWidth, fileHeight, fileFormat, deletedBy)
                VALUES (?, ?, ?, ?, ?, ?, ?)
            `;
            const [result] = await this.db.query(query, [url, fileName, fileSize, fileWidth, fileHeight, fileFormat, userId]);
            return result.insertId;
        } catch (error) {
            throw error;
        }
    }

    async deleteById(id) {
        try {
            const query = `DELETE FROM deleted_images WHERE id = ?`;
            const [result] = await this.db.query(query, [id]);
            return result.affectedRows;
        } catch (error) {
            throw error;
        }
    }
}

export default DeletedImages;
