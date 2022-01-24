import express from 'express';
import homeController from '../controller/homeController';
import APIcontroller from '../controller/APIcontroller';

let router = express.Router();

const initAPIroute = (app) =>{
    router.get('/users', APIcontroller.getAllusers ); // GET DATA
    router.post('/create-user', APIcontroller.createUser); // 
    router.put('/update-user', APIcontroller.updateUser);
    router.delete('/delete-user/:userId', APIcontroller.deleteUser);

    return app.use('/api/v1', router);
}

export default initAPIroute;