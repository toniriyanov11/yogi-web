const database = require('../configs/database.js');
var express = require('express');
const { query } = require('express');
var router = express.Router();

router.getPemasukanAll = function() {
    return new Promise((resolve, reject) => {
        database.getConnection().query(`SELECT id, tanggal, jumlah, nominal, nama,
        kode_jenis as kodeJenisPemasukan, kode_status_bayar as kodeStatusBayar,
         (select nama from ms_jenis_pemasukan where kode = pemasukan.kode_jenis) ketJenisPemasukan,
         (select nama from ms_status_bayar where kode = pemasukan.kode_status_bayar) ketStatusBayar 
         FROM pemasukan WHERE status_aktif = 'Y'`,(err,results) => {
            if (err) {
                return reject(err)
            } 

            return resolve(results)  
        })
    })
}

router.getPemasukanById = function(id) {
    console.log('id'+id)
    return new Promise((resolve, reject) => {
        database.getConnection().query(`SELECT id, tanggal, jumlah, nominal, nama, ket,
        kode_jenis as kodeJenisPemasukan, kode_status_bayar as kodeStatusBayar, 
        (select nama from ms_jenis_pemasukan where kode = pemasukan.kode_jenis) ketJenisPemasukan, 
        (select kode_client from pembayaran_invoice where id_pemasukan = pemasukan.id ) kodeClient,
        (select nama from client where kode = kodeClient) namaClient, 
        (select nama from ms_status_bayar where kode = pemasukan.kode_status_bayar) ketStatusBayar,
        CASE kode_status_bayar WHEN '2' THEN (select nominal from piutang where id_pemasukan = pemasukan.id) 
        WHEN '4' THEN (select nominal from piutang where id_pemasukan = pemasukan.id) 
        ELSE ''
        END AS piutang 
        FROM pemasukan WHERE id = ?`,[id],(err,results) => {
            if (err) {
                return reject(err)
            } 
            return resolve(results)
        })
    })
}

router.insertPemasukanOtherType = function(data) {
    return new Promise((resolve, reject) => {
        database.getConnection().query(`CALL P_PEMASUKAN_LAINNYA(?,?,?,?,?,?,?,?)`,[data.jenisPemasukan,data.tanggal,data.nama,data.jumlah,data.total,data.statusBayar,data.ket,data.piutang],(err,results) => {
            if (err) {
                database.getConnection().query(`ROLLBACK;`)
                return reject(err)
            }else{
                database.getConnection().query(`COMMIT;`)
                return resolve(results)
            }
        })
    })
}

router.insertPemasukanTypeInvoicePayment = function(data) {
    console.log(data)
    return new Promise((resolve, reject) => {
        database.getConnection().query(`CALL P_PEMASUKAN_PEMBAYARAN_INVOICE(?,?,?,?,?,?,?,?,?)`,[data.jenisPemasukan,data.tanggal,data.nama,data.jumlah,data.total,data.statusBayar,data.ket,data.client,data.piutang],(err,results) => {
            console.log(err)
            if (err) {
                database.getConnection().query(`ROLLBACK;`)
                return reject(err)
            } else {
                database.getConnection().query(`COMMIT;`)
                return resolve(results)
            }
        })
    })
}

router.updatePemasukan = function(data) {
    return new Promise((resolve, reject) => {
        database.getConnection().query(`UPDATE pemasukan SET tanggal = ?, nama = ?, jumlah = ?, ket = ? WHERE id = ? `,[data.tanggal,data.nama,data.jumlah,data.ket,data.id],(err,results) => {
            if (err) {
                return reject(err)
            }else{
                return resolve(results)
            }
        })
    })
}

router.deletePemasukan = function(id) {
    return new Promise((resolve, reject) => {
        database.getConnection().query(`UPDATE pemasukan SET status_aktif = 'T' WHERE pemasukan.id = ?`,[id],(err,results) => {
            if (err) {
                return reject(err)
            }else{
                return resolve(results) 
            } 
        })
    })
}
module.exports = router