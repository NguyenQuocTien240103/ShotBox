import express from 'express';
import HistoryUpgradeController from '../app/controllers/HistoryUpgradeController.js'
import auth from "../middleware/auth.js";

class HistoryUpgradeRoute {
  constructor() {
    this.router = express.Router();
    this.historyUpgradeController = new HistoryUpgradeController();
    this.init();
  }

  init() {
    this.router.get('/success', auth, (req, res) => this.historyUpgradeController.showUpgradeSuccess(req,res));
    this.router.get('/pending/:id', auth, (req, res) => this.historyUpgradeController.showUpgradePending(req,res));
    this.router.get('/pending', auth, (req, res) => this.historyUpgradeController.showHistoryUpgradePending(req,res));
    this.router.get('/', auth, (req, res) => this.historyUpgradeController.showAllHistoryUpgrades(req,res));
    this.router.post('/', auth, (req, res) => this.historyUpgradeController.postHistoryUpgrade(req,res));    
  }

  getRouter() {
    return this.router;
  }
}

export default HistoryUpgradeRoute;
