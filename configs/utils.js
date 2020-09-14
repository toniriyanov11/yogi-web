

var moment = require('moment')
var _ = require('lodash');
// const { delete } = require('./database');

function responseSuccess(rows){
    var response = {
            success: true,
            msg: "Sukses",
            data: rows
        };
    return response;
}

function responseSuccessUpdate(){
    var response = {
        success: true,
        msg: "Sukses Perbarui Data"
    };
    return response;
}

function responseSuccessDelete(){
    var response = {
        success: true,
        msg: "Sukses Hapus Data"
    };
    return response;
}

function responseNotFound(){
    var response = {
        success: true,
        msg: "Data Tidak Ditemukan"
    };
    return response;
}

function responseFailedGet(){
    var response = {
        success: false,
        msg: "Gagal Mendapatkan Data"
    };
    return response;
}

function responseFailedUpdate(){
    var response = {
        success: false,
        msg: "Gagal Update Data"
    };
    return response;
}

function responseFailedPost(){
    var response = {
        success: false,
        msg: "Gagal Tambah Data"
    };
    return response;
}

function responseFailedDelete(){
    var response = {
        success: false,
        msg: "Gagal Hapus Data"
    };
    return response;
}

function responseErrorNullParam(){
    var response = {
        success: false,
        msg: "Semua paramater harus di Isi"
    };
    return response;
}

function responseErrorServer(err){
    var response = {
        success: false,
        msg: "Terjadi Kesalahan Server, silahkan ulang beberapa saat lagi",
        err: err
    };
    return response;
}

function responseErrorQuery(err){
    var response = {
        success: false,
        msg: "Query Tidak Valid",
        err: err
    };
    return response;
}

function convertDate(dataResponse, format){
    try{
      var data = ""
      if(dataResponse.data != null) {
         for(let i=0; i<=dataResponse.data.length-1; i++){
            dataResponse.data[i].tanggal = moment(dataResponse.data[i].tanggal).format(format)
         }
         data = dataResponse.data
      } 
      return data
    }catch(err){
      return err
    }
}


function convertRecordDate(dataResponse, format){
    try{
      var data = ""
      if(dataResponse.data != null) {
         for(let i=0; i<=dataResponse.data.length-1; i++){
            dataResponse.data[i].tgl_rekam = moment(dataResponse.data[i].tgl_rekam).format(format)
         }
         data = dataResponse.data
      } 
      return data
    }catch(err){
      return err
    }
}


async function convertObjectStructure(dataResponse,dateFormat){
    try{
        var data = await this.convertDate(dataResponse, dateFormat)
        const value = data

        var dataDetail = _.cloneDeep(value);
        dataDetail.forEach(function(v){ delete v.tanggal, delete v.upah, delete v.nama, delete v.ket });
        
       
        var data = []
        //filter id
        var tampung = ''
        for(i=0; i < value.length; i++){
                if(value[i].id === tampung){
                    tampung  = value[i].id
                }else{
                    tampung  = value[i].id
                    data.push({
                        id : value[i].id,
                        tanggal : value[i].tanggal,
                        nama: value[i].nama,
                        upah : value[i].upah,
                        ket : value[i].ket,
                        detil : []
                    })
                }
        }

        //filter item by id
        var tampungId = ''
        var jumlah = 0
        var biaya = 0
        var harga = 0
        for(i=0; i < data.length; i++){
            jumlah = 0
            biaya = 0
            harga = 0
            tampungId = data[i].id
            for(j=0; j < dataDetail.length; j++){
                if(dataDetail[j].id === tampungId){
                    data[i].detil.push(dataDetail[j])
                    jumlah += parseInt(dataDetail[j].jumlahItem)
                    biaya += parseInt(dataDetail[j].totalBiayaItemPerPcs)
                    harga += parseInt(dataDetail[j].totalBiayaItemPerPcs) + parseInt(data[i].upah)  
                    data[i].totalJumlah = jumlah
                    data[i].totalBiaya = biaya / data[i].detil.length
                    data[i].hargaBarang = harga / data[i].detil.length
                }else{
                    tampungId = data[i].id
                }
          
            }
        }

      return data
    }catch(err){
      return err
    }
}

