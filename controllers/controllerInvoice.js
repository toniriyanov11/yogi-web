const modelInvoice = require('../models/modelInvoice.js');
const { response } = require('express');
const util = require('../configs/utils.js');

//Invoice
async function getInvoiceAll() {
    try {
        console.log('sini')
        const rows = await modelInvoice.getInvoiceAll()

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

async function getInvoiceById(id) {
    try {
        const rows = await modelInvoice.getInvoiceById(id)

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

async function insertInvoice(data) {
    try {
        return proccessInsertInvoice(data)             
    } catch(err) {
       return util.responseErrorServer(err)
    }
}

async function updateInvoice(data) {
    try {
        const rows = await modelDataProduksi.updateInvoice(data)
        if (rows.affectedRows >= 1) {
            return util.responseSuccessUpdate()
        } else {
           return util.responseFailedUpdate()
        }               
    } catch(err) {
       return util.responseErrorServer(err)
    }
}

async function deleteInvoice(id) {
    try {
        const rows = await modelDataProduksi.deleteInvoice(id)
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
async function proccessInsertInvoice(data){
    try{
        if (data.tanggal !== "" & data.nama !== "" & data.jenisProduk !== "" 
        & data.jenisBahan !== "" & data.varianBahan !== "" & data.warnaBahan !== ""
        & data.tipeInvoice !== "" & data.berat !== "" & data.jumlah !== "" 
        & data.upah !== "" & data.hargaPerKg !== "" ) {         
            const rows = await modelDataProduksi.insertInvoice(data)
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


//End of Invoice



module.exports = {
    getInvoiceAll,
    getInvoiceById,
    insertInvoice,
    deleteInvoice,
    updateInvoice
}
