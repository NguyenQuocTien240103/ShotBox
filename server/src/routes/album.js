import express from 'express';
import AlbumController from '../app/controllers/AlbumController.js'
import delay from "../middleware/auth.js";
const router = express.Router();
router.all("*", delay);

router.get('/', AlbumController.getAllAlbums);

router.post('/', AlbumController.postAlbum);

router.delete('/:id', AlbumController.deleteAlbum);

export default router;