async function convertObjectStructureJahit(dataResponse,dateFormat){
    try{
        var data = await this.convertDate(dataResponse, dateFormat)
        const value = data

        var dataDetail = _.cloneDeep(value);
        dataDetail.forEach(function(v){ delete v.tanggal, delete v.upah, delete v.nama, delete v.ket });
        
       
        var data = []
        //filter id
        var tampung = ''
        for(i=0; i < value.length; i++){
                if(value[i].id === tampung){
                    tampung  = value[i].id
                }else{
                    tampung  = value[i].id

                    if(value[i].idItemCutting != null){
                        data.push({
                            id : value[i].id,
                            tanggal : value[i].tanggal,
                            nama: value[i].nama,
                            upah : value[i].upah,
                            ket : value[i].ket,
                            jenisItem: '1',
                            detil : []
                        })
                    }else if(value[i].idItemSablon != null){
                        data.push({
                            id : value[i].id,
                            tanggal : value[i].tanggal,
                            nama: value[i].nama,
                            upah : value[i].upah,
                            ket : value[i].ket,
                            jenisItem : '2',
                            detil : []
                        })
                    }
                }
        }

        //filter detil item by id
        var tampungId = ''
        var jumlah = 0
        var biaya = 0
        for(i=0; i < data.length; i++){
            jumlah = 0
            biaya = 0
            tampungId = data[i].id
            for(j=0; j < dataDetail.length; j++){
                if(dataDetail[j].id === tampungId){
                    data[i].detil.push(dataDetail[j])
                    if(dataDetail[j].jumlahItemCutting != null) {
                        jumlah += parseInt(dataDetail[j].jumlahItemCutting)
                        biaya += parseInt(dataDetail[j].totalBiayaItemCuttingPerPcs)
                    } else if(dataDetail[j].jumlahItemSablon != null){
                        jumlah += parseInt(dataDetail[j].jumlahItemSablon)
                        biaya += parseInt(dataDetail[j].totalBiayaItemSablonPerPcs)
                    }
                }else{
                    tampungId = data[i].id
                }
          
            }
            data[i].totalJumlah = jumlah
            data[i].totalBiaya = biaya / data[i].detil.length
        }

        //restructure detil item property
        for(i=0; i < data.length; i++){
            for(j=0; j < data[i].detil.length; j++){
                if(data[i].detil[j].jumlahItemCutting != null) {
                    data[i].detil[j].idItem = data[i].detil[j].idItemCutting
                    data[i].detil[j].jumlahItem =  data[i].detil[j].jumlahItemCutting 
                    data[i].detil[j].namaItem =  data[i].detil[j].namaItemCutting 
                    data[i].detil[j].totalBiayaItemPerPcs =  data[i].detil[j].totalBiayaItemCuttingPerPcs 
                    data[i].detil[j].upahItem =  data[i].detil[j].upahItemCutting 

                    
                    delete data[i].detil[j].idItemCutting
                    delete data[i].detil[j].idItemSablon
                    delete data[i].detil[j].jumlahItemCutting
                    delete data[i].detil[j].jumlahItemSablon
                    delete data[i].detil[j].namaItemCutting
                    delete data[i].detil[j].namaItemSablon
                    delete data[i].detil[j].totalBiayaItemCuttingPerPcs
                    delete data[i].detil[j].totalBiayaItemSablonPerPcs
                    delete data[i].detil[j].upahItemCutting
                    delete data[i].detil[j].upahItemSablon
                    
                } else if(data[i].detil[j].jumlahItemSablon != null){
                    data[i].detil[j].idItem = data[i].detil[j].idItemSablon
                    data[i].detil[j].jumlahItem =  data[i].detil[j].jumlahItemSablon 
                    data[i].detil[j].namaItem =  data[i].detil[j].namaItemSablon 
                    data[i].detil[j].totalBiayaItemPerPcs =  data[i].detil[j].totalBiayaItemSablonPerPcs 
                    data[i].detil[j].upahItem =  data[i].detil[j].upahItemSablon 
                    
                    
                    delete data[i].detil[j].idItemCutting
                    delete data[i].detil[j].idItemSablon
                    delete data[i].detil[j].jumlahItemCutting
                    delete data[i].detil[j].jumlahItemSablon
                    delete data[i].detil[j].namaItemCutting
                    delete data[i].detil[j].namaItemSablon
                    delete data[i].detil[j].totalBiayaItemCuttingPerPcs
                    delete data[i].detil[j].totalBiayaItemSablonPerPcs
                    delete data[i].detil[j].upahItemCutting
                    delete data[i].detil[j].upahItemSablon
                }
            }
        }

      
      return data
    }catch(err){
      return err
    }
}

