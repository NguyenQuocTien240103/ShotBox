import { getDB } from '../../config/database.js';

class HistoryUpgrade {
    constructor() {
        this.statusPending = 'pending';
        this.statusSuccess = 'success';
        this.db = getDB();
    }

    async getAllHistoryUpgrade() {
        try {
            const query = `
                SELECT
                    users.id, 
                    users.name AS userName,
                    capacity_package.name AS packageName,
                    capacity_package.size,
                    capacity_package.price,
                    history_upgrade.createdAt,
                    history_upgrade.status
                FROM users
                JOIN history_upgrade ON users.id = history_upgrade.userId
                JOIN capacity_package ON history_upgrade.capacityPackageId = capacity_package.id
            `;
            const [rows] = await this.db.query(query);
            return rows;
        } catch (error) {
            throw error;
        }
    }

    async getHistoryUpgradePending() {
        try {
            const query = `
                SELECT
                    users.id, 
                    users.name AS userName,
                    capacity_package.name AS packageName,
                    capacity_package.size,
                    capacity_package.price,
                    history_upgrade.createdAt,
                    history_upgrade.status
                FROM users
                JOIN history_upgrade ON users.id = history_upgrade.userId
                JOIN capacity_package ON history_upgrade.capacityPackageId = capacity_package.id
                WHERE history_upgrade.status = ?
            `;
            const [rows] = await this.db.query(query, [this.statusPending]);
            return rows;
        } catch (error) {
            throw error;
        }
    }

    async getByUserIdAndStatus(userId, status) {
        try {
            const query = `
                SELECT
                    users.id, 
                    users.name AS userName,
                    capacity_package.name AS packageName,
                    capacity_package.size,
                    capacity_package.price,
                    history_upgrade.createdAt,
                    history_upgrade.status
                FROM users
                JOIN history_upgrade ON users.id = history_upgrade.userId
                JOIN capacity_package ON history_upgrade.capacityPackageId = capacity_package.id
                WHERE history_upgrade.status = ? AND history_upgrade.userId = ?
            `;
            const [rows] = await this.db.query(query, [status, userId]);
            return rows;
        } catch (error) {
            throw error;
        }
    }

    async checkPendingByUserId(userId) {
        try {
            const query = `
                SELECT * FROM history_upgrade 
                WHERE userId = ? AND status = ?
            `;
            const [rows] = await this.db.query(query, [userId, this.statusPending]);
            return rows;
        } catch (error) {
            throw error;
        }
    }

    async create(data, userId) {
        const { capacityPackageId } = data;
        try {
            const query = `
                INSERT INTO history_upgrade (userId, capacityPackageId, status)
                VALUES (?, ?, ?)
            `;
            const [result] = await this.db.query(query, [userId, capacityPackageId, this.statusPending]);
            return result.insertId;
        } catch (error) {
            throw error;
        }
    }

    async updateStatusByUserId(userId) {
        try {
            const query = `
                UPDATE history_upgrade 
                SET status = ? 
                WHERE userId = ? AND status = ?
            `;
            const [result] = await this.db.query(query, [this.statusSuccess, userId, this.statusPending]);
            return result.affectedRows > 0;
        } catch (error) {
            throw error;
        }
    }
}

export default HistoryUpgrade;
