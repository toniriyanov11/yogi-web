const database = require('../configs/database.js');
var express = require('express');
const { query } = require('express');
var router = express.Router();

router.getPembelianAll = function() {
    return new Promise((resolve, reject) => {
        database.getConnection().query(`SELECT id, tanggal, jumlah, nominal, nama,
        kode_sub_jenis as kodeJenisPembelian, kode_status_bayar as kodeStatusBayar,
         (select nama from ms_sub_jenis_pengeluaran where kode = pengeluaran.kode_sub_jenis) ketJenisPembelian,
         (select nama from ms_status_bayar where kode = pengeluaran.kode_status_bayar) ketStatusBayar 
         FROM pengeluaran WHERE status_aktif = 'Y' AND kode_jenis = 1`,(err,results) => {
            if (err) {
                return reject(err)
            } 

            return resolve(results)  
        })
    })
}

router.getPembelianById = function(id) {
    console.log('id'+id)
    return new Promise((resolve, reject) => {
        database.getConnection().query(`SELECT id, tanggal, jumlah, nominal, nama, ket,
        kode_sub_jenis as kodeJenisPembelian, kode_status_bayar as kodeStatusBayar,
         (select nama from ms_sub_jenis_pengeluaran where kode = pengeluaran.kode_sub_jenis) ketJenisPembelian,
         (select kode_jenis from bahan_baku where id_pengeluaran = pengeluaran.id) kodeJenisBahanBaku,
         (select nama from ms_jenis_produk where kode = kodeJenisBahanBaku) ketJenisBahanBaku, 
         (select kode_supplier from bahan_baku where id_pengeluaran = pengeluaran.id ) kodeSupplier,
         (select nama from supplier where kode = kodeSupplier) namaSupplier, 
         (select nama from ms_status_bayar where kode = pengeluaran.kode_status_bayar) ketStatusBayar,
         (select nilai_penyusutan from inventori where id_pengeluaran = pengeluaran.id) nilaiPenyusutan,
        CASE kode_status_bayar WHEN '2' THEN (select nominal from hutang where id_pengeluaran = pengeluaran.id) 
        WHEN '3' THEN (select nominal from hutang where id_pengeluaran = pengeluaran.id) 
        ELSE ''
        END AS hutang 
        FROM pengeluaran WHERE status_aktif = 'Y' AND kode_jenis = 1 AND id = ?`,[id],(err,results) => {
            if (err) {
                return reject(err)
            } 
            return resolve(results)
        })
    })
}

router.insertPembelianTypeMaterial = function(data) {
    return new Promise((resolve, reject) => {
        database.getConnection().query(`CALL P_PEMBELIAN_BAHAN_BAKU(?,?,?,?,?,?,?,?,?,?)`,[data.jenisBahanBaku,data.tanggal,data.nama,data.jumlah,data.total,data.statusBayar,data.ket,data.supplier,data.hutang,data.tglSekarang],(err,results) => {
            if (err) {
                database.getConnection().query(`ROLLBACK;`)
                console.log(err)
                return reject(err)
            }else{
                database.getConnection().query(`COMMIT;`)
                return resolve(results)
            }
        })
    })
}

router.insertPembelianTypeInventory = function(data) {
    return new Promise((resolve, reject) => {
        database.getConnection().query(`CALL P_PEMBELIAN_INVENTORI(?,?,?,?,?,?,?,?,?)`,[data.tanggal,data.nama,data.jumlah,data.total,data.statusBayar,data.ket,data.nilaiPenyusutan,data.hutang,data.tglSekarang],(err,results) => {
            if (err) {
                database.getConnection().query(`ROLLBACK;`)
                console.log(err)
                return reject(err)
            }else{
                database.getConnection().query(`COMMIT;`)
                return resolve(results)
            }
        })
    })
}


router.updatePembelian = function(data) {
    return new Promise((resolve, reject) => {
        database.getConnection().query(`UPDATE pengeluaran SET tanggal = ?, nama = ?, jumlah = ?, ket = ? WHERE id = ? `,[data.tanggal,data.nama,data.jumlah,data.ket,data.id],(err,results) => {
            if (err) {
                return reject(err)
            }else{
                return resolve(results)
            }
        })
    })
}

router.deletePembelian = function(id) {
    return new Promise((resolve, reject) => {
        database.getConnection().query(`UPDATE pengeluaran SET status_aktif = 'T' WHERE pengeluaran.id = ?`,[id],(err,results) => {
            if (err) {
                return reject(err)
            }else{
                return resolve(results) 
            } 
        })
    })
}
module.exports = router