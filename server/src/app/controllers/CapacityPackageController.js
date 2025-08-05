import CapacityPackage from "../models/CapacityPackage.js";
import User from "../models/User.js";

class CapacityPackageController {
    constructor(){
        this.capacityPackageModel = new CapacityPackage();
        this.userModel = new User();
    }

    async showAllCapacityPackages(req, res) {
        try {
            const capacityPackages = await this.capacityPackageModel.getAllCapacityPackages();
            return res.status(200).json({ data: capacityPackages, message: "Successfully got all capacityPackage" });
        } catch (error) {
            console.error("Error:", error.message);
            return res.status(500).json({ message: "Failed to get all capacityPackage" });
        }
    }

    async postCapacityPackage(req, res) {
        try {
            const { id } = req.user;
            const userExists = await this.userModel.findById(id);

            if (!userExists) return res.status(404).json({ message: "User not found" });
            
            if(userExists.roleId !== 1) return res.status(403).json({ message: "You do not have permission" });
            
            const data = req.body;
            const result = await this.capacityPackageModel.createCapacityPackage(data);

            if(!result) return res.status(400).json({ message: "Failed to create capacity package" });

            return res.status(201).json({ message: "Capacity package created successfully" });
        } catch (error) {
            console.error("Error:", error.message);            
            return res.status(500).json({ message: "Failed to create capacity package"});
        }
    }
    async updateCapacityPackage(req, res) {
        try {
            const { id } = req.user;
            const userExists = await this.userModel.findById(id);
            
            if (!userExists) return res.status(404).json({ message: "User not found" });
            
            if (userExists.roleId !== 1) return res.status(403).json({ message: "You do not have permission" });

            const idPackage = req.params.id;
            const data = req.body;
            const result = await this.capacityPackageModel.updateCapacityPackage(idPackage, data);

            if(!result) return res.status(400).json({ message: "Failed to update capacity package" });

            return res.status(200).json({ message: "Capacity package updated successfully" });
           
        } catch (error) {
            console.error("Error:", error.message);            
            return res.status(500).json({ message: "Failed to update capacity package" });
        }
    }
    async deleteCapacityPackage(req, res) {
        try {
            const { id } = req.user;
            const userExists = await this.userModel.findById(id);

            if (!userExists) return res.status(404).json({ message: "User not found" });
            
            if (userExists.roleId !== 1) return res.status(403).json({ message: "You do not have permission" });;

            const idPackage = req.params.id;
            const result = await this.capacityPackageModel.deleteCapacityPackage(idPackage);

            if(!result) return res.status(400).json({ message: "Failed to delete capacity package" });
            
            return res.status(200).json({ message: "Capacity package deleted successfully" });
                       
        } catch (error) {
            console.error("Error:", error.message);            
            return res.status(500).json({ message: "Failed to delete capacity package" });
        }
    }
}

export default CapacityPackageController;