async function convertObjectStructureBarangJadi(dataResponse,dateFormat){
    try{
        var data = await this.convertDate(dataResponse, dateFormat)
        const value = data

        var dataDetail = _.cloneDeep(value);
        dataDetail.forEach(function(v){ delete v.tanggal, delete v.upah, delete v.nama, delete v.ket });
        
       
        var data = []
        //filter id
        var tampung = ''
        for(i=0; i < value.length; i++){
                if(value[i].id === tampung){
                    tampung  = value[i].id
                }else{
                    tampung  = value[i].id
                    data.push({
                        id : value[i].id,
                        tanggal : value[i].tanggal,
                        nama: value[i].nama,
                        upah : value[i].upah,
                        ket : value[i].ket,
                        hargaBarang: value[i].hargaBarang,
                        detil : [],
                        tambahanBiaya: [],
                    })
                }
        }

        //filter item by id
        var tampungId = ''
        var jumlah = 0
        var biaya = 0
        var harga = 0
        for(i=0; i < data.length; i++){
            jumlah = 0
            biaya = 0
            harga = 0
            tampungId = data[i].id
            for(j=0; j < dataDetail.length; j++){
                if(dataDetail[j].id === tampungId){
                    data[i].detil.push(dataDetail[j])
                    if(dataDetail[j].jumlahItemCutting != null) {
                        jumlah += parseInt(dataDetail[j].jumlahItemCutting)
                        biaya += parseInt(dataDetail[j].totalBiayaItemCuttingPerPcs)
                    } else if(dataDetail[j].jumlahItemSablon != null){
                        jumlah += parseInt(dataDetail[j].jumlahItemSablon)
                        biaya += parseInt(dataDetail[j].totalBiayaItemSablonPerPcs)
                    }
                }else{
                    tampungId = data[i].id
                }
          
            }
            data[i].totalJumlah = jumlah
            data[i].totalBiaya = biaya / data[i].detil.length
        }


        //adding price
        for(i=0; i < data.length; i++){
            data[i].tambahanBiaya.push({nominal:value[i].tieDye, ket:'Tie Dye'})
            data[i].tambahanBiaya.push({nominal: value[i].label, ket: 'Label'})
            data[i].tambahanBiaya.push({nominal: value[i].handTag, ket:'Hand Tag'})
            data[i].tambahanBiaya.push({nominal: value[i].packing, ket: 'Packing'})
            data[i].tambahanBiaya.push({nominal: value[i].dll, ket:'Dll'})

            data[i].totalTambahanBiaya = parseInt(value[i].tieDye) + parseInt(value[i].label) + parseInt(value[i].handTag) + parseInt(value[i].packing) + parseInt(value[i].dll)
         }

        //restructure detil item property
        for(i=0; i < data.length; i++){
            for(j=0; j < data[i].detil.length; j++){
                if(data[i].detil[j].jumlahItemCutting != null) {
                    data[i].detil[j].jumlahItem =  data[i].detil[j].jumlahItemCutting 
                    data[i].detil[j].totalBiayaItemPerPcs =  data[i].detil[j].totalBiayaItemCuttingPerPcs 
                    
                    delete data[i].detil[j].jumlahItemCutting
                    delete data[i].detil[j].jumlahItemSablon
                    delete data[i].detil[j].totalBiayaItemCuttingPerPcs
                    delete data[i].detil[j].totalBiayaItemSablonPerPcs
                    
                } else if(data[i].detil[j].jumlahItemSablon != null){
                    data[i].detil[j].jumlahItem =  data[i].detil[j].jumlahItemSablon 
                    data[i].detil[j].totalBiayaItemPerPcs =  data[i].detil[j].totalBiayaItemSablonPerPcs 
                    
                    delete data[i].detil[j].jumlahItemCutting
                    delete data[i].detil[j].jumlahItemSablon
                    delete data[i].detil[j].totalBiayaItemCuttingPerPcs
                    delete data[i].detil[j].totalBiayaItemSablonPerPcs
                }
            }
        }

      return data
    }catch(err){
      return err
    }
}

