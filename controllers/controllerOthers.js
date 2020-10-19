const modelOthers = require('../models/modelOthers.js');
const util = require('../configs/utils.js');


async function getMaterials() {
    try {
        const rows = await modelOthers.getMaterials()

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

async function getInventorys() {
    try {
        const rows = await modelOthers.getInventorys()

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


async function getAddingPrices() {
    try {
        const rows = await modelOthers.getAddingPrices()

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

async function getBarangReturnAll() {
    try {
        const rows = await modelOthers.getBarangReturnAll()
        console.log(rows)
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

async function getBarangSisaAll() {
    try {
        const rows = await modelOthers.getBarangSisaAll()
        console.log(rows)
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

module.exports = {
    getMaterials,
    getInventorys,
    getAddingPrices,
    getBarangReturnAll,
    getBarangSisaAll
}