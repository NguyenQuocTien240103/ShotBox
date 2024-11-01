import express from 'express';
import AlbumImagesController from '../app/controllers/AlbumImagesController.js'
import delay from "../middleware/auth.js";
const router = express.Router();
router.all("*", delay);

router.get('/:id', AlbumImagesController.showImagesFromAlbum);

router.post('/', AlbumImagesController.postImageToAlbum);


export default router;