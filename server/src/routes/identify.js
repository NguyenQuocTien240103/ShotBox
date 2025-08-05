import express from 'express';
import IdentifyController from '../app/controllers/IdentifyController.js'

class IdentifyRoute {
  constructor() {
    this.router = express.Router();
    this.identifyController = new IdentifyController();
    this.init();
  }

  init() {
    this.router.get('/:id', (req, res) => this.identifyController.findIdentify(req,res));
    this.router.put('/', (req,res) => this.identifyController.confirmNewPassword(req,res));
  }

  getRouter() {
    return this.router;
  }
}

export default IdentifyRoute;
