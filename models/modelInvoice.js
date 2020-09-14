const database = require('../configs/database.js');
var express = require('express');
const { query } = require('express');
var router = express.Router();


//Invoice
router.getInvoiceAll = function() {
    return new Promise((resolve, reject) => {
        database.getConnection().query(`SELECT i.id, i.tanggal, i.kode_client as kodeClient, c.nama as namaClient, i.ket,
        di.id_item_jahit as idItemJahit,
        di.id_item_barang_return as idItemBarangReturn,
        di.id_item_barang_sisa as idItemBarangSisa
        FROM invoice as i 
        INNER JOIN detil_invoice as di 
        INNER JOIN client as c 
        ON i.id = di.id_invoice AND i.kode_client = c.kode  AND i.status_aktif = 'Y'`,(err,results) => {
            if (err) {
                console.log(err)
                return reject(err)
            } 

            return resolve(results)  
        })
    })
}

router.getInvoiceById = function(id) {
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

router.insertInvoice = function(data) {
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

router.updateInvoice = function(data) {
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

router.deleteInvoice = function(id) {
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
//End of Invoice



module.exports = router