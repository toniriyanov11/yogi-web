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



//Sablon
router.getSablonAll = function() {
    return new Promise((resolve, reject) => {
        database.getConnection().query(`select x.id, x.tanggal, x.upah, x.nama, x.ket
        , c.nama as namaItem, c.jumlah as jumlahItem, c.upah as upahItem,
        (c.harga_per_kg*(c.berat/c.jumlah)) + c.upah as totalBiayaItemPerPcs
        from (SELECT s.id, s.tanggal, s.upah, s.nama,  s.ket,
                ds.id_item as idItem
                FROM sablon as s 
                INNER JOIN detil_sablon as ds 
                ON s.id = ds.id_sablon  AND s.status_aktif = 'Y'
              ) as x
               INNER join cutting as c on c.id in (x.idItem)`,(err,results) => {
            if (err) {
                return reject(err)
            } 

            return resolve(results)  
        })
    })
}

router.getSablonById = function(id) {
    return new Promise((resolve, reject) => {
        database.getConnection().query(`select x.id, x.idItem, x.tanggal, x.upah, x.nama, x.ket
        , c.nama as namaItem, c.jumlah as jumlahItem, c.upah as upahItem,
        (c.harga_per_kg*(c.berat/c.jumlah)) + c.upah as totalBiayaItemPerPcs
        from (SELECT s.id, s.tanggal, s.upah, s.nama,  s.ket,
                ds.id_item as idItem
                FROM sablon as s 
                INNER JOIN detil_sablon as ds 
                ON s.id = ds.id_sablon  AND s.status_aktif = 'Y'
              ) as x
               INNER join cutting as c on c.id in (x.idItem) AND x.id = ?`,[id],(err,results) => {
            if (err) {
                return reject(err)
            } 
            return resolve(results)
        })
    })
}

router.insertSablon = function(data) {
    return new Promise((resolve, reject) => {
        database.getConnection().query(`CALL P_SABLON(?,?,?,?,?,?)`,[data.tanggal, data.nama, data.upah, data.ket , data.tglSekarang , data.item],(err,results) => {
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

router.updateSablon = function(data) {
    return new Promise((resolve, reject) => {
        database.getConnection().query(`UPDATE sablon SET tanggal = ?, nama = ?, ket = ? WHERE id = ? `,[data.tanggal,data.nama,data.ket,data.id],(err,results) => {
            if (err) {
                return reject(err)
            }else{
                return resolve(results)
            }
        })
    })
}

router.deleteSablon = function(id) {
    return new Promise((resolve, reject) => {
        database.getConnection().query(`UPDATE sablon SET status_aktif = 'T' WHERE id = ?`,[id],(err,results) => {
            if (err) {
                return reject(err)
            }else{
                return resolve(results) 
            } 
        })
    })
}
//End of Sablon



//Jahit
router.getJahitAll = function() {
    return new Promise((resolve, reject) => {
        database.getConnection().query(`SELECT x.id, x.idItemCutting, x.idItemSablon, x.tanggal, x.upah, x.nama, x.ket
        , c.nama as namaItemCutting, c.jumlah as jumlahItemCutting, c.upah as upahItemCutting,
        (c.harga_per_kg*(c.berat/c.jumlah)) + c.upah as totalBiayaItemCuttingPerPcs,
        s.nama as namaItemSablon, s.jumlah as jumlahItemSablon, s.upah as upahItemSablon,  s.totalBiayaItemPerPcs as totalBiayaItemSablonPerPcs
        FROM (SELECT j.id, j.tanggal, j.upah, j.nama,  j.ket,
                dj.id_item_cutting as idItemCutting,
                dj.id_item_sablon as idItemSablon
                FROM jahit as j 
                INNER JOIN detil_jahit as dj 
                ON j.id = dj.id_jahit  AND j.status_aktif = 'Y' 
              ) as x
              LEFT join cutting as c on c.id in (x.idItemCutting)
              LEFT join 
              (SELECT s.id, s.tanggal, s.upah, s.nama,  s.ket,
                ds.id_item as idItem, sum(c.jumlah) as jumlah,  sum((c.harga_per_kg*(c.berat/c.jumlah) + c.upah)) / count(c.id) + s.upah as totalBiayaItemPerPcs
                FROM sablon as s 
                INNER JOIN detil_sablon as ds 
                INNER JOIN cutting as c
                ON s.id = ds.id_sablon AND ds.id_item = c.id  AND s.status_aktif = 'Y' GROUP BY ds.id_sablon
              ) as s on s.id in (x.idItemSablon)
               `,(err,results) => {
            if (err) {
                console.log(err)
                return reject(err)
            } 

            return resolve(results)  
        })
    })
}

router.getJahitById = function(id) {
    console.log("Id"+id)
    return new Promise((resolve, reject) => {
        database.getConnection().query(`SELECT x.id, x.idItemCutting, x.idItemSablon, x.tanggal, x.upah, x.nama, x.ket
        , c.nama as namaItemCutting, c.jumlah as jumlahItemCutting, c.upah as upahItemCutting,
        (c.harga_per_kg*(c.berat/c.jumlah)) + c.upah as totalBiayaItemCuttingPerPcs,
        s.nama as namaItemSablon, s.jumlah as jumlahItemSablon, s.upah as upahItemSablon,  s.totalBiayaItemPerPcs as totalBiayaItemSablonPerPcs
        FROM (SELECT j.id, j.tanggal, j.upah, j.nama,  j.ket,
                dj.id_item_cutting as idItemCutting,
                dj.id_item_sablon as idItemSablon
                FROM jahit as j 
                INNER JOIN detil_jahit as dj 
                ON j.id = dj.id_jahit  AND j.status_aktif = 'Y' 
              ) as x
              LEFT join cutting as c on c.id in (x.idItemCutting)
              LEFT join 
              (SELECT s.id, s.tanggal, s.upah, s.nama,  s.ket,
                ds.id_item as idItem, sum(c.jumlah) as jumlah,  sum((c.harga_per_kg*(c.berat/c.jumlah) + c.upah)) / count(c.id) + s.upah   as totalBiayaItemPerPcs
                FROM sablon as s 
                INNER JOIN detil_sablon as ds 
                INNER JOIN cutting as c
                ON s.id = ds.id_sablon AND ds.id_item = c.id  AND s.status_aktif = 'Y' GROUP BY ds.id_sablon
              ) as s on s.id in (x.idItemSablon) WHERE x.id = ?`,[id],(err,results) => {
            if (err) {
                return reject(err)
            } 
            return resolve(results)
        })
    })
}

router.insertJahit = function(data) {
    return new Promise((resolve, reject) => {
        database.getConnection().query(`CALL P_JAHIT(?,?,?,?,?,?,?)`,[data.tanggal, data.nama, data.upah, data.ket , data.tglSekarang , data.item, data.jenisItem],(err,results) => {
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

router.updateJahit = function(data) {
    return new Promise((resolve, reject) => {
        database.getConnection().query(`UPDATE jahit SET tanggal = ?, nama = ?, ket = ? WHERE id = ? `,[data.tanggal,data.nama,data.ket,data.id],(err,results) => {
            if (err) {
                return reject(err)
            }else{
                return resolve(results)
            }
        })
    })
}

router.deleteJahit = function(id) {
    return new Promise((resolve, reject) => {
        database.getConnection().query(`UPDATE jahit SET status_aktif = 'T' WHERE id = ?`,[id],(err,results) => {
            if (err) {
                return reject(err)
            }else{
                return resolve(results) 
            } 
        })
    })
}
//End of Jahit



module.exports = router