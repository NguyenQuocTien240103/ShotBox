import db from '../../config/database.js'
const Image = {
    getAllImages: async (userId) => {
        try {
            const query = 'SELECT * FROM images WHERE userId = ?';
            const [rows] = await db.query(query, [userId]);
            return rows;
        } catch (error) {
            console.error("Error fetching images:", error); // Log lỗi chi tiết
            throw new Error("Unable to fetch images.");
        }
    },
    create: async (url, userId) => {
        try {
            const query = 'INSERT INTO images (url, userId) VALUES (?, ?)';
            const [result] = await db.query(query, [url, userId]);
            return result.insertId;
        } catch (error) {
            console.error('Error inserting image:', error); // Ghi log lỗi chi tiết
            throw new Error('Unable to insert image into the database.');
        }
    },
    delete: async (imgId) => {
        try {
            const query = 'DELETE FROM images WHERE id = ?';
            const [result] = await db.query(query, [imgId]);
            return result.affectedRows;
        } catch (error) {
            console.error("Error deleting image:", error);
            throw new Error("Failed to delete image. Please try again.");
        }
    }

}

export default Image;