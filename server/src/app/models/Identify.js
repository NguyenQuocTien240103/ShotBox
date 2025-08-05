import { getDB } from '../../config/database.js';

class Identify {
    constructor() {
        this.db = getDB();
    }

    async getIdentify(idCode) {
        try {
            const query = 'SELECT * FROM identify WHERE idCode = ?';
            const [rows] = await this.db.query(query, [idCode]);
            return rows[0];
        } catch (error) {
            throw error;
        }
    }

    async create(email, idCode) {
        try {
            const query = `INSERT INTO identify (email, idCode) VALUES (?, ?)`;
            const [result] = await this.db.query(query, [email, idCode]);

            if (result.affectedRows > 0) {
                console.log("Create identify successfully.");
            } else {
                console.error("Failed to create identify.");
            }

            return result.insertId;
        } catch (error) {
            throw error;
        }
    }

    async deleteById(idCode) {
        try {
            const query = 'DELETE FROM identify WHERE idCode = ?';
            const [result] = await this.db.query(query, [idCode]);
            return result.affectedRows;
        } catch (error) {
            throw error;
        }
    }
}

export default Identify;
