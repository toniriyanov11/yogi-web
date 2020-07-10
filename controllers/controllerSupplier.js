const modelSupplier= require('../models/modelSupplier.js');
const util = require('../configs/utils.js');


async function getSupplierById(id) {
    try {
        const rows = await modelSupplier.getSupplierById(id)

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

async function insertSupplier(data) {
    try {
       return processData(data)
    } catch(err) {
       return util.responseErrorServer(err)
    }
}

async function updateSupplier(data) {
    try {
        const rows = await modelSupplier.updateSupplier(data)
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
async function processData(data){
    try{
        if (data.nama !== "" && 
            data.alamat !== "" && 
            data.noHp !== "" && 
            data.email !== "") {         

            const rows = await modelSupplier.insertSupplier(data)
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
module.exports = {
    getSupplierById,
    insertSupplier,
    updateSupplier
}