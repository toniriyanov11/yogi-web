

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

async function convertObjectStructureCutting(dataResponse,dateFormat){
    try{
        var data = await this.convertDate(dataResponse, dateFormat)
        data.forEach((item)=>{
            item.hasilPerPcs = (item.hasilPerPcs).toFixed(2)
            item.totalHargaBahan = Math.round(item.totalHargaBahan)
            item.totalBiayaPerPcs = Math.round(item.totalBiayaPerPcs)
        })

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
                        hargaPokok: value[i].hargaPokok,
                        detil : [],
                        tambahanBiayaProduksi: [],
                        tambahanBiayaAksesoris: [],
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
            data[i].tambahanBiayaProduksi.push({nominal:value[i].tieDye, ket:'Tie Dye'})
            data[i].tambahanBiayaProduksi.push({nominal: value[i].packing, ket: 'Packing'})
            data[i].tambahanBiayaProduksi.push({nominal: value[i].dllProduksi, ket:'Dll'})
            data[i].tambahanBiayaAksesoris.push({nominal: value[i].label, ket: 'Label'})
            data[i].tambahanBiayaAksesoris.push({nominal: value[i].handTag, ket:'Hand Tag'})
            data[i].tambahanBiayaAksesoris.push({nominal: value[i].dllAksesoris, ket:'Dll'})

            const tieDye = parseInt(value[i].tieDye) ? parseInt(value[i].tieDye) : 0
            const packing = parseInt(value[i].packing) ? parseInt(value[i].packing) : 0
            const dllProduksi = parseInt(value[i].dllProduksi) ? parseInt(value[i].dllProduksi) : 0
            const label = parseInt(value[i].label) ? parseInt(value[i].label) : 0
            const handTag = parseInt(value[i].handTag) ? parseInt(value[i].handTag) : 0
            const dllAksesoris = parseInt(value[i].dllAksesoris) ? parseInt(value[i].dllAksesoris) : 0

            data[i].totalTambahanBiaya =  tieDye + packing + dllProduksi +  label + handTag + dllAksesoris
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
                        grandTotal: value[i].grandTotal,
                        ket : value[i].ket,
                        detil : []
                    })
                }
        }
        
        // filter item by id
        var tampungId = ''
        for(i=0; i < data.length; i++){
            tampungId = data[i].id
            for(j=0; j < dataDetail.length; j++){
                if(dataDetail[j].id === tampungId){
                    data[i].detil.push(dataDetail[j])
                }else{
                    tampungId = data[i].id
                }
          
            }
        }

         //restructure detil item property
         for(i=0; i < data.length; i++){
            for(j=0; j < data[i].detil.length; j++){
                if(data[i].detil[j].idItemBarangJadi != null) {
                    data[i].detil[j].idItem = data[i].detil[j].idItemBarangJadi
                    data[i].detil[j].banyakItem = data[i].detil[j].jumlahItemBarangJadi - data[i].detil[j].jumlahItemMasukBarangReturn - data[i].detil[j].jumlahItemMasukBarangSisa 
                    data[i].detil[j].hargaItem =  data[i].detil[j].hargaItemBarangJadi
                    data[i].detil[j].hargaPokokItem =  data[i].detil[j].hargaPokokItemBarangJadi
                    data[i].detil[j].totalItem = parseInt(data[i].detil[j].banyakItem) * parseInt(data[i].detil[j].hargaItem)
                    
                } else if(data[i].detil[j].idItemBarangReturn != null){
                    data[i].detil[j].idItem = data[i].detil[j].idItemBarangReturn
                    data[i].detil[j].banyakItem = data[i].detil[j].jumlahItemBarangReturn
                    data[i].detil[j].hargaItem =  data[i].detil[j].hargaItemBarangReturn
                    data[i].detil[j].totalItem = parseInt(data[i].detil[j].banyakItem) * parseInt(data[i].detil[j].hargaItem)

                } else if(data[i].detil[j].idItemBarangSisa != null){
                    data[i].detil[j].idItem = data[i].detil[j].idItemBarangSisa
                    data[i].detil[j].banyakItem = data[i].detil[j].jumlahItemBarangSisa 
                    data[i].detil[j].hargaItem =  data[i].detil[j].hargaItemBarangSisa
                    data[i].detil[j].totalItem = parseInt(data[i].detil[j].banyakItem) * parseInt(data[i].detil[j].hargaItem)
    
                }

                delete data[i].detil[j].id
                delete data[i].detil[j].idItemBarangJadi
                delete data[i].detil[j].idItemBarangReturn
                delete data[i].detil[j].idItemBarangSisa
                delete data[i].detil[j].jumlahItemBarangJadi
                delete data[i].detil[j].jumlahItemBarangReturn
                delete data[i].detil[j].jumlahItemBarangSisa
                delete data[i].detil[j].hargaPokokItemBarangJadi
                delete data[i].detil[j].hargaItemBarangJadi
                delete data[i].detil[j].hargaItemBarangReturn
                delete data[i].detil[j].hargaItemBarangSisa
                delete data[i].detil[j].grandTotal
                delete data[i].detil[j].kodeClient
                delete data[i].detil[j].namaClient

            }
        }


      return data
    }catch(err){
      return err
    }
}

