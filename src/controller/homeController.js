import { redirect } from 'express/lib/response';
import pool from '../configs/connectDB';
import multer from 'multer';


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

let deleteUser = async (req, res) =>{
    let userId = req.body.userId;
    await pool.execute(`DELETE FROM Users where id = ?`, [userId]);
    return res.redirect('/');
}

let getEditpage = async (req, res) =>{
    let userId = req.params.userId;
    let [users] = await pool.execute(`SELECT * FROM Users where id = ?`, [userId]);
    return res.render('update.ejs', { dataUsers : users[0]});
}

let postUpdateuser = async (req, res) =>{
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let age = req.body.age;
    let email = req.body.email;
    let userId = req.body.userId;

    await pool.execute(`UPDATE Users set firstName = ?, lastName = ?, age = ?, email = ? where id = ? `, [firstName, lastName, age, email, userId]);
    return res.redirect('/');
}
// uploadfile
let getUploadfile = async (req, res) =>{
    return res.render('uploadFile.ejs');
}

let handleUploadfile = async (req, res) =>{
        if (req.fileValidationError) {
            return res.send(req.fileValidationError);
        }
        else if (!req.file) {
            return res.send('Please select an image to upload');
        }

        res.send(`You have uploaded this image: <hr/><img src="/images/${req.file.filename}" width="500"><hr /><a href="./upload-file">Upload another image</a>`);
}

module.exports = {
    getHomepage, getDetailpage, getNewusers, deleteUser, getEditpage, postUpdateuser, getUploadfile, handleUploadfile
}