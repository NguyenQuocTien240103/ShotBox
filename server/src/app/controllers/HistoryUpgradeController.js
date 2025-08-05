import HistoryUpgrade from '../models/HistoryUpgrade.js';
import User from '../models/User.js';

class HistoryUpgradeController {
    constructor(){
        this.userModel = new User();
        this.historyUpgradeModel = new HistoryUpgrade();
    }

    async showAllHistoryUpgrades(req, res) {
        try {
            const { id } = req.user;
            const userExists = await this.userModel.findById(id); 
            
            if (!userExists) return res.status(404).json({ message: "User not found" });

            if(userExists.roleId !== 1) return res.status(403).json({ message: "You do not have permission" });

            const listHistoryUpgrade = await this.historyUpgradeModel.getAllHistoryUpgrade();
            return res.status(200).json({ data: listHistoryUpgrade, message: "Successfully got all history upgrade" });
            
        } catch (error) {
            console.error("Error:", error.message);
            return res.status(500).json({ message: "Failed to get all history upgrade" });
        }
    }

    async showHistoryUpgradePending(req, res) {
        try {
            const { id } = req.user;
            const userExists = await this.userModel.findById(id); 

            if (!userExists) return res.status(404).json({ message: "User not found" });

            if(userExists.roleId !== 1) return res.status(403).json({ message: "You do not have permission" });

            const listHistoryUpgrade = await this.historyUpgradeModel.getHistoryUpgradePending();
            return res.status(200).json({ data: listHistoryUpgrade, message: "Successfully got history uprade with status pending" });
        } catch (error) {
            console.error("Error:", error.message);
            return res.status(500).json({ message: "Fail to get history upgrade with status pending" });
        }
    }

    async showUpgradePending(req, res) {
        try {
            const { id } = req.user;
            const userExists = await this.userModel.findById(id);
            if (!userExists) return res.status(404).json({ message: "User not found" });
            
            if(userExists.roleId !== 1) return res.status(403).json({ message: "You do not have permission" });

            const userId = req.params.id;
            const listHistoryUpgrade = await this.historyUpgradeModel.getByUserIdAndStatus(userId, "pending");
            return res.status(200).json({ data: listHistoryUpgrade, message: "Successfully got upgrade pending" });
        } catch (error) {
            console.error("Error:", error.message);
            return res.status(500).json({ message: "Failed to get upgrade pending" });
        }
    }

    async showUpgradeSuccess(req, res) {
        try {
            const { id } = req.user;
            const userId = id;
            const listHistoryUpgrade = await this.historyUpgradeModel.getByUserIdAndStatus(userId, "success");
            
            if (listHistoryUpgrade.length === 0) return res.status(404).json({ message: "No upgrade history found for this user" });
            
            return res.status(200).json({ data: listHistoryUpgrade, message: "Successfully got upgrade success" });
        } catch (error) {
            console.error("Error:", error.message);
            return res.status(500).json({ message: "Failed to get upgrade success" });
        }
    }

    async postHistoryUpgrade(req, res) {
        try {
            const data = req.body;
            
            if (!data) return res.status(400).json({ message: "Missing request data" });

            const { id } = req.user;
            const userPending = await this.historyUpgradeModel.checkPendingByUserId(id);
            
            if (userPending.length > 0) return res.status(409).json({ message: "Waiting for admin confirmation" });
            
            await this.historyUpgradeModel.create(data, id);
            return res.status(201).json({ message: "Request submitted successfully" });
        } catch (error) {
            console.error("Error:", error.message);
            return res.status(500).json({ message: "Failed request. Please try again later" });
        }
    }
}

export default HistoryUpgradeController;