import express from 'express';
import homeController from '../controller/homeController';
import multer from 'multer';
import path from 'path';
var appRoot = require('app-root-path');
let router = express.Router();

const storage = multer.diskStorage({
    destination : function( req, file, cb) {
        cb(null, appRoot + "/src/public/images");
    },

    filename : function ( req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname) );
    }
});

const imageFilter = function(req, file, cb) {
    if (!file.originalname.match(/\.(jfif|jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed!'), false);
    }
    else cb(null, true);
};

let upload = multer({ storage :storage, fileFilter : imageFilter});

const initWebRoute = (app) =>{
    router.get('/', homeController.getHomepage );
    router.get('/detail-user/:userId', homeController.getDetailpage);
    router.post('/create-newUsers', homeController.getNewusers);
    router.post('/delete-user', homeController.deleteUser);
    router.get('/edit-user/:userId', homeController.getEditpage);
    router.post('/update-user', homeController.postUpdateuser);

    router.get('/upload-file', homeController.getUploadfile);
    router.post('/upload-single-file', upload.single('single'), homeController.handleUploadfile);
    return app.use('/', router);
}

export default initWebRoute;