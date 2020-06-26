const database = require('../configs/database.js');
var express = require('express');
var router = express.Router();

router.getPaymentStatus = function() {
    return new Promise((resolve, reject) => {
        database.getConnection().query(`SELECT * FROM ms_status_bayar`,(err,results) => {
            if (err) {
                return reject(err)
            } else {
                return resolve(results)
            }
        })
    })
}

router.getInputType = function() {
    return new Promise((resolve, reject) => {
        database.getConnection().query(`SELECT * FROM ms_jenis_pemasukan`,(err,results) => {
            if (err) {
                return reject(err)
            } else {
                return resolve(results)
            }
        })
    })
}

module.exports = router