async function convertObjectStructureInvoice(dataResponse,dateFormat){
    try{
        var data = await this.convertDate(dataResponse, dateFormat)
        const value = data

        var dataDetail = _.cloneDeep(value);
        dataDetail.forEach(function(v){ delete v.tanggal, delete v.upah, delete v.nama, delete v.ket });
        
       
        var data = []
        //filter id
        var tampung = ''
        for(i=0; i < value.length; i++){
                if(value[i].id === tampung){
                    tampung  = value[i].id
                }else{
                    tampung  = value[i].id
                    data.push({
                        id : value[i].id,
                        tanggal : value[i].tanggal,
                        kodeClient : value[i].kodeClient,
                        namaClient : value[i].namaClient,
                        ket : value[i].ket,
                        detil : []
                    })
                }
        }

        //filter item by id
        // var tampungId = ''
        // var jumlah = 0
        // var biaya = 0
        // var harga = 0
        // for(i=0; i < data.length; i++){
        //     jumlah = 0
        //     biaya = 0
        //     harga = 0
        //     tampungId = data[i].id
        //     for(j=0; j < dataDetail.length; j++){
        //         if(dataDetail[j].id === tampungId){
        //             data[i].detil.push(dataDetail[j])
        //             jumlah += parseInt(dataDetail[j].jumlahItem)
        //             biaya += parseInt(dataDetail[j].totalBiayaItemPerPcs)
        //             harga += parseInt(dataDetail[j].totalBiayaItemPerPcs) + parseInt(data[i].upah)  
        //             data[i].totalJumlah = jumlah
        //             data[i].totalBiaya = biaya / data[i].detil.length
        //             data[i].hargaBarang = harga / data[i].detil.length
        //         }else{
        //             tampungId = data[i].id
        //         }
          
        //     }
        // }

      return data
    }catch(err){
      return err
    }
}





async function manipulateData(data){
try{

    if(data.item) {
        if(Array.isArray(data.item)){
            var arr = []
            for(i=0; i < data.item.length; i++){
                arr.push(data.item[i].id)
            }
            delete data.item
            data.item = arr.join()

            return data
        } else if(!Array.isArray(data.item)){
            console.log("object sini")
            data.item = data.item.id

            return data
        }   
        
      
    } else {
        if(data.itemCutting.length != 0) {
            var arr = []
            for(i=0; i < data.itemCutting.length; i++){
                arr.push(data.itemCutting[i].id)
            }
            delete data.item
            data.item = arr.join()
            data.jenisItem = "cutting"

            return data 
        }else if(data.itemSablon.length != 0) {
            var arr = []
            for(i=0; i < data.itemSablon.length; i++){
                arr.push(data.itemSablon[i].id)
            }
            delete data.item
            data.item = arr.join()
            data.jenisItem = "sablon"

            return data 
        }
    }
}catch(err){
  return err
}
 
}

module.exports = {
    responseSuccess,
    responseSuccessUpdate,
    responseSuccessDelete,
    responseNotFound,
    responseFailedGet,
    responseFailedPost,
    responseFailedUpdate,
    responseFailedDelete,
    responseErrorServer,
    responseErrorNullParam,
    responseErrorQuery,
    convertDate,
    convertRecordDate,
    convertObjectStructure,
    manipulateData,
    convertObjectStructureJahit,
    convertObjectStructureBarangJadi,
    convertObjectStructureInvoice

}
