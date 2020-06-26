const modelPemasukan = require('../models/modelPemasukan.js');
const { response } = require('express');
const util = require('../configs/utils.js');


async function getPemasukanAll() {
    try {
        const rows = await modelPemasukan.getPemasukanAll()

        if ( rows.length >= 1 ) {
            var response = { ret: '0', msg: 'success', data:rows };
        } else if ( rows.length == 0 ) {
            var response = { ret: '-1', msg: 'data not found' };
        } else {
            var response = { ret: '-1', msg: 'paramter is required' };
        }
  
        return response

        
    } catch(err) {

        console.log(err)
        var response = { ret: '-1', msg: 'server error, please try again!', err:err }

        return response

    }
}

async function getPemasukanById(id) {
    try {
        console.log(id)
        let rows = []
        rows = await modelPemasukan.getPemasukanById(id)

        if ( rows.length >= 1 ) {
            var response = { ret: '0', msg: 'success', data:rows };
        } else if ( rows.length == 0 ) {
            var response = { ret: '-1', msg: 'data not found' };
        } else {
            var response = { ret: '-1', msg: 'paramter is required' };
        }
  
        return response

        
    } catch(err) {

        console.log(err)
        var response = { ret: '-1', msg: 'server error, please try again!', err:err }

        return response

    }
}

async function insertPemasukan(data) {
    try {
        var typeIsPaymentInvoice = '1'
        if (data.jenisPemasukan == typeIsPaymentInvoice){
            return typeInvoicePayment(data)
        } else{
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
