


function responseSuccess(rows){
    var response = {
        ret: "0",
        msg: "Sukses",
        data: rows
    };
    return response;
}

function responseSuccessUpdate(){
    var response = {
        ret: "0",
        msg: "Sukses Perbarui Data"
    };
    return response;
}

function responseSuccessDelete(){
    var response = {
        ret: "0",
        msg: "Sukses Hapus Data"
    };
    return response;
}

function responseFailedGet(){
    var response = {
        ret: "-1",
        msg: "Data Tidak Ditemukan"
    };
    return response;
}

function responseFailedUpdate(){
    var response = {
        ret: "-1",
        msg: "Gagal Update Data"
    };
    return response;
}

function responseFailedPost(){
    var response = {
        ret: "-1",
        msg: "Gagal Tambah Data"
    };
    return response;
}

function responseFailedDelete(){
    var response = {
        ret: "-1",
        msg: "Gagal Hapus Data"
    };
    return response;
}

function responseErrorNullParam(){
    var response = {
        ret: "-1",
        msg: "Semua paramater harus di Isi"
    };
    return response;
}

function responseErrorServer(err){
    var response = {
        ret: "-1",
        msg: "Terjadi Kesalahan Server, silahkan ulang beberapa saat lagi",
        err: err
    };
    return response;
}

function responseErrorQuery(err){
    var response = {
        ret: "-1",
        msg: "Query Tidak Valid",
        err: err
    };
    return response;
}

module.exports = {
    responseSuccess,
    responseSuccessUpdate,
    responseSuccessDelete,
    responseFailedGet,
    responseFailedPost,
    responseFailedUpdate,
    responseFailedDelete,
    responseErrorServer,
    responseErrorNullParam,
    responseErrorQuery
}
