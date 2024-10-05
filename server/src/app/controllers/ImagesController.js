
class ImagesController {
    // Get
    getImages(req, res) {
        res.send('Get');
    }
    // Post
    uploadImages(req, res) {
        res.send('Post');
    }
    // Delete
    deleteImages(req, res) {
        const imageId = req.params.id;
        res.send(`Delete ${imageId}`);
    }

}

export default new ImagesController();