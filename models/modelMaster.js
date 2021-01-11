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

router.getClient = function() {
    return new Promise((resolve, reject) => {
        database.getConnection().query(`SELECT * FROM client`,(err,results) => {
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


router.getLoadType = function() {
    return new Promise((resolve, reject) => {
        database.getConnection().query(`SELECT * FROM ms_sub_jenis_pengeluaran WHERE kode_tipe_pengeluaran = 2`,(err,results) => {
            if (err) {
                return reject(err)
            } else {
                return resolve(results)
            }
        })
    })
}

router.getCsrType = function() {
    return new Promise((resolve, reject) => {
        database.getConnection().query(`SELECT * FROM ms_sub_jenis_pengeluaran WHERE kode_tipe_pengeluaran = 4`,(err,results) => {
            if (err) {
                return reject(err)
            } else {
                return resolve(results)
            }
        })
    })
}

router.getPaymentType = function() {
    return new Promise((resolve, reject) => {
        database.getConnection().query(`SELECT * FROM ms_sub_jenis_pengeluaran WHERE kode_tipe_pengeluaran = 3`,(err,results) => {
            if (err) {
                return reject(err)
            } else {
                return resolve(results)
            }
        })
    })
}

router.getStuffType = function() {
    return new Promise((resolve, reject) => {
        database.getConnection().query(`SELECT * FROM ms_jenis_bahan`,(err,results) => {
            if (err) {
                return reject(err)
            } else {
                return resolve(results)
            }
        })
    })
}

router.getStuffVariant = function() {
    return new Promise((resolve, reject) => {
        database.getConnection().query(`SELECT * FROM ms_varian_bahan`,(err,results) => {
            if (err) {
                return reject(err)
            } else {
                return resolve(results)
            }
        })
    })
}

router.getStuffColor = function() {
    return new Promise((resolve, reject) => {
        database.getConnection().query(`SELECT * FROM ms_warna_bahan`,(err,results) => {
            if (err) {
                return reject(err)
            } else {
                return resolve(results)
            }
        })
    })
}

router.getCuttingType = function() {
    return new Promise((resolve, reject) => {
        database.getConnection().query(`SELECT * FROM ms_tipe_cutting`,(err,results) => {
            if (err) {
                return reject(err)
            } else {
                return resolve(results)
            }
        })
    })
}

router.getSubCuttingType = function() {
    return new Promise((resolve, reject) => {
        database.getConnection().query(`SELECT * FROM ms_tipe_sub_cutting`,(err,results) => {
            if (err) {
                return reject(err)
            } else {
                return resolve(results)
            }
        })
    })
}

//query lama sebelumnya (getStuffStock)
// SELECT jp.kode,jp.nama,sum(sisa) as stock FROM bahan_baku as bb 
//         INNER JOIN pengeluaran as p 
//         INNER JOIN ms_jenis_produk as jp 
//         ON bb.id_pengeluaran = p.id and bb.kode_jenis = jp.kode and p.status_aktif = 'Y' 
//         GROUP BY jp.kode
router.getStuffStock = function() {
    return new Promise((resolve, reject) => {
        database.getConnection().query(`
        
        select kode, nama, IFNULL((SELECT sum(sisa) as stock 
		FROM bahan_baku as bb 
        INNER JOIN pengeluaran as p 
        INNER JOIN ms_jenis_produk as jp 
        ON bb.id_pengeluaran = p.id and bb.kode_jenis = jp.kode and jp.kode = 1 and p.status_aktif = 'Y' 
        GROUP BY jp.kode),0) as stock from ms_jenis_produk where kode = 1
        UNION
        select kode, nama, IFNULL((SELECT sum(sisa) as stock 
		FROM bahan_baku as bb 
        INNER JOIN pengeluaran as p 
        INNER JOIN ms_jenis_produk as jp 
        ON bb.id_pengeluaran = p.id and bb.kode_jenis = jp.kode and jp.kode = 2 and p.status_aktif = 'Y' 
        GROUP BY jp.kode),0) as stock from ms_jenis_produk where kode = 2`,(err,results) => {
            if (err) {
                return reject(err)
            } else {
                return resolve(results)
            }
        })
    })
}


//master warna
router.insertMasterWarna = function(data) {
    return new Promise((resolve, reject) => {
        database.getConnection().query(`INSERT INTO ms_warna_bahan (nama, user_rekam, tgl_rekam) value (?,?,?)`,[data.nama, data.userAkun, data.tglSekarang],(err,results) => {
            if (err) {
                console.log(err)
                return reject(err)
            }else{
                return resolve(results)
            }
        })
    })
}

router.updateMasterWarna = function(data) {
    return new Promise((resolve, reject) => {
        database.getConnection().query(`UPDATE ms_warna_bahan SET nama = ? where kode = ?`,[data.nama ,data.kode],(err,results) => {
            if (err) {
                console.log(err)
                return reject(err)
            }else{
                return resolve(results)
            }
        })
    })
}

//master jenis bahan
router.insertMasterJenisBahan = function(data) {
    return new Promise((resolve, reject) => {
        database.getConnection().query(`INSERT INTO ms_jenis_bahan (nama, user_rekam, tgl_rekam) value (?,?,?)`,[data.nama, data.userAkun, data.tglSekarang],(err,results) => {
            if (err) {
                console.log(err)
                return reject(err)
            }else{
                return resolve(results)
            }
        })
    })
}

router.updateMasterJenisBahan= function(data) {
    return new Promise((resolve, reject) => {
        database.getConnection().query(`UPDATE ms_jenis_bahan SET nama = ? where kode = ?`,[data.nama ,data.kode],(err,results) => {
            if (err) {
                console.log(err)
                return reject(err)
            }else{
                return resolve(results)
            }
        })
    })
}

//master varian bahan
router.insertMasterVarianBahan = function(data) {
    return new Promise((resolve, reject) => {
        database.getConnection().query(`INSERT INTO ms_varian_bahan (nama, user_rekam, tgl_rekam) value (?,?,?)`,[data.nama, data.userAkun, data.tglSekarang],(err,results) => {
            if (err) {
                console.log(err)
                return reject(err)
            }else{
                return resolve(results)
            }
        })
    })
}

router.updateMasterVarianBahan= function(data) {
    return new Promise((resolve, reject) => {
        database.getConnection().query(`UPDATE ms_varian_bahan SET nama = ? where kode = ?`,[data.nama ,data.kode],(err,results) => {
            if (err) {
                console.log(err)
                return reject(err)
            }else{
                return resolve(results)
            }
        })
    })
}


module.exports = router