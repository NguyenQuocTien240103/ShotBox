import express from 'express';
import DeletedImagesController from '../app/controllers/DeletedImagesController.js'
import auth from "../middleware/auth.js";

class DeleteImagesRoute {
  constructor() {
    this.router = express.Router();
    this.deletedImagesController = new DeletedImagesController();
    this.init();
  }

  init() {
    this.router.get('/', auth, (req, res) => this.deletedImagesController.showAllDeletedImages(req,res));
    this.router.post('/restore/multiple', auth, (req, res) => this.deletedImagesController.restoreMultipleDeletedImage(req,res));
    this.router.post('/multiple', auth, (req, res) => this.deletedImagesController.removeMultipleDeletedImages(req,res));
    this.router.delete('/restore/:id', auth, (req, res) => this.deletedImagesController.restoreDeletedImages(req,res));
    this.router.delete('/:id', auth, (req, res) => this.deletedImagesController.removeDeletedImages(req,res));
  }

  getRouter() {
    return this.router;
  }
}

export default DeleteImagesRoute;
