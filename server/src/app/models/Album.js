import db from '../../config/database.js'
const Album = {
    getAllAlbums: async (userId) => {
        try {
            const query = 'SELECT * FROM album WHERE userId = ?';
            const [rows] = await db.query(query, [userId]);
            return rows;
        } catch (error) {
            console.error("Error fetching images:", error); // Log lỗi chi tiết
            throw new Error("Unable to fetch images.");
        }
    },
    findAlbumByUrlParams: async (urlParams) => {
        try {
            const query = 'SELECT * FROM album WHERE location = ?';
            const [rows] = await db.query(query, [urlParams]);
            return rows[0];
        } catch (error) {
            console.error("Error fetching images:", error); // Log lỗi chi tiết
            throw new Error("Unable to fetch images.");
        }
    },
    create: async (data, userId) => {
        const albumName = data.albumName;
        const description = data.description;
        const location = data.location;
        try {
            const query = 'INSERT INTO album (userId, albumName, description,location) VALUES (?, ?, ?, ?)';
            const [result] = await db.query(query, [userId, albumName, description, location]);
            return result.insertId;
        } catch (error) {
            console.error(`Error inserting album`, error);
            throw new Error('Unable to insert album into the database.');
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

export default Album;