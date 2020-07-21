const modelDataProduksi = require('../models/modelDataProduksi.js');
const { response } = require('express');
const util = require('../configs/utils.js');

//Cutting
async function getCuttingAll() {
    try {
        const rows = await modelDataProduksi.getCuttingAll()

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

async function getCuttingById(id) {
    try {
        const rows = await modelDataProduksi.getCuttingById(id)

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

async function insertCutting(data) {
    try {
        return proccessInsertCutting(data)             
    } catch(err) {
       return util.responseErrorServer(err)
    }
}

async function updateCutting(data) {
    try {
        const rows = await modelDataProduksi.updateCutting(data)
        if (rows.affectedRows >= 1) {
            return util.responseSuccessUpdate()
        } else {
           return util.responseFailedUpdate()
        }               
    } catch(err) {
       return util.responseErrorServer(err)
    }
}

async function deleteCutting(id) {
    try {
        const rows = await modelDataProduksi.deleteCutting(id)
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
async function proccessInsertCutting(data){
    try{
        if (data.tanggal !== "" & data.nama !== "" & data.jenisProduk !== "" 
        & data.jenisBahan !== "" & data.varianBahan !== "" & data.warnaBahan !== ""
        & data.tipeCutting !== "" & data.berat !== "" & data.jumlah !== "" 
        & data.upah !== "" & data.hargaPerKg !== "" ) {         
            const rows = await modelDataProduksi.insertCutting(data)
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


//End of Cutting





module.exports = {
    getCuttingAll,
    getCuttingById,
    insertCutting,
    deleteCutting,
    updateCutting,
}
