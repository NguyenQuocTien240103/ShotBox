import express from 'express';
import ImagesController from '../app/controllers/ImagesController.js'

const router = express.Router();

router.get('/', ImagesController.getAllImages);

router.post('/', ImagesController.postImages);

router.delete('/:id', ImagesController.deleteImages);

export default router;