import { json } from 'body-parser';
import mysql from 'mysql2/promise';

const pool = mysql.createPool({
    host : 'localhost',
    user : 'root',
    database : 'js',
})

export default pool;