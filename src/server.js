
import express from 'express'
import configViewEngine from './configs/viewEngine';

const app = express()
const port = 9090

configViewEngine(app)
app.get('/', (req, res) => {
  res.render('index.ejs')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})