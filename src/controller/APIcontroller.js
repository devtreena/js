import res from 'express/lib/response';
import pool from '../configs/connectDB';

let getAllusers = async (req, res) =>{
    const [rows, fields] = await pool.execute(`SELECT * FROM Users`);
    return res.status(200).json({
        message : 'ok',
        data : rows
    })
}

let createUser = async (req, res) =>{
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let age = req.body.age;
    let email = req.body.email;

    if(!firstName || !lastName || !age || !email){
        return res.status(200).json({
            message : 'missing required '
        })
    }
    await pool.execute(`INSERT INTO Users (firstName, lastName, age, email) values(?, ?, ?, ?)`, [firstName, lastName, age, email]);
    return res.status(200).json({
        message : 'ok'
    })
}

let updateUser = async (req, res) =>{
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let age = req.body.age;
    let email = req.body.email;
    let userId = req.body.userId;

    if(!firstName || !lastName || !age || !email || !userId){
        return res.status(200).json({
            message : 'missing required '
        })
    }
    await pool.execute(`UPDATE Users set firstName = ?, lastName = ?, age = ?, email = ? where id = ? `, [firstName, lastName, age, email, userId]);
    return res.status(200).json({
        message : 'ok'
    })
}

let deleteUser = async (req, res) =>{
    let userId = req.params.userId;

    if(!userId){
        return res.status(200).json({
            message : 'missing required '
        })
    }
    await pool.execute(`DELETE FROM Users where id = ?`, [userId]);
    return res.status(200).json({
        message : 'ok'
    })
}

module.exports ={
    getAllusers, createUser, updateUser, deleteUser
}