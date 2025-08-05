import { getDB } from '../../config/database.js';
import axios from 'axios';
import sharp from 'sharp';

class Images {
    constructor() {
        this.db = getDB();
    }

    async getAllImages(userId) {
        try {
            const query = 'SELECT * FROM images WHERE userId = ?';
            const [rows] = await this.db.query(query, [userId]);
            return rows;
        } catch (error) {
            throw error;
        }
    }

    async getImage(id) {
        try {
            const query = 'SELECT * FROM images WHERE id = ?';
            const [rows] = await this.db.query(query, [id]);
            return rows[0];
        } catch (error) {
            throw error;
        }
    }

    async create(url, userId) {
        try {
            const response = await axios.get(url, { responseType: 'arraybuffer' });
            const buffer = Buffer.from(response.data);
            const fileSizeInKB = buffer.length / 1024;

            const metadata = await sharp(buffer).metadata();
            const fileName = url.split('/').pop();

            const query = `
                INSERT INTO images (userId, url, fileName, fileSize, fileWidth, fileHeight, fileFormat)
                VALUES (?, ?, ?, ?, ?, ?, ?)
            `;
            const [result] = await this.db.query(query, [
                userId,
                url,
                fileName,
                fileSizeInKB.toFixed(2),
                metadata.width,
                metadata.height,
                metadata.format,
            ]);

            return result.insertId;
        } catch (error) {
            throw error;
        }
    }

    async delete(imgId) {
        try {
            const query = 'DELETE FROM images WHERE id = ?';
            const [result] = await this.db.query(query, [imgId]);
            return result.affectedRows;
        } catch (error) {
            throw error;
        }
    }
}

export default Images;

