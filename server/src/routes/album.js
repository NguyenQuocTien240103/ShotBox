import express from 'express';
import AlbumController from '../app/controllers/AlbumController.js';
import auth from "../middleware/auth.js";

class AlbumRoute {
  constructor() {
    this.router = express.Router();
    this.albumController = new AlbumController();
    this.init();
  }

  init() {
    this.router.get('/', auth, (req, res) => this.albumController.showAllAlbums(req,res));
    this.router.get('/:id', auth, (req, res) => this.albumController.showAlbumDetail(req,res));
    this.router.post('/', auth, (req, res) => this.albumController.postAlbum(req,res));
    this.router.put('/:id', auth, (req, res) => this.albumController.updateAlbum(req,res));
    this.router.delete('/:id', auth, (req, res) => this.albumController.deleteAlbum(req,res));
  }

  getRouter() {
    return this.router;
  }
}

export default AlbumRoute;