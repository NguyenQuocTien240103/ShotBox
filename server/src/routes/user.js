import express from 'express';
import UserController from '../app/controllers/UserController.js'
import auth from "../middleware/auth.js";

class UserRoute {
  constructor() {
    this.router = express.Router();
    this.userController = new UserController();
    this.init();
  }

  init() {
    this.router.get('/username', (req, res) => this.userController.findUserByUsername(req,res));
    this.router.get('/roleId', auth, (req, res) => this.userController.getRoleId(req,res));
    this.router.put('/roleId', auth, (req, res) => this.userController.changeRoleId(req,res));
    this.router.put('/capacity', auth, (req, res) => this.userController.updateUserCapacity(req,res));
    this.router.get('/account', auth, (req, res) => this.userController.getUser(req,res));
    this.router.get('/:id', (req, res) => this.userController.getUserById(req,res));
    this.router.get('/', (req, res) => this.userController.showAllUser(req,res));
    this.router.put('/password', auth, (req, res) => this.userController.updateUserPassword(req,res));
    this.router.put('/email', auth, (req, res) => this.userController.updateUserEmail(req,res));
  }

  getRouter() {
    return this.router;
  }
}

export default UserRoute;
