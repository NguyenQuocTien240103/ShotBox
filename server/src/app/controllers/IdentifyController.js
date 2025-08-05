import Identify from '../models/Identify.js';
import User from '../models/User.js';
import bcrypt from 'bcrypt';

class IdentifyController {
    constructor(){
        this.identifyModel = new Identify();
        this.userModel = new User();
    }

    async findIdentify(req, res) {
        try {
            const { id } = req.params;
            const identify = await this.identifyModel.getIdentify(id);

            if (!identify) return res.status(404).json({ error: "ID code not found" });

            return res.status(200).json({ message: "ID code is exist" });
        } catch (error) {
            console.error("Error:", error.message);
            return res.status(500).json({ message: "An error occurred while fetching identify data." });
        }
    }

    async confirmNewPassword(req, res) {
        try {
            const { username, email, newPassword } = req.body;
            const user = await this.userModel.findByUsername(username);
            
            if (!user) return res.status(404).json({ error: "User not found" });
            
            const userId = user.id;
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            const data = { email: email, password: hashedPassword };
            const updatePassword = await this.userModel.update(userId, data); 
            
            if (!updatePassword) return res.status(500).json({ error: "Failed to update user data" });
            
            return res.status(200).json({ message: "Password updated successfully" });
        } catch (error) {
            console.error("Error:", error.message);
            return res.status(500).json({ message: "Failed to update password" });
        }
    }
}

export default IdentifyController;