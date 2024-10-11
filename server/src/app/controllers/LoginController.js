import User from '../models/User.js';
class LoginController {

    // POST hocalhost/login
    async login(req, res) {

        try {
            const user = await User.findByUsername(req.body);
            if (user) {
                return res.status(201).json({ data: user })
            }
            else {
                return res.status(400).json({ error: 'Username is not correct' });
            }
        } catch (error) {
            console.log(error);
        }
    }
}

export default new LoginController();