async function convertObjectStructureLabaRugi(dataResponse,dateFormat){
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
                        grandTotal: value[i].grandTotal,
                        grandTotalPokok: 0,
                        ket : value[i].ket,
                        selisihHarga: 0,
                        detil : []
                    })
                }
        }
        
        // filter item by id
        var tampungId = ''
        for(i=0; i < data.length; i++){
            tampungId = data[i].id
            for(j=0; j < dataDetail.length; j++){
                if(dataDetail[j].id === tampungId){
                    data[i].detil.push(dataDetail[j])
                }else{
                    tampungId = data[i].id
                }
          
            }
        }

         //restructure detil item property
         for(i=0; i < data.length; i++){
            for(j=0; j < data[i].detil.length; j++){
                if(data[i].detil[j].idItemBarangJadi != null) {
                    data[i].detil[j].idItem = data[i].detil[j].idItemBarangJadi
                    data[i].detil[j].banyakItem = data[i].detil[j].jumlahItemBarangJadi - data[i].detil[j].jumlahItemMasukBarangReturn - data[i].detil[j].jumlahItemMasukBarangSisa 
                    data[i].detil[j].hargaItem =  data[i].detil[j].hargaItemBarangJadi
                    data[i].detil[j].totalItem = parseInt(data[i].detil[j].banyakItem) * parseInt(data[i].detil[j].hargaItem)
                    data[i].detil[j].hargaPokokItem =  data[i].detil[j].hargaPokokItemBarangJadi
                    data[i].detil[j].totalHargaPokokItem = parseInt(data[i].detil[j].banyakItem) * parseInt(data[i].detil[j].hargaPokokItem)
                    data[i].detil[j].selisihHarga = (parseInt(data[i].detil[j].banyakItem) * parseInt(data[i].detil[j].hargaItem)) - (parseInt(data[i].detil[j].banyakItem) * parseInt(data[i].detil[j].hargaPokokItem))
                    
                } else if(data[i].detil[j].idItemBarangReturn != null){
                    data[i].detil[j].idItem = data[i].detil[j].idItemBarangReturn
                    data[i].detil[j].banyakItem = data[i].detil[j].jumlahItemBarangReturn
                    data[i].detil[j].hargaItem =  data[i].detil[j].hargaItemBarangReturn
                    data[i].detil[j].totalItem = parseInt(data[i].detil[j].banyakItem) * parseInt(data[i].detil[j].hargaItem)
                    data[i].detil[j].hargaPokokItem =  data[i].detil[j].hargaPokokItemBarangReturn
                    data[i].detil[j].totalHargaPokokItem = parseInt(data[i].detil[j].banyakItem) * parseInt(data[i].detil[j].hargaPokokItem)
                    data[i].detil[j].selisihHarga = (parseInt(data[i].detil[j].banyakItem) * parseInt(data[i].detil[j].hargaItem)) - (parseInt(data[i].detil[j].banyakItem) * parseInt(data[i].detil[j].hargaPokokItem))

                } else if(data[i].detil[j].idItemBarangSisa != null){
                    data[i].detil[j].idItem = data[i].detil[j].idItemBarangSisa
                    data[i].detil[j].banyakItem = data[i].detil[j].jumlahItemBarangSisa 
                    data[i].detil[j].hargaItem =  data[i].detil[j].hargaItemBarangSisa
                    data[i].detil[j].hargaPokokItem =  data[i].detil[j].hargaPokokItemBarangSisa
                    data[i].detil[j].totalHargaPokokItem = parseInt(data[i].detil[j].banyakItem) * parseInt(data[i].detil[j].hargaPokokItem)
                    data[i].detil[j].totalItem = parseInt(data[i].detil[j].banyakItem) * parseInt(data[i].detil[j].hargaItem)
                    data[i].detil[j].selisihHarga =  (parseInt(data[i].detil[j].banyakItem) * parseInt(data[i].detil[j].hargaItem)) - (parseInt(data[i].detil[j].banyakItem) * parseInt(data[i].detil[j].hargaPokokItem))
                }

                delete data[i].detil[j].id
                delete data[i].detil[j].idItemBarangJadi
                delete data[i].detil[j].idItemBarangReturn
                delete data[i].detil[j].idItemBarangSisa
                delete data[i].detil[j].jumlahItemBarangJadi
                delete data[i].detil[j].jumlahItemBarangReturn
                delete data[i].detil[j].jumlahItemBarangSisa
                delete data[i].detil[j].hargaItemBarangJadi
                delete data[i].detil[j].hargaPokokItemBarangJadi
                delete data[i].detil[j].hargaPokokItemBarangReturn
                delete data[i].detil[j].hargaPokokItemBarangSisa
                delete data[i].detil[j].hargaItemBarangReturn
                delete data[i].detil[j].hargaItemBarangSisa
                delete data[i].detil[j].grandTotal
                delete data[i].detil[j].kodeClient
                delete data[i].detil[j].namaClient

            }
        }

     //set selisihhargatotal
     data.forEach((item)=>{
        item.detil.forEach((itemDetail)=>{
            item.selisihHarga += parseInt(itemDetail.selisihHarga)
            item.grandTotalPokok += parseInt(itemDetail.totalHargaPokokItem) 
        })
     })
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

