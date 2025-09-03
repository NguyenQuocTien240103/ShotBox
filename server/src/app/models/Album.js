import { getDB } from '../../config/database.js';

class Album {
    constructor() {
        this.db = getDB();
    }

    async getAllAlbums(userId) {
        try {
            const query = 'SELECT * FROM album WHERE userId = ?';
            const [rows] = await this.db.query(query, [userId]);
            return rows;
        } catch (error) {
            throw error;
        }
    }

    async getAlbumDetail(albumId) {
        try{
            const query = 'SELECT * FROM album WHERE id = ?';
            const [rows] = this.db.query(query, [albumId]);
            return rows[0];
        }
        catch(error){
            throw error;
        }
    }

    async findAlbumByUrlParams(urlParams) {
        try {
            const query = 'SELECT * FROM album WHERE location = ?';
            const [rows] = await this.db.query(query, [urlParams]);
            return rows[0];
        } catch (error) {
            throw error;
        }
    }

    async isAlbumNameExists(albumName, userId) {
        try {
            const query = 'SELECT COUNT(*) AS count FROM album WHERE albumName = ? AND userId = ?';
            const [rows] = await this.db.query(query, [albumName, userId]);
            return rows[0].count > 0;
        } catch (error) {
            throw error;
        }
    }

    async create(data, userId) {
        const { albumName, description, location } = data;
        try {
            const query = 'INSERT INTO album (userId, albumName, description, location) VALUES (?, ?, ?, ?)';
            const [result] = await this.db.query(query, [userId, albumName, description, location]);
            return result.insertId;
        } catch (error) {
            console.error("Error inserting album:", error);
            throw new Error("Unable to insert album.");
        }
    }

    async update(id, data) {
        const { albumName, description } = data;
        try {
            const query = 'UPDATE album SET albumName = ?, description = ? WHERE id = ?';
            const [result] = await this.db.query(query, [albumName, description, id]);
            return result.affectedRows;
        } catch (error) {
            throw error;
        }
    }

    async delete(id) {
        try {
            const query = 'DELETE FROM album WHERE id = ?';
            const [result] = await this.db.query(query, [id]);
            return result.affectedRows;
        } catch (error) {
            throw error;
        }
    }

    async checkDuplicateAlbumName(id, albumName, userId) {
        try {
            const query = `
                SELECT COUNT(*) as count 
                FROM album 
                WHERE albumName = ? AND userId = ? AND id != ?
            `;
        const [rows] = await this.db.query(query, [albumName, userId, id]);
        return rows[0].count > 0;
        } catch (error) {
            throw error;
        }
    }
}

export default Album;
