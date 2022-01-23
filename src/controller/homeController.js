import { redirect } from 'express/lib/response';
import pool from '../configs/connectDB';

let getHomepage = async (req, res) =>{
    const [rows, fields] = await pool.execute('SELECT * FROM Users');      
    return res.render('index.ejs', { dataUsers : rows} );
}

let getDetailpage = async (req, res) =>{
    let userId = req.params.userId;
    let [Users] = await pool.execute(`SELECT * FROM Users where id = ?`, [userId]);
    return res.send(Users);
}

let getNewusers = async (req, res) =>{
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let age = req.body.age;
    let email = req.body.email;

    await pool.execute(`INSERT INTO Users (firstName, lastName, age, email) values(?, ?, ?, ?)`, [firstName, lastName, age, email]);
    return res.redirect('/');
}

module.exports = {
    getHomepage, getDetailpage, getNewusers 
}