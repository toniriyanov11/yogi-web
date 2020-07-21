const database = require('../configs/database.js');
var express = require('express');
const { query } = require('express');
var router = express.Router();


//Pembelian
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
         (select datediff(NOW(),tanggal)) as lamaKepemilikan,
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
        database.getConnection().query(`UPDATE pengeluaran SET tanggal = ?, nama = ?, ket = ? WHERE id = ? `,[data.tanggal,data.nama,data.ket,data.id],(err,results) => {
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
//End of Pembelian



//Beban
router.getBebanAll = function() {
    return new Promise((resolve, reject) => {
        database.getConnection().query(`SELECT id, tanggal, jumlah, nominal, nama,
        kode_sub_jenis as kodeJenisBeban, kode_status_bayar as kodeStatusBayar,
         (select nama from ms_sub_jenis_pengeluaran where kode = pengeluaran.kode_sub_jenis) ketJenisBeban,
         (select nama from ms_status_bayar where kode = pengeluaran.kode_status_bayar) ketStatusBayar 
         FROM pengeluaran WHERE status_aktif = 'Y' AND kode_jenis = 2`,(err,results) => {
            if (err) {
                return reject(err)
            } 

            return resolve(results)  
        })
    })
}

router.getBebanById = function(id) {
    console.log('id'+id)
    return new Promise((resolve, reject) => {
        database.getConnection().query(`SELECT id, tanggal, jumlah, nominal, nama, ket,
        kode_sub_jenis as kodeJenisBeban, kode_status_bayar as kodeStatusBayar,
         (select nama from ms_sub_jenis_pengeluaran where kode = pengeluaran.kode_sub_jenis) ketJenisBeban, 
         (select nama from ms_status_bayar where kode = pengeluaran.kode_status_bayar) ketStatusBayar,
        CASE kode_status_bayar WHEN '2' THEN (select nominal from hutang where id_pengeluaran = pengeluaran.id) 
        WHEN '3' THEN (select nominal from hutang where id_pengeluaran = pengeluaran.id) 
        ELSE ''
        END AS hutang 
        FROM pengeluaran WHERE status_aktif = 'Y' AND kode_jenis = 2 AND id = ?`,[id],(err,results) => {
            if (err) {
                return reject(err)
            } 
            return resolve(results)
        })
    })
}

router.insertBebanTypeOthers= function(data) {
    return new Promise((resolve, reject) => {
        database.getConnection().query(`CALL P_BEBAN_LAINNYA(?,?,?,?,?,?,?,?)`,[data.tanggal,data.nama,data.jumlah,data.total,data.statusBayar,data.ket,data.hutang,data.tglSekarang],(err,results) => {
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

router.updateBeban= function(data) {
    return new Promise((resolve, reject) => {
        database.getConnection().query(`UPDATE pengeluaran SET tanggal = ?, nama = ?, ket = ? WHERE id = ? `,[data.tanggal,data.nama,data.ket,data.id],(err,results) => {
            if (err) {
                return reject(err)
            }else{
                return resolve(results)
            }
        })
    })
}

router.deleteBeban = function(id) {
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
//End of Beban


//Pembayaran
router.getPembayaranAll = function() {
    return new Promise((resolve, reject) => {
        database.getConnection().query(`SELECT id, tanggal, jumlah, nominal, nama,
        kode_sub_jenis as kodeJenisPembayaran, kode_status_bayar as kodeStatusBayar,
         (select nama from ms_sub_jenis_pengeluaran where kode = pengeluaran.kode_sub_jenis) ketJenisPembayaran,
         (select nama from ms_status_bayar where kode = pengeluaran.kode_status_bayar) ketStatusBayar 
         FROM pengeluaran WHERE status_aktif = 'Y' AND kode_jenis = 3`,(err,results) => {
            if (err) {
                return reject(err)
            } 

            return resolve(results)  
        })
    })
}

router.getPembayaranById = function(id) {
    console.log('id'+id)
    return new Promise((resolve, reject) => {
        database.getConnection().query(`SELECT id, tanggal, jumlah, nominal, nama, ket,
        kode_sub_jenis as kodeJenisPembayaran, kode_status_bayar as kodeStatusBayar,
         (select nama from ms_sub_jenis_pengeluaran where kode = pengeluaran.kode_sub_jenis) ketJenisPembayaran,
         (select kode_client from pembayaran_return where id_pengeluaran = pengeluaran.id ) kodeClient,
         (select nama from client where kode = kodeClient) namaClient,  
         (select nama from ms_status_bayar where kode = pengeluaran.kode_status_bayar) ketStatusBayar,
        CASE kode_status_bayar WHEN '2' THEN (select nominal from hutang where id_pengeluaran = pengeluaran.id) 
        WHEN '3' THEN (select nominal from hutang where id_pengeluaran = pengeluaran.id) 
        ELSE ''
        END AS hutang 
        FROM pengeluaran WHERE status_aktif = 'Y' AND kode_jenis = 3 AND id = ?`,[id],(err,results) => {
            if (err) {
                return reject(err)
            } 
            return resolve(results)
        })
    })
}

router.insertPembayaranTypeReturnPayment= function(data) {
    return new Promise((resolve, reject) => {
        database.getConnection().query(`CALL P_PEMBAYARAN_RETURN (?,?,?,?,?,?,?,?,?)`,[data.tanggal,data.nama,data.jumlah,data.total,data.statusBayar,data.ket,data.client,data.hutang,data.tglSekarang],(err,results) => {
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

router.updatePembayaran= function(data) {
    return new Promise((resolve, reject) => {
        database.getConnection().query(`UPDATE pengeluaran SET tanggal = ?, nama = ?, ket = ? WHERE id = ? `,[data.tanggal,data.nama,data.ket,data.id],(err,results) => {
            if (err) {
                return reject(err)
            }else{
                return resolve(results)
            }
        })
    })
}

router.deletePembayaran = function(id) {
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
//End of Pembayaran


module.exports = router