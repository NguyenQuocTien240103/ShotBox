import db from '../../config/database.js'

const AlbumImages = {
    create: async (albumId, imageId) => {
        try {
            const query = 'INSERT INTO album_images (albumId, imageId) VALUES (?, ?)';
            const [result] = await db.query(query, [albumId, imageId]);
            return result.insertId;
        } catch (error) {
            console.error(`Error inserting album`, error);
            throw new Error('Unable to insert album into the database.');
        }
    },

    getAllImagesFromAlbum: async (urlParams) => {
        try {
            const query = `
                SELECT 
                    album_images.id,  
                    images.id AS imageId, 
                    images.url, 
                    album.albumName,
                    album.description
                FROM album
                JOIN album_images ON album.id = album_images.albumId
                JOIN images ON album_images.imageId = images.id
                WHERE album.location = ?;
            `;

            const [rows] = await db.query(query, [urlParams]);
            return rows;
        } catch (error) {
            console.error("Error retrieving images from album:", error);
            throw new Error("Unable to retrieve images. Please try again later.");
        }
    },


}

export default AlbumImages;