async function manipulateDataInvoice(data){
    try{
        if(data.itemBarangJadi.length != 0) {
            var arr = []
            for(i=0; i < data.itemBarangJadi.length; i++){
                arr.push(data.itemBarangJadi[i].id)                                                                                                                                            
            }
            delete data.item
            data.item = arr.join()
            data.jenisItem = "barang jadi"

            return data 
        }else if(data.itemBarangReturn.length != 0) {
            var arr = []
            for(i=0; i < data.itemBarangReturn.length; i++){
                arr.push(data.itemBarangReturn[i].id)
            }
            delete data.item
            data.item = arr.join()
            data.jenisItem = "barang return"

            return data 
        }else if(data.itemBarangSisa.length != 0) {
            var arr = []
            for(i=0; i < data.itemBarangSisa.length; i++){
                arr.push(data.itemBarangSisa[i].id)
            }
            delete data.item
            data.item = arr.join()
            data.jenisItem = "barang sisa"

            return data 
        }
    }catch(err){
      return err
    }
     
}

async function convertObjectStructureDebitKredit(dataResponse,dateFormat){
    try{
        var dataTemp = await this.convertDate(dataResponse, dateFormat)
        let dataModified = []
      
        //set saldo/balance
        let arraySaldo = dataTemp.map(( s => a => {
                if(a.keterangan=="kredit") {
                    return s += parseInt(a.nominal)
                }else{
                    return s -= parseInt(a.nominal)
                }
        })(0))
      

        let arrayObjSaldo = arraySaldo.map((item,index) =>{return {saldo : parseInt(item) } })


        dataTemp.forEach((item,index) =>{
            dataModified.push({
                tanggal : item.tanggal,
                id : item.id,
                nama: item.nama,
                nominal : item.nominal,
                keterangan : item.keterangan,
                saldo : arrayObjSaldo[index].saldo
            })
        })
        
        let totalBalanceTemp = arraySaldo.reduce((currentTotal, item)=> parseInt(currentTotal) + parseInt(item))
    
        let totalDebitTemp = dataTemp.filter((item)=> item.keterangan == 'debit')
            .reduce((currentTotal,item)=>{
            return parseInt(item.nominal) + currentTotal
        },0)
        let totalKreditTemp = dataTemp.filter((item)=> item.keterangan == 'kredit')
            .reduce((currentTotal,item)=>{
        return parseInt(item.nominal) + currentTotal
        },0)
        let data = []
        data.push({
            data:dataModified,
            totalDebit:totalDebitTemp,
            totalKredit:totalKreditTemp,
            totalBalance:arrayObjSaldo[arrayObjSaldo.length-1].saldo
        })

      return data
    }catch(err){
      return err
    }
}

