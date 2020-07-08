const modelClient= require('../models/modelClient.js');
const modelMaster= require('../models/modelMaster.js');
const util = require('../configs/utils.js');


async function getClientAll() {
    try {
        const rows = await modelClient.getClientAll()

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
module.exports ={
    getClientAll,
    getSupplier,
    getPaymentStatus,
    getInputType,
    getBuyingType,
    getMasterMaterial,
    getLoadType,
    getPaymentType
} 
