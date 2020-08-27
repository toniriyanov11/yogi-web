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



//Sablon
async function getSablonAll() {
    try {
        const rows = await modelDataProduksi.getSablonAll()
        

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

async function getSablonById(id) {
    try {
        const rows = await modelDataProduksi.getSablonById(id)

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

async function insertSablon(data) {
    try {
        return proccessInsertSablon(data)             
    } catch(err) {
       return util.responseErrorServer(err)
    }
}

async function updateSablon(data) {
    try {
        const rows = await modelDataProduksi.updateSablon(data)
        if (rows.affectedRows >= 1) {
            return util.responseSuccessUpdate()
        } else {
           return util.responseFailedUpdate()
        }               
    } catch(err) {
       return util.responseErrorServer(err)
    }
}

async function deleteSablon(id) {
    try {
        const rows = await modelDataProduksi.deleteSablon(id)
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
async function proccessInsertSablon(data){
    try{
        console.log(data)
        if (data.tanggal != "" || data.nama != "" || data.item != [] 
        || data.upah != "" || data.totalHarga != "" || data.jumlah != ""
        || data.ket != ""  || data.totalUpah != "" || data.hargaBarang != "" ) {         
            const rows = await modelDataProduksi.insertSablon(data)
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


//End of Sablon



//Jahit
async function getJahitAll() {
    try {
        const rows = await modelDataProduksi.getJahitAll()
        

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

async function getJahitById(id) {
    try {
        const rows = await modelDataProduksi.getJahitById(id)

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

async function insertJahit(data) {
    try {
        console.log(data)
        return proccessInsertJahit(data)             
    } catch(err) {
       return util.responseErrorServer(err)
    }
}

async function updateJahit(data) {
    try {
        const rows = await modelDataProduksi.updateJahit(data)
        if (rows.affectedRows >= 1) {
            return util.responseSuccessUpdate()
        } else {
           return util.responseFailedUpdate()
        }               
    } catch(err) {
       return util.responseErrorServer(err)
    }
}

async function deleteJahit(id) {
    try {
        const rows = await modelDataProduksi.deleteJahit(id)
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
async function proccessInsertJahit(data){
    try{
        if (data.tanggal != "" || data.nama != "" || data.item != [] 
        || data.upah != "" || data.totalHarga != "" || data.jumlah != ""
        || data.ket != ""  || data.totalUpah != "" || data.hargaBarang != "" ) {         
            const rows = await modelDataProduksi.insertJahit(data)
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


//End of Jahit




module.exports = {
    getCuttingAll,
    getCuttingById,
    insertCutting,
    deleteCutting,
    updateCutting,
    getSablonAll,
    getSablonById,
    insertSablon,
    deleteSablon,
    updateSablon,
    getJahitAll,
    getJahitById,
    insertJahit,
    deleteJahit,
    updateJahit,
}
