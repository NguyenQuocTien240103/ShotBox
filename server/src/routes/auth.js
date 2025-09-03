import express from 'express';
import AuthController from '../app/controllers/AuthController.js';
import validate  from '../middleware/validation.js';
import userValidationSchemas from '../app/validation/userValidation.js';
class AuthRoute {
  constructor() {
    this.router = express.Router();
    this.authController = new AuthController();
    this.init();
  }

  init() {
    this.router.post('/login', validate(userValidationSchemas.userLogin), (req, res) => this.authController.login(req,res));
    this.router.post('/register', validate(userValidationSchemas.userRegister), (req,res) => this.authController.register(req,res));
    this.router.post('/identify', validate(userValidationSchemas.userEmail), (req,res) => this.authController.postIdentify(req,res));
  }

  getRouter() {
    return this.router;
  }
}

export default AuthRoute;
