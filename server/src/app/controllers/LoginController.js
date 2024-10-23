import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from "bcrypt";

class LoginController {
    // POST hocalhost/login
    async login(req, res) {
        try {
            const { username, password } = req.body;
            const user = await User.findByUsername(username);
            if (!user) {
                // res error if cannot find user 
                return res.status(400).json({ field: 'username', error: 'Username is not correct' });
            }
            const isPasswordValid = await bcrypt.compare(password, user.password);

            if (!isPasswordValid) {
                // res error if password is not correct 
                return res.status(400).json({ field: 'password', error: 'Password is not correct' });
            }
            // res data if success
            const token = jwt.sign(
                {
                    id: user.id,
                    username: user.name,
                    email: user.email,
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: process.env.JWT_EXPIRE,
                }
            )

            // return res.status(200).json({
            //     data: user,
            // })
            return res.status(200).json({
                message: 'Login Successful',
                token: token,
                user: {
                    id: user.id,
                    username: user.name,
                    email: user.email
                }
            })
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

export default new LoginController();

// async login(req, res) {
//     try {
//         const { username, password } = req.body;

//         // Tìm người dùng trong cơ sở dữ liệu
//         const user = await User.findByUsername({ username });

//         if (!user) {
//             // Trả về phản hồi cho client nếu không tìm thấy user
//             return res.status(400).json({ field: 'username', error: 'Username is not correct' });
//         }

//         // Kiểm tra mật khẩu
//         const isPasswordValid = await bcrypt.compare(password, user.password);
//         if (!isPasswordValid) {
//             // Trả về phản hồi nếu mật khẩu không đúng
//             return res.status(400).json({ field: 'password', error: 'Password is not correct' });
//         }

//         // Tạo JWT token sau khi đăng nhập thành công
//         const token = jwt.sign(
//             { id: user._id, username: user.username },
//             process.env.JWT_SECRET,
//             { expiresIn: '1h' }
//         );

//         return res.status(200).json({ 
//             message: 'Login successful',
//             token: token,
//             user: {
//                 id: user._id,
//                 username: user.username,
//                 email: user.email
//             }
//         });
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ error: 'Internal Server Error' });
//     }
// }
