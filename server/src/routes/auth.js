import express from 'express';
import AuthController from '../app/controllers/AuthController.js';

class AuthRoute {
  constructor() {
    this.router = express.Router();
    this.authController = new AuthController();
    this.init();
  }

  init() {
    this.router.post('/login', (req, res) => this.authController.login(req,res));
    this.router.post('/register', (req,res) => this.authController.register(req,res));
    this.router.post('/identify', (req,res) => this.authController.postIdentify(req,res));
  }

  getRouter() {
    return this.router;
  }
}

export default AuthRoute;
