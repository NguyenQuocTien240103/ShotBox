import express from 'express';
import AlbumController from '../app/controllers/AlbumController.js';
import auth from "../middleware/auth.js";
import validate from '../middleware/validation.js';
import albumValidationSchemas from '../app/validation/albumValidation.js';
class AlbumRoute {
  constructor() {
    this.router = express.Router();
    this.albumController = new AlbumController();
    this.init();
  }

  init() {
    this.router.get('/', auth, (req, res) => this.albumController.showAllAlbums(req,res));
    this.router.get('/:id', auth, (req, res) => this.albumController.showAlbumDetail(req,res));
    this.router.post('/', validate(albumValidationSchemas), auth, (req, res) => this.albumController.postAlbum(req,res));
    this.router.put('/:id',validate(albumValidationSchemas), auth, (req, res) => this.albumController.updateAlbum(req,res));
    this.router.delete('/:id', auth, (req, res) => this.albumController.deleteAlbum(req,res));
  }

  getRouter() {
    return this.router;
  }
}

export default AlbumRoute;