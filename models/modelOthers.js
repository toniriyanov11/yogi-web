const database = require('../configs/database.js');
var express = require('express');
var router = express.Router();

router.getMaterials= function() {
    return new Promise((resolve, reject) => {
        database.getConnection().query(`SELECT b.id, b.id_pengeluaran as idPengeluaran, b.kode_jenis as kodeJenisBahanBaku, 
        b.kode_supplier as kodeSupplier, b.sisa, jp.nama as ketJenisBahanBaku, s.nama as namaSupplier, p.jumlah as jumlah, 
        p.nominal as hargaTotal, (select round(p.nominal/p.jumlah , 3) from dual) hargaSatuan 
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

router.getInventorys= function() {

    return new Promise((resolve, reject) => {
        database.getConnection().query(`SELECT i.id, i.id_pengeluaran as idPengeluaran,p.nama as nama,  p.jumlah as jumlah, p.tanggal as tanggal,
        p.nominal as hargaAwal, i.nilai_penyusutan as nilaiPenyusutan, (select datediff(NOW(),p.tanggal)) as lamaKepemilikan
        FROM inventori as i 
        INNER JOIN pengeluaran as p 
        ON i.id_pengeluaran = p.id AND p.status_aktif = "Y"`,(err,results) => {
            if (err) {
                return reject(err)
            } 
            return resolve(results)
        })
    })
}


router.getAddingPrices= function(data) {

    return new Promise((resolve, reject) => {
        database.getConnection().query(`SELECT * from penambahan_biaya`,(err,results) => {
            if (err) {
                return reject(err)
            } 
            return resolve(results)
        })
    })
}

router.getBarangReturnAll= function(data) {
    return new Promise((resolve, reject) => {
        database.getConnection().query(`
        SELECT i.tanggal, br.id, br.id_detil_invoice as idDetilInvoice, br.jumlah, br.harga , (br.jumlah * br.harga) as totalHarga, br.ket from barang_return as br
        INNER JOIN detil_invoice as di
        INNER JOIN invoice as i
        ON br.id_detil_invoice = di.id AND i.id = di.id_invoice`,(err,results) => {
            if (err) {
                console.log(err)
                return reject(err)
            } 
            return resolve(results)
        })
    })
}

router.getBarangSisaAll= function(data) {
    return new Promise((resolve, reject) => {
        database.getConnection().query(`
        SELECT i.tanggal, bs.id, bs.id_detil_invoice as idDetilInvoice, bs.jumlah, bs.harga,  (bs.jumlah * bs.harga) as totalHarga ,bs.ket from barang_sisa as bs
        INNER JOIN detil_invoice as di
        INNER JOIN invoice as i
        ON bs.id_detil_invoice = di.id AND i.id = di.id_invoice`,(err,results) => {
            if (err) {
                console.log(err)
                return reject(err)
            } 
            return resolve(results)
        })
    })
}

//setup-harga barang return
router.getHargaBarangReturn= function(data) {
    return new Promise((resolve, reject) => {
        database.getConnection().query(`
        SELECT * from st_harga_barang_return`,(err,results) => {
            if (err) {
                console.log(err)
                return reject(err)
            } 
            return resolve(results)
        })
    })
}

router.updateHargaBarangReturn = function(data) {
    return new Promise((resolve, reject) => {
        database.getConnection().query(`UPDATE st_harga_barang_Return SET harga = ? ,tgl_rekam = ? `,[data.editedItem.harga, data.tglSekarang],(err,results) => {
            if (err) {
                return reject(err)
            }else{
                return resolve(results)
            }
        })
    })
}

router.getLabaRugi = function() {
    return new Promise((resolve, reject) => {
        database.getConnection().query(`SELECT i.id, i.tanggal, i.kode_client as kodeClient, c.nama as namaClient, i.ket, i.grand_total as grandTotal,
        di.id_item_barang_jadi as idItemBarangJadi,
        di.id_item_barang_return as idItemBarangReturn,
        di.id_item_barang_sisa as idItemBarangSisa,
        di.jml_barang_sisa as jumlahItemMasukBarangSisa,
        di.jml_barang_return as jumlahItemMasukBarangReturn,
       (select harga_barang from barang_jadi where id = di.id_item_barang_jadi) as hargaItemBarangJadi,
       (select harga_pokok from barang_jadi where id = di.id_item_barang_jadi) as hargaPokokItemBarangJadi,
       (select jumlah from barang_jadi where id = di.id_item_barang_jadi) as jumlahItemBarangJadi,
       (select harga from st_harga_barang_return) as hargaItemBarangReturn,
       (select harga from barang_return where id = di.id_item_barang_return) as hargaPokokItemBarangReturn,
       (select jumlah from barang_return where id = di.id_item_barang_return) as jumlahItemBarangReturn,
       (select harga from barang_sisa where id = di.id_item_barang_sisa) as hargaItemBarangSisa,
       (select harga from barang_sisa where id = di.id_item_barang_sisa) as hargaPokokItemBarangSisa,
       (select jumlah from barang_sisa where id = di.id_item_barang_sisa) as jumlahItemBarangSisa
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

router.getLabaRugiByIdInvoice = function(id) {
    return new Promise((resolve, reject) => {
        database.getConnection().query(`SELECT i.id, i.tanggal, i.kode_client as kodeClient, c.nama as namaClient, i.ket, i.grand_total as grandTotal,
        di.id_item_barang_jadi as idItemBarangJadi,
        di.id_item_barang_return as idItemBarangReturn,
        di.id_item_barang_sisa as idItemBarangSisa,
        di.jml_barang_sisa as jumlahItemMasukBarangSisa,
        di.jml_barang_return as jumlahItemMasukBarangReturn,
       (select harga_barang from barang_jadi where id = di.id_item_barang_jadi) as hargaItemBarangJadi,
       (select harga_pokok from barang_jadi where id = di.id_item_barang_jadi) as hargaPokokItemBarangJadi,
       (select jumlah from barang_jadi where id = di.id_item_barang_jadi) as jumlahItemBarangJadi,
       (select harga from st_harga_barang_return) as hargaItemBarangReturn,
       (select harga from barang_return where id = di.id_item_barang_return) as hargaPokokItemBarangReturn,
       (select jumlah from barang_return where id = di.id_item_barang_return) as jumlahItemBarangReturn,
       (select harga from barang_sisa where id = di.id_item_barang_sisa) as hargaItemBarangSisa,
       (select harga from barang_sisa where id = di.id_item_barang_sisa) as hargaPokokItemBarangSisa,
       (select jumlah from barang_sisa where id = di.id_item_barang_sisa) as jumlahItemBarangSisa
        FROM invoice as i 
        INNER JOIN detil_invoice as di 
        INNER JOIN client as c 
        ON i.id = di.id_invoice AND i.kode_client = c.kode  AND i.status_aktif = 'Y' AND i.id = ?`,[id],(err,results) => {
            if (err) {
                console.log(err)
                return reject(err)
            } 

            return resolve(results)  
        })
    })
}

module.exports = router