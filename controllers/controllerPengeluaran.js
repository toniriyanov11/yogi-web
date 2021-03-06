const modelPengeluaran = require('../models/modelPengeluaran.js');
const { response } = require('express');
const util = require('../configs/utils.js');

//Pembelian
async function getPembelianAll() {
    try {
        const rows = await modelPengeluaran.getPembelianAll()

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

async function getPembelianById(id) {
    try {
        const rows = await modelPengeluaran.getPembelianById(id)

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

async function insertPembelian(data) {
    try {
        var typeIsMaterial = '1'
        var typeIsInventory = '2'
        if (data.jenisPembelian == typeIsMaterial){
            return typeMaterial(data)
        } else if(data.jenisPembelian == typeIsInventory){
           return typeInventory(data)
        }               
    } catch(err) {
       return util.responseErrorServer(err)
    }
}

async function updatePembelian(data) {
    try {
        const rows = await modelPengeluaran.updatePembelian(data)
        if (rows.affectedRows >= 1) {
            return util.responseSuccessUpdate()
        } else {
           return util.responseFailedUpdate()
        }               
    } catch(err) {
       return util.responseErrorServer(err)
    }
}

async function deletePembelian(id) {
    try {
        const rows = await modelPengeluaran.deletePembelian(id)
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
async function typeMaterial(data){
    try{
        if (data.tanggal !== "" && 
            data.jenisPemasukan !== "" && 
            data.supplier !== "" && 
            data.nama !== "" && 
            data.jumlah !== "" && 
            data.statusBayar !== "" &&
            data.hutang !== "" && 
            data.total !== "" && 
            data.ket !== "") {         

            const rows = await modelPengeluaran.insertPembelianTypeMaterial(data)
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

async function typeInventory(data){
    try{
        if (data.tanggal !== "" && 
            data.jenisPemasukan !== "" && 
            data.supplier !== "" && 
            data.nama !== "" && 
            data.jumlah !== "" && 
            data.statusBayar !== "" &&
            data.hutang !== "" && 
            data.total !== "" && 
            data.ket !== "") {         

            const rows = await modelPengeluaran.insertPembelianTypeInventory(data)
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

//End of Pembelian


//Beban
async function getBebanAll() {
    try {
        const rows = await modelPengeluaran.getBebanAll()

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

async function getBebanById(id) {
    try {
        const rows = await modelPengeluaran.getBebanById(id)

        if ( rows.length >= 1 ) {
            return util.responseSuccess(rows)
        } else if ( rows.length == 0 ) {
            return util.responseNotFound()
        } else {
            return util.responseFailedGet()
        }
        
    } catch(err) {
        return util.responseErrorServer(err)
    }
}

async function insertBeban(data) {
    try {
        var typeIsOthers = '3'
        if (data.jenisBeban == typeIsOthers){
            return typeOthers(data)
        }            
    } catch(err) {
       return util.responseErrorServer(err)
    }
}

async function updateBeban(data) {
    try {
        const rows = await modelPengeluaran.updateBeban(data)
        if (rows.affectedRows >= 1) {
            return util.responseSuccessUpdate()
        } else {
           return util.responseFailedUpdate()
        }               
    } catch(err) {
       return util.responseErrorServer(err)
    }
}

async function deleteBeban(id) {
    try {
        const rows = await modelPengeluaran.deleteBeban(id)
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
async function typeOthers(data){
    try{
        if (data.tanggal !== "" && 
            data.jenisBeban !== "" && 
            data.nama !== "" && 
            data.jumlah !== "" && 
            data.statusBayar !== "" &&
            data.hutang !== "" && 
            data.total !== "" && 
            data.ket !== "") {         

            const rows = await modelPengeluaran.insertBebanTypeOthers(data)
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
//End of Beban


//Pembayaran
async function getPembayaranAll() {
    try {
        const rows = await modelPengeluaran.getPembayaranAll()

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

async function getPembayaranById(id) {
    try {
        const rows = await modelPengeluaran.getPembayaranById(id)

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

async function insertPembayaran(data) {
    try {
        var typeIsReturnPayment = '4'
        if (data.jenisPembayaran == typeIsReturnPayment){
            return typeReturnPayment(data)
        }            
    } catch(err) {
       return util.responseErrorServer(err)
    }
}

async function updatePembayaran(data) {
    try {
        const rows = await modelPengeluaran.updatePembayaran(data)
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
async function typeReturnPayment(data){
    try{
        if (data.tanggal !== "" && 
            data.jenisPembayaran !== "" && 
            data.client !== "" &&
            data.nama !== "" && 
            data.jumlah !== "" && 
            data.statusBayar !== "" &&
            data.hutang !== "" && 
            data.total !== "" && 
            data.ket !== "") {         

            const rows = await modelPengeluaran.insertPembayaranTypeReturnPayment(data)
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
//End of Pembayaran



module.exports = {
    getPembelianAll,
    getPembelianById,
    insertPembelian,
    deletePembelian,
    updatePembelian,
    getBebanAll,
    getBebanById,
    deleteBeban,
    insertBeban,
    updateBeban,
    getPembayaranAll,
    getPembayaranById,
    insertPembayaran,
    updatePembayaran,
    deletePembayaran
}
