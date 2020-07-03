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


router.getBuyingType = function() {
    return new Promise((resolve, reject) => {
        database.getConnection().query(`SELECT * FROM ms_sub_jenis_pengeluaran WHERE kode_tipe_pengeluaran = 1`,(err,results) => {
            if (err) {
                return reject(err)
            } else {
                return resolve(results)
            }
        })
    })
}

router.getMasterMaterial = function() {
    return new Promise((resolve, reject) => {
        database.getConnection().query(`SELECT * FROM ms_jenis_produk`,(err,results) => {
            if (err) {
                return reject(err)
            } else {
                return resolve(results)
            }
        })
    })
}

router.getSupplier = function() {
    return new Promise((resolve, reject) => {
        database.getConnection().query(`SELECT * FROM supplier`,(err,results) => {
            if (err) {
                return reject(err)
            } else {
                return resolve(results)
            }
        })
    })
}

module.exports = router