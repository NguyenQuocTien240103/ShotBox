import User from '../models/User.js';
import HistoryUpgrade from '../models/HistoryUpgrade.js';
import bcrypt from 'bcrypt';

class UserController{
    constructor(){
        this.userModel = new User();
        this.historyUpgradeModel = new HistoryUpgrade();
    }

    async findUserByUsername(req, res) {
        try {
            const username = req.query.search;
            const user = await this.userModel.findByUsername(username);

            if (!user) return res.status(404).json({ message: "User not found" });
        
            return res.status(200).json({ message: "Get username is successful", name: user.name, email: user.email });
        } catch (error) {
            console.error("Error:", error.message);
            res.status(500).json({ message: "Get user is fail" });
        }
    }
    
    async getUser(req, res) {
        try {
            const { id } = req.user;
            const userExists = await this.userModel.findById(id)

            if (!userExists) return res.status(404).json({ message: "User not found" });

            res.status(200).json({ message: "Get user is successful", id: userExists.id, name: userExists.name, email: userExists.email, capacity: userExists.capacity }); 
        } catch (error) {
            console.error("Error:", error.message);
            res.status(500).json({ message: "Get user is fail" });
        }
    }

    async getRoleId(req, res) {
        try {
            const { id } = req.user;
            const userExists = await this.userModel.findById(id)

            if (!userExists) return res.status(404).json({ message: "User not found" });

            res.status(200).json({ message: "Get roleId is successful", roleId: userExists.roleId }); 
        } catch (error) {
            console.error("Error:", error.message);
            res.status(500).json({ message: "Get roleId is fail" });
        }
    }

    async changeRoleId(req, res) {
        try {
            const { id } = req.user;
            const userExists = await this.userModel.findById(id); // Check userExists

            if (!userExists) return res.status(404).json({ message: "User not found" });
            
            // If admin who can change role
            if(userExists.roleId !==1) return res.status(403).json({ message: "You do not have permission" });

            const { newRoleId, userId } = req.body;

            if (!userId || !newRoleId || ![1, 2].includes(newRoleId)) {
                return res.status(400).json({ message: "Change roleId is fail" });
            }
            
            const result = await this.userModel.updateRoleId(newRoleId, userId);     // Update roleId

            if(!result) return res.status(404).json({ message: "RoleId is the same" });

            return res.status(200).json({ message: "Change roleId is successful" });
        } catch (error) {
            console.error("Error:", error.message);
            return res.status(500).json({ message: "Change roleId is fail"});
        }
    }

    async updateUserCapacity(req, res) {
        try {
            const { id } = req.user;
            const userExists = await this.userModel.findById(id);

            if (!userExists) return res.status(404).json({ message: "User not found" });

            if(userExists.roleId !== 1) return res.status(403).json({ message: "You do not have permission" });

            const { newCapacity, userId } = req.body;

            if (!userId || !newCapacity) return res.status(400).json({ message: "Change capacity is fail" });
            
            await this.historyUpgradeModel.updateStatusByUserId(userId);
            const result = await this.userModel.updateCapacity(newCapacity, userId);

            if(!result) return res.status(404).json({ message: "Capacity is the same" });

            return res.status(200).json({ message: "Change capacity is successfull" });
        } catch (error) {
            console.error("Error:", error.message);
            return res.status(500).json({ messager: "Change capacity is fail" });
        }
    }

    async getUserById(req, res) {
        try {
            const userId = req.params.id;
            const user = await this.userModel.findById(userId);

            if (!user) return res.status(404).json({ message: 'User not found.' });

            // return res.status(200).json(user);
            return res.status(200).json({message: "Get user is successful"});
        } catch (error) {
            console.error("Error:", error.message);
            res.status(500).json({ message: "Get user is fail" });
        }
    }

    async showAllUser(req, res) {
        try {
            const users = await this.userModel.getAllUsers();
            const data =  users.map(user => ({
                id: user.id,
                name: user.name,
                email: user.email,
                roleId: user.roleId,
                capacity: user.capacity,
                createdAt: user.createdAt
            }))
            return res.status(200).json({ data, message: "Successfully got all user"});
        } catch (error) {
            console.error("Error:", error.message);
            return res.status(500).json({ message: "Get all user is fail" });
        }
    }
    
    async updateUserPassword(req, res) {
        try {
            const { id } = req.user;
            const { currentPassword, newPassword } = req.body;
            const userExists = await this.userModel.findById(id);

            if (!userExists) return res.status(404).json({ message: "User not found" });

            if (currentPassword && !(await bcrypt.compare(currentPassword, userExists.password))) {
                return res.status(400).json({ message: "Incorrect current password" });
            }

            let hashedPassword = userExists.password; 

            if (newPassword) hashedPassword = await bcrypt.hash(newPassword, 10);
            
            const updatedData = {
                email: userExists.email,
                password: hashedPassword,
            };
            const updated = await this.userModel.update(id, updatedData);

            if (updated) return res.status(200).json({ message: "Password updated successfully" });
            
            return res.status(500).json({ message: "Change password is fail" });
        } catch (error) {
            console.error("Error:", error.message);
            res.status(500).json({ message: "Change password is fail" });
        }
    }
    
    async updateUserEmail(req, res) {
        try {
            const { id } = req.user;
            const { newEmail } = req.body;
            const userExists = await this.userModel.findById(id);

            if (!userExists) return res.status(404).json({ message: "User not found" });

            const userPassword = userExists.password; 
            const updatedData = {
                email: newEmail,
                password: userPassword,
            };
            const updated = await this.userModel.update(id, updatedData);

            if (updated)  return res.status(200).json({ message: "Email updated successfully" });

            return res.status(500).json({ message: "Change email is fail" });
        } catch (error) {
            console.error("Error:", error.message);
            res.status(500).json({ message: "Change email is fail" });
        }
    }
}

export default UserController;