const database = require('../configs/database.js');
var express = require('express');
const { query } = require('express');
const { forEach } = require('lodash');
var router = express.Router();


//Invoice
router.getInvoiceAll = function() {
    return new Promise((resolve, reject) => {
        database.getConnection().query(`SELECT i.id, i.tanggal, i.kode_client as kodeClient, c.nama as namaClient, i.ket, i.grand_total as grandTotal,
        di.id_item_barang_jadi as idItemBarangJadi,
        di.id_item_barang_return as idItemBarangReturn,
        di.id_item_barang_sisa as idItemBarangSisa,
        di.jml_barang_sisa as jumlahItemMasukBarangSisa,
        di.jml_barang_return as jumlahItemMasukBarangReturn,
        bj.harga_barang as hargaItemBarangJadi,
        bj.jumlah as jumlahItemBarangJadi
        FROM invoice as i 
        INNER JOIN detil_invoice as di 
        INNER JOIN client as c 
        INNER JOIN barang_jadi as bj
        ON i.id = di.id_invoice AND di.id_item_barang_jadi = bj.id  AND i.kode_client = c.kode  AND i.status_aktif = 'Y'`,(err,results) => {
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
        database.getConnection().query(` SELECT i.id, i.tanggal, i.kode_client as kodeClient, c.nama as namaClient, i.ket, i.grand_total as grandTotal,
        di.id_item_barang_jadi as idItemBarangJadi,
        di.id_item_barang_return as idItemBarangReturn,
        di.id_item_barang_sisa as idItemBarangSisa,
        di.jml_barang_sisa as jumlahItemMasukBarangSisa,
        di.jml_barang_return as jumlahItemMasukBarangReturn,
        bj.harga_barang as hargaItemBarangJadi,
        bj.jumlah as jumlahItemBarangJadi
        FROM invoice as i 
        INNER JOIN detil_invoice as di 
        INNER JOIN client as c 
        INNER JOIN barang_jadi as bj
        ON i.id = di.id_invoice AND di.id_item_barang_jadi = bj.id  AND i.kode_client = c.kode  AND i.status_aktif = 'Y' AND i.id = ?`,[id],(err,results) => {
            if (err) {
                return reject(err)
            } 
            return resolve(results)
        })
    })
}

router.insertInvoice = function(data) {
    return new Promise((resolve, reject) => {
        console.log('sampe sini')
        console.log(data.itemBarangJadi)
        database.getConnection().beginTransaction((err) => {
            if (err) {
                console.log(err)
                return reject(err)
            }
            console.log('nah sini')
                database.getConnection().query(`INSERT INTO invoice (id,tanggal,kode_client,grand_total,ket,status_aktif,tgl_rekam)
                VALUES (f_gen_id("I"),?,?,?,?,'Y',?)`,[data.tanggal, data.kodeClient, data.grandTotal, data.ket, data.tglSekarang],(err,results) =>{  
                    if (err) {
                        console.log(err)
                        database.getConnection().query(`ROLLBACK;`)
                        return reject(err)
                    }})
                
                
                    console.log(data)
                    if(data.jenisItem == 'barang jadi'){
                        data.itemBarangJadi.forEach((item,index) => { 
                            database.getConnection().query(`
                            INSERT INTO detil_invoice (id_item_barang_jadi,jml_barang_sisa,jml_barang_return,id_invoice,id)
                            select id,?,?,(select max(id) from invoice where status_aktif = 'Y'),f_gen_id("DI") from barang_jadi where id = ?`,[data.itemBarangJadi[index].jmlMasukBarangSisa, data.itemBarangJadi[index].jmlMasukBarangReturn, data.itemBarangJadi[index].id],(err,results) => {
                                if (err) {
                                    console.log(err)
                                    database.getConnection().query(`ROLLBACK;`)
                                    return reject(err)
                                }
                                if(data.itemBarangJadi[index].jmlMasukBarangReturn != 0){
                                    database.getConnection().query(`
                                    INSERT INTO barang_return (id_detil_invoice,jumlah,id)
                                    select max(id),?,f_gen_id("BR") from detil_invoice`,[ data.itemBarangJadi[index].jmlMasukBarangReturn],(err,results) => {
                                        if (err) {
                                            console.log(err)
                                            database.getConnection().query(`ROLLBACK;`)
                                            return reject(err)
                                        }
                                    })
                                }

                                if(data.itemBarangJadi[index].jmlMasukBarangSisa != 0){
                                    database.getConnection().query(`
                                    INSERT INTO barang_sisa(id_detil_invoice,jumlah,id)
                                    select max(id),?,f_gen_id("BS") from detil_invoice`,[ data.itemBarangJadi[index].jmlMasukBarangSisa],(err,results) => {
                                        if (err) {
                                            console.log(err)
                                            database.getConnection().query(`ROLLBACK;`)
                                            return reject(err)
                                        }
                                    })
                                }

                                database.getConnection().query(`COMMIT`) 
                                return resolve(results)
                            })
                        })
                    }
                    else if(data.jenisItem == 'barang sisa'){
                        data.itemBarangSisa.forEach((item,index) => { 
                            database.getConnection().query(`
                            INSERT INTO detil_invoice (id_item_barang_return,id_invoice,id)
                            select id,(select max(id) from invoice where status_aktif = 'Y'),f_gen_id("DI") from barang_sisa where id = ? `,[data.itemBarangSisa[index].id],(err,results) => {
                                if (err) {
                                    console.log(err)
                                    database.getConnection().query(`ROLLBACK;`)
                                    return reject(err)
                                }
                                database.getConnection().query(`COMMIT`) 
                                return resolve(results)
                            })
                        })
                    }
                    else if(data.jenisItem == 'barang return'){
                        data.itemBarangSisa.forEach((item,index) => { 
                            database.getConnection().query(`
                            INSERT INTO detil_invoice (id_item_barang_return,id_invoice,id)
                            select id,(select max(id) from invoice where status_aktif = 'Y'),f_gen_id("DI") from barang_return where id = ? `,[data.itemBarangReturn[index].id],(err,results) => {
                                if (err) {
                                    console.log(err)
                                    database.getConnection().query(`ROLLBACK;`)
                                    return reject(err)
                                }
                                database.getConnection().query(`COMMIT`) 
                                return resolve(results)
                            })
                        })
                    }else{
                        database.getConnection().query(`ROLLBACK;`)
                        return reject(err)
                    }
        })
    })
}

//End of Invoice



module.exports = router