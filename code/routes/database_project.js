//Use mysql in this app
var mysql = require('mysql');


//Create a pool (group) of connections to be used for connecting with SQL server
var dbConnectionPool = mysql.createPool({
    host : 'localhost', //Location of database
    database : 'Website_Database'
})

//Express will run this function on every request
//For all requests that we handle in index.js, we'll be able to access the pool of connections using req.pool
app.use(function(req,res,next){
    req.pool = dbConnectionPool; //pool value can be changed if needed.
    next();

})

