

var moment = require('moment')

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
    convertRecordDate
}
