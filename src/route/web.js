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
let uploadMultipleFiles = multer({ storage: storage, fileFilter: imageFilter }).array('multiple', 100);
const initWebRoute = (app) =>{
    router.get('/', homeController.getHomepage );
    router.get('/detail-user/:userId', homeController.getDetailpage);
    router.post('/create-newUsers', homeController.getNewusers);
    router.post('/delete-user', homeController.deleteUser);
    router.get('/edit-user/:userId', homeController.getEditpage);
    router.post('/update-user', homeController.postUpdateuser);

    router.get('/upload-file', homeController.getUploadfile);
    router.post('/upload-single-file', upload.single('single'), homeController.handleUploadfile);
    router.post('/upload-multiple-file', (req, res, next) => {
        uploadMultipleFiles(req, res, (err) => {
            if (err instanceof multer.MulterError && err.code === "LIMIT_UNEXPECTED_FILE") {
                res.send('LIMIT_UNEXPECTED_FILE');} 
            else if (err) {
                res.send(err)
            }
            else {
                next();
            }
        })
    }, homeController.handleUploadMultiplefile);

    return app.use('/', router);
}

export default initWebRoute;