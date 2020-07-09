const database = require('../configs/database.js');
var express = require('express');
var router = express.Router();

router.getClientById = function(id) {
    return new Promise((resolve, reject) => {
        database.getConnection().query(`SELECT kode, nama, alamat, email, no_hp as noHp
        FROM client WHERE kode = ?`,[id],(err,results) => {
            if (err) {
                return reject(err)
            } 
            return resolve(results)
        })
    })
}

router.insertClient = function(data) {
    return new Promise((resolve, reject) => {
        database.getConnection().query(`
        INSERT INTO client (nama, email, no_hp, alamat, tgl_rekam) VALUES (?,?,?,?,?);`,[data.nama,data.email,data.noHp,data.alamat,data.tglSekarang],(err,results) => {
            if (err) {
                return reject(err)
            }else{
                return resolve(results)
            }
        })
    })
}

router.updateClient = function(data) {
    return new Promise((resolve, reject) => {
        database.getConnection().query(`UPDATE client SET nama = ?, email = ?, no_hp = ?, alamat = ? WHERE kode = ? `,[data.nama,data.email,data.noHp,data.alamat,data.kode],(err,results) => {
            if (err) {
                return reject(err)
            }else{
                return resolve(results)
            }
        })
    })
}

module.exports = router