async function convertObjectStructureUtangPiutang(dataResponse,dateFormat){
    try{
        var dataTemp = await this.convertDate(dataResponse, dateFormat)
        let dataModified = []


        dataTemp.forEach((item,index) =>{
            dataModified.push({
                tanggal : item.tanggal,
                id : item.id,
                nama: item.nama,
                nominal : item.nominal,
                keterangan : item.keterangan
            })
        })
        
    
        let totalUtangTemp = dataTemp.filter((item)=> item.keterangan == 'utang')
            .reduce((currentTotal,item)=>{
            return parseInt(item.nominal) + currentTotal
        },0)
        let totalPiutangTemp = dataTemp.filter((item)=> item.keterangan == 'piutang')
            .reduce((currentTotal,item)=>{
        return parseInt(item.nominal) + currentTotal
        },0)
        let data = []
        data.push({
            data:dataModified,
            totalUtang:totalUtangTemp,
            totalPiutang:totalPiutangTemp
        })

      return data
    }catch(err){
      return err
    }
}

async function convertObjectStructureUtang(dataResponse,dateFormat){
    try{
        var dataTemp = await this.convertDate(dataResponse, dateFormat)
        let dataModified = []


        dataTemp.forEach((item,index) =>{
            dataModified.push({
                tanggal : item.tanggal,
                id : item.id,
                idPengeluaran :item.id_pengeluaran,
                nama: item.nama,
                nominal : item.nominal,
            })
        })
        
    
        let totalUtangTemp = dataTemp.reduce((currentTotal,item)=>{
            return parseInt(item.nominal) + currentTotal
        },0)
        let banyakUtangTemp = dataTemp.length

        let data = []
        data.push({
            data:dataModified,
            totalUtang:totalUtangTemp,
            banyakUtang:banyakUtangTemp
        })
        
      return data
    }catch(err){
      return err
    }
}


async function convertObjectStructureInvoiceAmount(dataResponse,dateFormat){
    try{
        let data = {}
        if(dataResponse.data){
            var dataTemp = await this.convertDate(dataResponse, dateFormat)
        
            let totalTagihanTemp = dataTemp.reduce((currentTotal,item)=>{
                return parseInt(item.grandTotal) + currentTotal
            },0)
            let banyakInvoiceTemp = dataTemp.length

            data = {
                kodeClient: dataTemp[0].kodeClient,
                namaClient: dataTemp[0].namaClient,
                data: dataTemp,
                totalTagihan: totalTagihanTemp,
                banyakInvoice: banyakInvoiceTemp
            }
      }
      return data
    
    }catch(err){
      return err
    }
}

async function convertObjectStructureInventory(dataResponse,dateFormat){
    try{
        let data = {}
        if(dataResponse.data){
            var dataTemp = await this.convertDate(dataResponse, dateFormat)
            
            dataTemp.forEach((item,index) => {
                let oneYear = 365
                let hargaAwal = item.hargaAwal
                let nilaiPenyusutan = item.nilaiPenyusutan
                let lamaKepemilikan = item.lamaKepemilikan
                let result =  Math.round(hargaAwal - hargaAwal  * ((nilaiPenyusutan/100) / oneYear) * lamaKepemilikan) 
                if  (result >= 0 && result <= hargaAwal){
                    item.hargaSaatIni = result
                } else if (result > hargaAwal) {
                    item.hargaSaatIni = hargaAwal
                } else {
                    item.hargaSaatIni = 0
                }
                
                item.hargaTersusut  = hargaAwal - item.hargaSaatIni 
            })


            let dataInventoryTemp = dataTemp.filter((item) => item.hargaSaatIni > 0)
            let listHargaTersusut = dataInventoryTemp.map((item) => {return item.hargaTersusut})
            let totalHargaPenyusutanTemp = listHargaTersusut.reduce((currentTotal, item)=> parseInt(currentTotal) + parseInt(item))

            data = {
                dataInventory : dataInventoryTemp,
                totalHargaPenyusutan : totalHargaPenyusutanTemp.toString()
            }
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
    convertRecordDate,
    convertObjectStructure,
    manipulateData,
    manipulateDataInvoice,
    convertObjectStructureCutting,
    convertObjectStructureJahit,
    convertObjectStructureBarangJadi,
    convertObjectStructureInvoice,
    convertObjectStructureLabaRugi,
    convertObjectStructureDebitKredit,
    convertObjectStructureUtangPiutang,
    convertObjectStructureUtang,
    convertObjectStructureInvoiceAmount,
    convertObjectStructureInventory

}
