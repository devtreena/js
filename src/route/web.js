import express from 'express';
import homeController from '../controller/homeController';

let router = express.Router();
const initWebRoute = (app) =>{
    router.get('/', homeController.getHomepage );
    router.get('/detail-user/:userId', homeController.getDetailpage);
    router.post('/create-newUsers', homeController.getNewusers);
    router.post('/delete-user', homeController.deleteUser);
    router.get('/edit-user/:userId', homeController.getEditpage);
    router.post('/update-user', homeController.postUpdateuser);
    return app.use('/', router);
}

export default initWebRoute;