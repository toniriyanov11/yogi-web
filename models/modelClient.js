const database = require('../configs/database.js');
var express = require('express');
var router = express.Router();

router.getClientAll = function() {
    return new Promise((resolve, reject) => {
        database.getConnection().query(`select * from client`,(err,results) => {
            if (err) {
                return reject(err)
            }
            return resolve(results)
        })
    })
}

module.exports = router