import express from 'express';
import homeController from '../controller/homeController';

let router = express.Router();
const initWebRoute = (app) =>{
    router.get('/', homeController.getHomepage );
    router.get('/detail/users/:userId', homeController.getDetailpage);
    router.post('/create-newUsers', homeController.getNewusers);
    return app.use('/', router);
}

export default initWebRoute;