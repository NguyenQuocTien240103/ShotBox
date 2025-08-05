import express from 'express';
import AlbumImagesController from '../app/controllers/AlbumImagesController.js'
import auth from "../middleware/auth.js";

class AlbumImagesRoute {
  constructor() {
    this.router = express.Router();
    this.albumImagesController = new AlbumImagesController();
    this.init();
  }

  init() {
    this.router.get('/:slug', auth, (req, res) => this.albumImagesController.showImagesFromAlbum(req,res));
    this.router.post('/', auth, (req, res) => this.albumImagesController.postImageToAlbum(req,res));
    this.router.post('/multiple', auth, (req, res) => this.albumImagesController.postMultipleImageToAlbum(req,res));
    this.router.post('/delete/multiple', auth, (req, res) => this.albumImagesController.deleteMultipleImageFromAlbum(req,res));
    this.router.delete('/:id', auth, (req, res) => this.albumImagesController.deleteImageFromAlbum(req,res));
  }

  getRouter() {
    return this.router;
  }
}

export default AlbumImagesRoute;