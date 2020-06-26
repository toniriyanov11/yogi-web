var express = require('express');
var router = express.Router();
var moment = require('moment')

const controllerPemasukan = require('../controllers/controllerPemasukan.js')

/* GET home page. */
router.get('/',async function(req, res, next) {
   res.render('index', { title: 'Pemasukan', page:'pemasukan/pemasukan.ejs'});
})


router.post('/',async function(req, res, next) {
   let dataResponse = await controllerPemasukan.getPemasukanAll()
   console.log(dataResponse.ret)
   if (dataResponse.ret == '0') {
      for(let i=0; i<=dataResponse.data.length-1; i++){
          dataResponse.data[i].tanggal = moment(dataResponse.data[i].tanggal).format('DD/MM/YYYY')
      }
      var data = dataResponse.data
      res.status(200).json(data);
   } else {
      var data = null
      res.status(500).json(data);
   }
})

router.get('/edit/:id', async function(req, res, next) {
  var id = req.params.id;

  let dataResponse = await controllerPemasukan.getPemasukanById(id)
    console.log(dataResponse)
    if (dataResponse.ret == '0') {
       for(let i=0; i<=dataResponse.data.length-1; i++){
           dataResponse.data[i].tanggal = moment(dataResponse.data[i].tanggal).format('YYYY-MM-DD')
       }
       var data = dataResponse.data
    } else {
       var data = null
    }
    console.log(data)

  res.render('index', { title: 'Edit Pemasukan', page:'pemasukan/pemasukan_edit.ejs', data:JSON.stringify(data)});
});

router.post('/edit', async function(req, res, next) {
   var data = req.body.data
   console.log(data)
   let dataResponse = await controllerPemasukan.updatePemasukan(data)
   console.log(dataResponse)
   if (dataResponse.ret == '0') {
      res.status(200).json(dataResponse);
   } else {
      res.status(200).json(dataResponse);
   }
});



router.get('/detil/:id',async function(req, res, next) {
  var id = req.params.id;

  let dataResponse = await controllerPemasukan.getPemasukanById(id)
    console.log(dataResponse)
    if (dataResponse.ret == '0') {
       for(let i=0; i<=dataResponse.data.length-1; i++){
           dataResponse.data[i].tanggal = moment(dataResponse.data[i].tanggal).format('DD/MM/YYYY')
       }
       var data = dataResponse.data
    } else {
       var data = null
    }
    console.log(data)

  res.render('index', { title: 'Detail Pemasukan', page:'pemasukan/pemasukan_detil.ejs', data:JSON.stringify(data)});
});



router.get('/tambah', function(req, res, next) {
    res.render('index', { title: 'Tambah Pemasukan', page:'pemasukan/pemasukan_tambah.ejs'});
});


router.post('/tambah', async function(req, res, next) {
   var data = req.body.data
   console.log(data)
   let dataResponse = await controllerPemasukan.insertPemasukan(data)
   console.log(dataResponse)
   if (dataResponse.ret == '0') {
      res.status(200).json(dataResponse);
   } else {
      res.status(200).json(dataResponse);
   }
});

router.post('/hapus/:id', async function(req, res, next) {
   var id = req.params.id
   console.log(id)
   let dataResponse = await controllerPemasukan.deletePemasukan(id)
   console.log(dataResponse)
   if (dataResponse.ret == '0') {
      console.log('sini')
      res.status(200).json(dataResponse);
   } else {
      res.status(500).json(dataResponse);
   }
});


module.exports = router;
