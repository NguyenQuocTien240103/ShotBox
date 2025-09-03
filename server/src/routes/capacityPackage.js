import express from 'express'
import CapacityPackageController from '../app/controllers/CapacityPackageController.js'
import auth from "../middleware/auth.js"
import validate from '../middleware/validation.js';
import capacityPackageValidationSchemas from '../app/validation/capacityValidation.js';
class CapacityPackageRoute {
  constructor() {
    this.router = express.Router();
    this.capacityPackageController = new CapacityPackageController();
    this.init();
  }

  init() {
    this.router.get('/', auth, (req, res) => this.capacityPackageController.showAllCapacityPackages(req,res));
    this.router.post('/', validate(capacityPackageValidationSchemas), auth, (req, res) => this.capacityPackageController.postCapacityPackage(req,res));   
    this.router.put('/:id', validate(capacityPackageValidationSchemas), auth, (req, res) => this.capacityPackageController.updateCapacityPackage(req,res));    
    this.router.delete('/:id', auth, (req, res) => this.capacityPackageController.deleteCapacityPackage(req,res));    
  }

  getRouter() {
    return this.router;
  }
}

export default CapacityPackageRoute;
