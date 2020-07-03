const modelPengeluaran = require('../models/modelPengeluaran.js');
const { response } = require('express');
const util = require('../configs/utils.js');


async function getPembelianAll() {
    try {
        const rows = await modelPengeluaran.getPembelianAll()

        if ( rows.length >= 1 ) {
            return util.responseSuccess(rows)
        } else if ( rows.length == 0 ) {
            return util.responseNotFound()
        } else {
            return util.responseFailedGet()
        }
        
    } catch(err) {
        console.log(err)
        return util.responseErrorServer(err)
    }
}

async function getPembelianById(id) {
    try {
        const rows = await modelPengeluaran.getPembelianById(id)

        if ( rows.length >= 1 ) {
            return util.responseSuccess(rows)
        } else if ( rows.length == 0 ) {
            return util.responseNotFound()
        } else {
            return util.responseFailedGet()
        }
        
    } catch(err) {
        console.log(err)
        return util.responseErrorServer(err)
    }
}

async function insertPembelian(data) {
    try {
        var typeIsMaterial = '1'
        var typeIsInventory = '2'
        if (data.jenisPembelian == typeIsMaterial){
            return typeMaterial(data)
        } else if(data.jenisPembelian == typeIsInventory){
           return typeInventory(data)
        }               
    } catch(err) {
       return util.responseErrorServer(err)
    }
}

async function updatePembelian(data) {
    try {
        const rows = await modelPengeluaran.updatePembelian(data)
        if (rows.affectedRows >= 1) {
            return util.responseSuccessUpdate()
        } else {
           return util.responseFailedUpdate()
        }               
    } catch(err) {
       return util.responseErrorServer(err)
    }
}

async function deletePembelian(id) {
    try {
        const rows = await modelPengeluaran.deletePembelian(id)
        if (rows.affectedRows >= 1) {
            return util.responseSuccessDelete()
        } else {
           return util.responseFailedDelete()
        }
    } catch(err) {
       return util.responseErrorServer(err)
    }
}


//function
async function typeMaterial(data){
    try{
        if (data.tanggal !== "" && 
            data.jenisPemasukan !== "" && 
            data.supplier !== "" && 
            data.nama !== "" && 
            data.jumlah !== "" && 
            data.statusBayar !== "" &&
            data.hutang !== "" && 
            data.total !== "" && 
            data.ket !== "") {         

            const rows = await modelPengeluaran.insertPembelianTypeMaterial(data)
            if (rows.affectedRows >= 1) {
            return util.responseSuccess(rows)
            } else {
            return util.responseFailedPost()
            }
        } else {
            return util.responseErrorNullParam()
        }
    } catch(err){
        return util.responseErrorQuery()
    }
}

async function typeInventory(data){
    try{
        if (data.tanggal !== "" && 
            data.jenisPemasukan !== "" && 
            data.supplier !== "" && 
            data.nama !== "" && 
            data.jumlah !== "" && 
            data.statusBayar !== "" &&
            data.hutang !== "" && 
            data.total !== "" && 
            data.ket !== "") {         

            const rows = await modelPengeluaran.insertPembelianTypeInventory(data)
            if (rows.affectedRows >= 1) {
            return util.responseSuccess(rows)
            } else {
                return util.responseFailedPost()
            }
        } else {
            return util.responseErrorNullParam()
        }
    } catch(err) {
        return util.responseErrorQuery()
    }
}



module.exports = {
    getPembelianAll,
    getPembelianById,
    insertPembelian,
    deletePembelian,
    updatePembelian
}
