const modelClient= require('../models/modelClient.js');
const modelMaster= require('../models/modelMaster.js');
const util = require('../configs/utils.js');


async function getClient() {
    try {
        const rows = await modelMaster.getClient()

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

async function getSupplier() {
    try {
        const rows = await modelMaster.getSupplier()

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


async function getPaymentStatus() {
    try {
        const rows = await modelMaster.getPaymentStatus()

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


async function getInputType() {
    try {
        const rows = await modelMaster.getInputType()

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


async function getBuyingType() {
    try {
        const rows = await modelMaster.getBuyingType()

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

async function getMasterMaterial() {
    try {
        const rows = await modelMaster.getMasterMaterial()

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

async function getLoadType() {
    try {
        const rows = await modelMaster.getLoadType()

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

async function getPaymentType() {
    try {
        const rows = await modelMaster.getPaymentType()

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

async function getStuffType() {
    try {
        const rows = await modelMaster.getStuffType()

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

async function getStuffVariant() {
    try {
        const rows = await modelMaster.getStuffVariant()

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

async function getStuffColor() {
    try {
        const rows = await modelMaster.getStuffColor()

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


async function getCuttingType() {
    try {
        const rows = await modelMaster.getCuttingType()

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

async function getSubCuttingType() {
    try {
        const rows = await modelMaster.getSubCuttingType()

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

async function getStuffStock() {
    try {
        const rows = await modelMaster.getStuffStock()

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

//master warna
async function insertMasterWarna(data) {
    try {
        return proccessInsertMasterWarna(data)             
    } catch(err) {
       return util.responseErrorServer(err)
    }
}

async function updateMasterWarna(data) {
    try {
        const rows = await modelMaster.updateMasterWarna(data)
        if (rows.affectedRows >= 1) {
            return util.responseSuccessUpdate()
        } else {
           return util.responseFailedUpdate()
        }               
    } catch(err) {
       return util.responseErrorServer(err)
    }
}

//function insert warna
async function proccessInsertMasterWarna(data){
    try{
        if (data.nama != "" ) {         
            const rows = await modelMaster.insertMasterWarna(data)
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

//master jenis bahan
async function insertMasterJenisBahan(data) {
    try {
        return proccessInsertMasterJenisBahan(data)             
    } catch(err) {
       return util.responseErrorServer(err)
    }
}

async function updateMasterJenisBahan(data) {
    try {
        const rows = await modelMaster.updateMasterJenisBahan(data)
        if (rows.affectedRows >= 1) {
            return util.responseSuccessUpdate()
        } else {
           return util.responseFailedUpdate()
        }               
    } catch(err) {
       return util.responseErrorServer(err)
    }
}

//function
async function proccessInsertMasterJenisBahan(data){
    try{
        if (data.nama != "" ) {         
            const rows = await modelMaster.insertMasterJenisBahan(data)
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



module.exports ={
    getClient,
    getSupplier,
    getPaymentStatus,
    getInputType,
    getBuyingType,
    getMasterMaterial,
    getLoadType,
    getPaymentType,
    getStuffType,
    getStuffVariant,
    getStuffColor,
    getCuttingType,
    getSubCuttingType,
    getStuffStock,
    insertMasterWarna,
    updateMasterWarna,
    insertMasterJenisBahan,
    updateMasterJenisBahan
} 
