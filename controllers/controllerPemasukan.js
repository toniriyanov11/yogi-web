const modelPemasukan = require('../models/modelPemasukan.js');
const { response } = require('express');
const util = require('../configs/utils.js');


async function getPemasukanAll() {
    try {
        const rows = await modelPemasukan.getPemasukanAll()

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

async function getPemasukanById(id) {
    try {
        const rows = await modelPemasukan.getPemasukanById(id)

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

async function insertPemasukan(data) {
    try {
        let typeIsPaymentInvoice = '1'
        let typeIsOthers = '2'
        let typeIsInvoiceCreated = '3'
        if (data.jenisPemasukan == typeIsPaymentInvoice){
            return typeInvoicePayment(data)
        }else if(data.jenisPemasukan == typeIsInvoiceCreated){ 
            return typeInvoiceCreated(data)
        }else{
           return typeOther(data)
        }               
    } catch(err) {
       return util.responseErrorServer(err)
    }
}

async function updatePemasukan(data) {
    try {
        const rows = await modelPemasukan.updatePemasukan(data)
        if (rows.affectedRows >= 1) {
            return util.responseSuccessUpdate()
        } else {
           return util.responseFailedUpdate()
        }               
    } catch(err) {
       return util.responseErrorServer(err)
    }
}

async function deletePemasukan(id) {
    try {
        const rows = await modelPemasukan.deletePemasukan(id)
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
async function typeInvoicePayment(data){
    try{
        if (data.tanggal !== "" && 
            data.jenisPemasukan !== "" && 
            data.client !== "" && 
            data.nama !== "" && 
            data.jumlah !== "" && 
            data.statusBayar !== "" &&
            data.piutang !== "" && 
            data.total !== "" && 
            data.ket !== "") {         

            const rows = await modelPemasukan.insertPemasukanTypeInvoicePayment(data)
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

async function typeInvoiceCreated(data){
    try{
        if (data.tanggal !== "" && 
            data.jenisPemasukan !== "" && 
            data.client !== "" && 
            data.nama !== "" && 
            data.jumlah !== "" && 
            data.statusBayar !== "" &&
            data.piutang !== "" && 
            data.total !== "" && 
            data.ket !== "") {         

            const rows = await modelPemasukan.insertPemasukanTypeInvoiceCreated(data)
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

async function typeOther(data){
    try{
        if (data.tanggal !== "" && 
            data.jenisPemasukan !== "" && 
            data.client !== "" && 
            data.nama !== "" && 
            data.jumlah !== "" && 
            data.statusBayar !== "" &&
            data.piutang !== "" && 
            data.total !== "" && 
            data.ket !== "") {         

            const rows = await modelPemasukan.insertPemasukanOtherType(data)
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
    getPemasukanAll,
    getPemasukanById,
    insertPemasukan,
    deletePemasukan,
    updatePemasukan
}
