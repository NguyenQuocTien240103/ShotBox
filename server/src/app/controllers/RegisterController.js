import User from '../models/User.js';
class RegisterController {
    // POST hocalhost/register
    async register(req, res) {
        try {
            const userExists = await User.findByUsername(req.body);
            if (userExists) {
                return res.status(400).json({ error: 'User already exists.' });
            }
            const newUserId = await User.create(req.body);
            return res.status(201).json({ id: newUserId });
        } catch (error) {
            console.error('Error during registration:', error); // Log lỗi chi tiết
            return res.status(500).json({ error: error.message });
        }
    }
}

export default new RegisterController();