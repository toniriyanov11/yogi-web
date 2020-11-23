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
        console.log('sini brox')
        var typeIsMaterial = '1'
        var typeIsInventory = '2'
        var typeAccessoris = '7'
        if (data.jenisPembelian == typeIsMaterial){
            return typeMaterial(data)
        } else if(data.jenisPembelian == typeIsInventory){
           return typeInventory(data)
        } else {
           return typePembelianOthers(data)
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

async function typePembelianOthers(data){
    try{
        if (data.tanggal !== "" && 
            data.jenisPemasukan !== "" && 
            data.nama !== "" && 
            data.jumlah !== "" && 
            data.statusBayar !== "" &&
            data.hutang !== "" && 
            data.total !== "" && 
            data.ket !== "") {         

            const rows = await modelPengeluaran.insertPembelianTypeOthers(data)
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
            return typeBebanOthers(data)
        } else{
            return util.responseErrorQuery()
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
async function typeBebanOthers(data){
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
        console.log(data.jenisPembayaran)
        if (data.jenisPembayaran == typeIsReturnPayment){
            return typeReturnPayment(data)
        }  else{
            return typePembayaranOthers(data)
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


async function typePembayaranOthers(data){
    try{
        if (data.tanggal !== "" && 
            data.jenisPembayaran !== "" && 
            data.nama !== "" && 
            data.jumlah !== "" && 
            data.statusBayar !== "" &&
            data.hutang !== "" && 
            data.total !== "" && 
            data.ket !== "") {         

            const rows = await modelPengeluaran.insertPembayaranTypeOthers(data)
            if (rows.affectedRows >= 1) {
            return util.responseSuccess(rows)
            } else {
            return util.responseFailedPost()
            }
        } else {
            return util.responseErrorNullParam()
        }
    } catch(err){
        console.log(err)
        return util.responseErrorQuery()
    }
}
//End of Pembayaran



//CSR
async function getCsrAll() {
    try {
        const rows = await modelPengeluaran.getCsrAll()

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

async function getCsrById(id) {
    try {
        const rows = await modelPengeluaran.getCsrById(id)

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

async function insertCsr(data) {
    try {
        var typeIsCsr = '8'
        if (data.jenisCsr == typeIsCsr){
            return typeCsr(data)  
        } else{
            return util.responseErrorQuery()
        }       
    } catch(err) {
       return util.responseErrorServer(err)
    }
}

async function updateCsr(data) {
    try {
        const rows = await modelPengeluaran.updateCsr(data)
        if (rows.affectedRows >= 1) {
            return util.responseSuccessUpdate()
        } else {
           return util.responseFailedUpdate()
        }               
    } catch(err) {
       return util.responseErrorServer(err)
    }
}


async function deleteCsr(id) {
    try {
        const rows = await modelPengeluaran.deleteCsr(id)
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
async function typeCsr(data){
    console.log("function type csr")
    try{
        if (data.tanggal !== "" && 
            data.jenisCsr !== "" && 
            data.nama !== "" && 
            data.jumlah !== "" && 
            data.statusBayar !== "" &&
            data.hutang !== "" && 
            data.total !== "" && 
            data.ket !== "") {         
            
            const rows = await modelPengeluaran.insertCsr(data)
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
    deletePembayaran,
    getCsrAll,
    getCsrById,
    insertCsr,
    updateCsr,
    deleteCsr
}
