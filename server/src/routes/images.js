import express from 'express';
import ImagesController from '../app/controllers/ImagesController.js'
import auth from "../middleware/auth.js";

class ImagesRoute {
  constructor() {
    this.router = express.Router();
    this.imagesController = new ImagesController();
    this.init();
  }

  init() {
    this.router.get('/', auth, (req, res) => this.imagesController.getAllImages(req,res));
    this.router.post('/', auth, (req, res) => this.imagesController.postImages(req,res));
    this.router.post('/delete/multiple', auth, (req, res) => this.imagesController.deleteMultiple(req,res));
    this.router.delete('/:id', auth, (req, res) => this.imagesController.deleteImages(req,res));
  }

  getRouter() {
    return this.router;
  }
}

export default ImagesRoute;
