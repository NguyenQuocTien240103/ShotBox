import express from 'express';
import ImagesController from '../app/controllers/ImagesController.js'

const router = express.Router();

router.get('/', ImagesController.getImages);

router.post('/', ImagesController.uploadImages);

router.delete('/:id', ImagesController.deleteImages);

export default router;