const modelClient= require('../models/modelClient.js');
const util = require('../configs/utils.js');


async function getClientById(id) {
    try {
        const rows = await modelClient.getClientById(id)

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

async function insertClient(data) {
    try {
       return processData(data)
    } catch(err) {
       return util.responseErrorServer(err)
    }
}

async function updateClient(data) {
    try {
        const rows = await modelClient.updateClient(data)
        if (rows.affectedRows >= 1) {
            return util.responseSuccessUpdate()
        } else {
           return util.responseFailedUpdate()
        }               
    } catch(err) {
       return util.responseErrorServer(err)
    }
}


async function deletePembayaran(id) {
    try {
        const rows = await modelPengeluaran.deletePembayaran(id)
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
async function processData(data){
    try{
        if (data.nama !== "" && 
            data.alamat !== "" && 
            data.noHp !== "" && 
            data.email !== "") {         

            const rows = await modelClient.insertClient(data)
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
    getClientById,
    insertClient,
    updateClient
}