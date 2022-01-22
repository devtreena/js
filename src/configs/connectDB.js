import { json } from 'body-parser';
import mysql from 'mysql2';

const connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    database : 'js',
})



export default connection;