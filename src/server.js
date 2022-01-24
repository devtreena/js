
import express from 'express';
import configViewEngine from './configs/viewEngine';
import initWebRoute from './route/web';
import pool from './configs/connectDB';
import initAPIroute from './route/api';

require('dotenv').config();

const app = express();
const port = process.env.PORT || 9090

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// set up viewengine
configViewEngine(app);

// init web route
initWebRoute(app);

//  init api route
initAPIroute(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})