import { getDB } from '../../config/database.js';

class User {
    constructor() {
        this.db = getDB();
    }

    async getAllUsers() {
        try {
            const query = 'SELECT * FROM users';
            const [rows] = await this.db.query(query);
            return rows;
        } catch (error) {
            throw error;
        }
    }

    async findByUsername(username) {
        try {
            const query = 'SELECT * FROM users WHERE name = ?';
            const [rows] = await this.db.query(query, [username]);
            return rows[0] || null;
        } catch (error) {
            throw error;
        }
    }

    async findByEmail(email) {
        try {
            const query = 'SELECT * FROM users WHERE email = ?';
            const [rows] = await this.db.query(query, [email]);
            return rows[0] || null;
        } catch (error) {
            throw error;
        }
    }

    async findById(userId) {
        try {
            const query = 'SELECT * FROM users WHERE id = ?';
            const [rows] = await this.db.query(query, [userId]);
            return rows[0] || null;
        } catch (error) {
            throw error;
        }
    }

    async create(data) {
        try {
            const { username, email, password } = data;
            const roleId = 2;
            const capacity = 10;
            const query = 'INSERT INTO users (name, email, password, roleId, capacity) VALUES (?, ?, ?, ?, ?)';
            const [result] = await this.db.query(query, [username, email, password, roleId, capacity]);
            return result.insertId;
        } catch (error) {
            throw error;
        }
    }

    async update(userId, data) {
        try {
            const { email, password } = data;
            const query = 'UPDATE users SET email = ?, password = ? WHERE id = ?';
            const [result] = await this.db.query(query, [email, password, userId]);
            return result.affectedRows > 0;
        } catch (error) {
            throw error;
        }
    }

    async updateRoleId(newRoleId, userId) {
        try {
            const query = 'UPDATE users SET roleId = ? WHERE id = ?';
            const [result] = await this.db.query(query, [newRoleId, userId]);
            return result.affectedRows > 0;
        } catch (error) {
            throw error;
        }
    }

    async updateCapacity(newCapacity, userId) {
        try {
            const query = 'UPDATE users SET capacity = ? WHERE id = ?';
            const [result] = await this.db.query(query, [newCapacity, userId]);
            return result.affectedRows > 0;
        } catch (error) {
            throw error;
        }
    }
}

export default User;
