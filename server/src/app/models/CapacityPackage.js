import { getDB } from '../../config/database.js';
class CapacityPackage {
    constructor(){
        this.db = getDB();
    }

    async getAllCapacityPackages() {
        try {
            const query = 'SELECT * FROM capacity_package';
            const [rows] = await  this.db.query(query);
            return rows;
        } catch (error) {
            throw error;
        }
    }

    async createCapacityPackage(data) {
        const { name, size, description, price } = data; 
        try {
            const query = `
                INSERT INTO capacity_package (name, size, description, price)
                VALUES (?, ?, ?, ?)
            `;
            const [result] = await  this.db.query(query, [name, size, description, price]);

            if (result.affectedRows > 0) {
                console.log("Capacity package inserted successfully.");
            } else {
                console.error("Failed to insert capacity package.");
            }

            return result.insertId;
        } catch (error) {
            throw error;
        }
    }

    async updateCapacityPackage(id, data) {
        const { name, size, description, price } = data;
        try {
            const query = `
                UPDATE capacity_package
                SET name = ?, size = ?, description = ?, price = ?
                WHERE id = ?
            `;
            const [result] = await  this.db.query(query, [name, size, description, price, id]);

            if (result.affectedRows > 0) {
                console.log(`Capacity package with ID ${id} updated successfully.`);
            } else {
                console.error(`No capacity package found with ID ${id} to update.`);
            }

            return result.affectedRows;
        } catch (error) {
            throw error;
        }
    }

    async deleteCapacityPackage(id) {
        try {
            const query = 'DELETE FROM capacity_package WHERE id = ?';
            const [result] = await  this.db.query(query, [id]);
            return result.affectedRows;
        } catch (error) {
            throw error;
        }
    }
}

export default CapacityPackage;
