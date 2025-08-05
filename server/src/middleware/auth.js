import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
    const header = req.headers.authorization;

    if (!header) {
        return res.status(401).json({ error: 'No token provided' });
    }

    const token = header.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = {
            id: decoded.id,
            name: decoded.username,
            email: decoded.email,
        };
        next();
    } catch (error) {
        console.error('Invalid token:', error);
        return res.status(401).json({ error: 'Unauthorized' });
    }
};

export default auth;
