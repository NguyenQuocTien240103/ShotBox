import db from '../../config/database.js'
const User = {
    getAllUsername: async () => {
        const query = 'SELECT * FROM users';
        const [rows] = await db.query(query);
        return rows;
    },
    findByUsername: async (data) => {
        const username = data;
        const query = 'SELECT * FROM users WHERE name = ?';
        const [rows] = await db.query(
            query, [username]
        );
        if (rows.length > 0) {
            return rows[0];
        }
        return null;
    },
    // checkPassword: async (data) => {

    // },
    create: async (data) => {
        const { username, email, password } = data;
        const query = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
        const [result] = await db.query(
            query, [username, email, password]
        );
        return result.insertId;
    },
}

export default User;