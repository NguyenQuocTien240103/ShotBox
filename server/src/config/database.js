import mysql from 'mysql'
import dotenv from 'dotenv';
dotenv.config({ path: './.env' });

function connect() {
    const con = mysql.createConnection({
        host: process.env.DATABASE_HOST,
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE,
    })

    con.connect((err) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log('success to connect mysql');
        }
    })
}

export default { connect };