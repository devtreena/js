import connection from '../configs/connectDB';

let getHomepage = (req, res) =>{
    let data = []
    connection.query(
        'SELECT * FROM Users',
        function (err, results, fields){
            console.log('check mysql :', results[0])
            data = results.map((row) => { return row} )
        }
    )
    return res.render('index.ejs', { dataUsers : JSON.stringify(data) })
}

module.exports = {
    getHomepage
}