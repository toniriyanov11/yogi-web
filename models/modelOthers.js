const database = require('../configs/database.js');
var express = require('express');
var router = express.Router();

router.getMaterials= function(id) {
    return new Promise((resolve, reject) => {
        database.getConnection().query(`SELECT b.id, b.id_pengeluaran as idPengeluaran, b.kode_jenis as kodeJenisBahanBaku, 
        b.kode_supplier as kodeSupplier, b.sisa, jp.nama as ketJenisBahanBaku, s.nama as namaSupplier, p.jumlah as jumlah, 
        p.nominal as hargaTotal, (select round(p.nominal/p.jumlah , 2) from dual) hargaSatuan 
        FROM bahan_baku as b 
        INNER JOIN pengeluaran as p 
        INNER JOIN ms_jenis_produk as jp 
        INNER JOIN supplier as s 
        ON b.id_pengeluaran = p.id AND b.kode_jenis = jp.kode AND b.kode_supplier = s.kode AND p.status_aktif = "Y"`,(err,results) => {
            if (err) {
                return reject(err)
            } 
            return resolve(results)
        })
    })
}
module.exports = router