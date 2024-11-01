import AlbumImage from '../models/AlbumImage.js';

class AlbumImageController {
    // Get localhost/album/images/
    async postImageToAlbum(req, res) {
        try {
            const { albumId, imageId } = req.body;
            await AlbumImage.create(albumId, imageId);
            return res.status(201).json({ data: 'Push image into ablum successfully' });
        } catch (error) {
            console.error('Error uploading image:', error); // Log lỗi chi tiết
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
    async showImagesFromAlbum(req, res) {
        try {
            const urlParams = req.params.id;
            const images = await AlbumImage.getAllImagesFromAlbum(urlParams);

            return res.status(200).json({ data: images });
        } catch (error) {
            console.error("Error fetching images:", error); // Log lỗi chi tiết
            return res.status(500).json({ error: "An error occurred while fetching images." });
        }
    }

}

export default new AlbumImageController();