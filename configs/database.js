var express = require('express');
var router = express.Router();
var mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'dbyogiweb2'
});

connection.connect(function(err){
    if(err) throw err;
    console.log('MySQL read connected..');
})

router.getConnection = function(){
    return connection;
}

module.exports = router;

