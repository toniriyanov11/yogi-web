var express = require('express');
var router = express.Router();

const controllerDataProduksi= require('../controllers/controllerDataProduksi.js')
const util = require('../configs/utils.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Data Produksi', page:'data-produksi/beranda.ejs'});
});

//---------------cutting-----------------
router.get('/cutting', function(req, res, next) {
    res.render('index', { title: 'Data Produksi - Cutting', page:'data-produksi/cutting/cutting.ejs'});
});

router.post('/cutting',async function(req, res, next) {
  try{
     let dataResponse = await controllerDataProduksi.getCuttingAll()
     console.log(dataResponse)
     var data =""
     if (dataResponse.success) {
        data = await util.convertDate(dataResponse,'DD/MM/YYYY')
        res.status(200).json(data);
     } else {
        res.status(400).json(data);
     }
   }catch(err){
     res.status(500).json(err);
   }
})

router.get('/cutting/detil/:id', function(req, res, next) {
  var id = req.params.id;
  res.render('index', { title: 'Detail Cutting', page:'data-produksi/cutting/cutting_detil.ejs', data:JSON.stringify(id)});
});

router.post('/cutting/detil/:id',async function(req, res, next) {
   try{
      var id = req.params.id;
      let dataResponse = await controllerDataProduksi.getCuttingById(id)
      var data =""
      if (dataResponse.success) {
         data = await util.convertDate(dataResponse,'DD/MM/YYYY')
         res.status(200).json(data);
      } else {
         res.status(400).json(data);
      }
  }catch(err){
       res.status(500).json(err);
  }
});


router.get('/cutting/tambah', function(req, res, next) {
    res.render('index', { title: 'Tambah Cutting', page:'data-produksi/cutting/cutting_tambah.ejs'});
});

router.post('/cutting/tambah', async function(req, res, next) {
  try{
     var data = req.body.data
     let dataResponse = await controllerDataProduksi.insertCutting(data)
     console.log(dataResponse)
     if (dataResponse.success) {
        res.status(200).json(dataResponse);
     } else {
        res.status(400).json();
     }
  }catch(err){
     res.status(500).json(err);
  }
});

router.get('/cutting/edit/:id', function(req, res, next) {
    var id = req.params.id;
    res.render('index', { title: 'Edit Cutting', page:'data-produksi/cutting/cutting_edit.ejs', data:JSON.stringify(id)});
});

router.post('/cutting/edit/:id', async function(req, res, next) {
  try{
     var id = req.params.id;
     let dataResponse = await controllerDataProduksi.getCuttingById(id)   
     var data =""
     if (dataResponse.success) {
        data = await util.convertDate(dataResponse,'YYYY-MM-DD')
        res.status(200).json(data);
     } else {
        res.status(400).json(data);
     }
  } catch(err){
     res.status(500).json(err);
  }
});

router.post('/cutting/edit', async function(req, res, next) {
  try {
     var data = req.body.data
     let dataResponse = await controllerDataProduksi.updateCutting(data)
     if (dataResponse.success) {
        res.status(200).json(dataResponse);
     } else {
        res.status(400).json();
     }
  } catch (err) {
     res.status(500).json(err);
  }
});

router.post('/cutting/hapus/:id', async function(req, res, next) {
  try{
     var id = req.params.id
     let dataResponse = await controllerPemasukan.deletePemasukan(id)
     console.log(dataResponse)
     if (dataResponse.success ) {
        res.status(200).json(dataResponse);
     } else {
        res.status(400).json();
     }
  } catch(err){
     res.status(500).json(err);
  }
});

//end of Cutting



//---------------sablon-----------------
router.get('/sablon', function(req, res, next) {
  res.render('index', { title: 'Data Produksi - sablon', page:'data-produksi/sablon/sablon.ejs'});
});

router.get('/sablon/tambah', function(req, res, next) {
  res.render('index', { title: 'Tambah sablon', page:'data-produksi/sablon/sablon_tambah.ejs'});
});

router.get('/sablon/edit/:id', function(req, res, next) {
  res.render('index', { title: 'Edit sablon', page:'data-produksi/sablon/sablon_edit.ejs', data:req.query});
});

router.get('/sablon/detil/:id', function(req, res, next) {
  res.render('index', { title: 'Detail sablon', page:'data-produksi/sablon/sablon_detil.ejs', data:req.query});
});



//---------------jahit-----------------
router.get('/jahit', function(req, res, next) {
  res.render('index', { title: 'Data Produksi - jahit', page:'data-produksi/jahit/jahit.ejs'});
});

router.get('/jahit/tambah', function(req, res, next) {
  res.render('index', { title: 'Tambah jahit', page:'data-produksi/jahit/jahit_tambah.ejs'});
});

router.get('/jahit/edit/:id', function(req, res, next) {
  res.render('index', { title: 'Edit jahit', page:'data-produksi/jahit/jahit_edit.ejs', data:req.query});
});

router.get('/jahit/detil/:id', function(req, res, next) {
  res.render('index', { title: 'Detail jahit', page:'data-produksi/jahit/jahit_detil.ejs', data:req.query});
});



//---------------barangjadi-----------------
router.get('/barangjadi', function(req, res, next) {
  res.render('index', { title: 'Data Produksi - barang jadi', page:'data-produksi/barangjadi/barangjadi.ejs'});
});

router.get('/barangjadi/tambah', function(req, res, next) {
  res.render('index', { title: 'Tambah barang jadi', page:'data-produksi/barangjadi/barangjadi_tambah.ejs'});
});

router.get('/barangjadi/edit/:id', function(req, res, next) {
  res.render('index', { title: 'Edit barang jadi', page:'data-produksi/barangjadi/barangjadi_edit.ejs', data:req.query});
});

router.get('/barangjadi/detil/:id', function(req, res, next) {
  res.render('index', { title: 'Detail barang jadi', page:'data-produksi/barangjadi/barangjadi_detil.ejs', data:req.query});
});


module.exports = router;
