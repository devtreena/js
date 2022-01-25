
import express from 'express';
import configViewEngine from './configs/viewEngine';
import initWebRoute from './route/web';
import pool from './configs/connectDB';
import initAPIroute from './route/api';
import { require } from 'app-root-path';

require('dotenv').config();
var morgan = require('morgan');

const app = express();
const port = process.env.PORT || 9090

app.use( morgan('combined') );

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// set up viewengine
configViewEngine(app);

// init web route
initWebRoute(app);

//  init api route
initAPIroute(app);

// handle 404 not found
app.use((req, res) =>{
  return res.render('404.ejs');
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})