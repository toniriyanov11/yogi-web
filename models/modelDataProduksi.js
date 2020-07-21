const database = require('../configs/database.js');
var express = require('express');
const { query } = require('express');
var router = express.Router();


//Cutting
router.getCuttingAll = function() {
    return new Promise((resolve, reject) => {
        database.getConnection().query(`SELECT id, tanggal, jumlah, upah, nama, berat, harga_per_kg as hargaPerKg,
        kode_jenis_produk as kodeJenisProduk, kode_jenis_bahan as kodeJenisBahan, kode_varian_bahan as kodeVarianBahan,
        kode_warna_bahan as kodeWarnaBahan, kode_tipe_cutting as kodeTipeCutting, kode_tipe_sub_cutting as kodeTipeSubCutting,
        (select nama from ms_jenis_produk where kode = kodeJenisProduk) ketJenisProduk,
        (select nama from ms_jenis_bahan where kode = kodeJenisBahan) ketJenisBahan,
        (select nama from ms_varian_bahan where kode = kodeVarianBahan) ketVarianBahan,
        (select nama from ms_warna_bahan where kode = kodeWarnaBahan) ketWarnaBahan,
        (select nama from ms_tipe_cutting where kode = kodeTipeCutting) ketTipeCutting,
        (select nama from ms_tipe_sub_cutting where kode = kodeTipeSubCutting) ketTipeSubCutting,
        (berat/jumlah) as hasilPerPcs, (harga_per_kg*(berat/jumlah)) as totalHargaBahan,
        (harga_per_kg*(berat/jumlah)) + upah as totalBiayaPerPcs, ((harga_per_kg*(berat/jumlah)) + upah) * jumlah as totalBiaya
        FROM cutting WHERE status_aktif = 'Y'`,(err,results) => {
            if (err) {
                return reject(err)
            } 

            return resolve(results)  
        })
    })
}

router.getCuttingById = function(id) {
    return new Promise((resolve, reject) => {
        database.getConnection().query(`SELECT id, tanggal, jumlah, upah, nama, berat, harga_per_kg as hargaPerKg, ket,
        kode_jenis_produk as kodeJenisProduk, kode_jenis_bahan as kodeJenisBahan, kode_varian_bahan as kodeVarianBahan,
        kode_warna_bahan as kodeWarnaBahan, kode_tipe_cutting as kodeTipeCutting, kode_tipe_sub_cutting as kodeTipeSubCutting,
        (select nama from ms_jenis_produk where kode = kodeJenisProduk) ketJenisProduk,
        (select nama from ms_jenis_bahan where kode = kodeJenisBahan) ketJenisBahan,
        (select nama from ms_varian_bahan where kode = kodeVarianBahan) ketVarianBahan,
        (select nama from ms_warna_bahan where kode = kodeWarnaBahan) ketWarnaBahan,
        (select nama from ms_tipe_cutting where kode = kodeTipeCutting) ketTipeCutting,
        (select nama from ms_tipe_sub_cutting where kode = kodeTipeSubCutting) ketTipeSubCutting,
        (berat/jumlah) as hasilPerPcs, (harga_per_kg*(berat/jumlah)) as totalHargaBahan,
        (harga_per_kg*(berat/jumlah)) + upah as totalBiayaPerPcs, ((harga_per_kg*(berat/jumlah)) + upah) * jumlah as totalBiaya
        FROM cutting WHERE status_aktif = 'Y' AND id = ?`,[id],(err,results) => {
            if (err) {
                return reject(err)
            } 
            return resolve(results)
        })
    })
}

router.insertCutting = function(data) {
    return new Promise((resolve, reject) => {
        database.getConnection().query(`CALL P_CUTTING(?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,[data.tanggal, data.nama, data.jenisProduk, data.jenisBahan , data.varianBahan , data.warnaBahan, data.tipeCutting, data.tipeSubCutting, data.berat, data.jumlah, data.upah, data.hargaPerKg, data.ket, data.tglSekarang],(err,results) => {
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

router.updateCutting = function(data) {
    return new Promise((resolve, reject) => {
        database.getConnection().query(`UPDATE cutting SET tanggal = ?, nama = ?, ket = ? WHERE id = ? `,[data.tanggal,data.nama,data.ket,data.id],(err,results) => {
            if (err) {
                return reject(err)
            }else{
                return resolve(results)
            }
        })
    })
}

router.deleteCutting = function(id) {
    return new Promise((resolve, reject) => {
        database.getConnection().query(`UPDATE cutting SET status_aktif = 'T' WHERE pengeluaran.id = ?`,[id],(err,results) => {
            if (err) {
                return reject(err)
            }else{
                return resolve(results) 
            } 
        })
    })
}
//End of Cutting


module.exports = router