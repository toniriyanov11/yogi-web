var express = require('express');
var router = express.Router();

const controllerPengeluaran= require('../controllers/controllerPengeluaran.js')
const util = require('../configs/utils.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('/pengeluaran/pembelian')
});


/* Pembelian */
router.get('/pembelian', function(req, res, next) {
  res.render('index', { title: 'Pengeluaran - Pembelian', page:'pengeluaran/pembelian.ejs'});
});

router.post('/pembelian',async function(req, res, next) {
  try{
     let dataResponse = await controllerPengeluaran.getPembelianAll()
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


router.get('/pembelian/detil/:id', function(req, res, next) {
  var id = req.params.id;
  res.render('index', { title: 'Detail Pembelian', page:'pengeluaran/pembelian_detil.ejs', data:JSON.stringify(id)});
});


router.post('/pembelian/detil/:id',async function(req, res, next) {
  try{
     var id = req.params.id;
     let dataResponse = await controllerPengeluaran.getPembelianById(id)
     var data =""
     if (dataResponse.success) {
        data = await util.convertDate(dataResponse,'DD/MM/YYYY')
        res.status(200).json(data);
     } else {
        res.status(400).json(data);
     }
 }catch(err){
   console.log(err)
      res.status(500).json(err);
 }
});


router.get('/pembelian/edit/:id', async function(req, res, next) {
  var id = req.params.id;
  res.render('index', { title: 'Edit Pembelian', page:'pengeluaran/pembelian_edit.ejs', data:JSON.stringify(id)});
});

router.post('/pembelian/edit/:id', async function(req, res, next) {
  try{
     var id = req.params.id;
     let dataResponse = await controllerPengeluaran.getPembelianById(id)   
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

router.post('/pembelian/edit', async function(req, res, next) {
  try {
     var data = req.body.data
     let dataResponse = await controllerPengeluaran.updatePembelian(data)
     if (dataResponse.success) {
        res.status(200).json(dataResponse);
     } else {
        res.status(400).json();
     }
  } catch (err) {
     res.status(500).json(err);
  }
});


router.get('/pembelian/tambah', function(req, res, next) {
    res.render('index', { title: 'Tambah Pembelian', page:'pengeluaran/pembelian_tambah.ejs'});
});

router.post('/pembelian/tambah', async function(req, res, next) {
  try{
     var data = req.body.data
     let dataResponse = await controllerPengeluaran.insertPembelian(data)
     console.log(dataResponse)
     if (dataResponse.success) {
        res.status(200).json(dataResponse);
     } else {
        res.status(400).json();
     }
  }catch(err){
    console.log(err)
     res.status(500).json(err);
  }
});

router.post('/pembelian/hapus/:id', async function(req, res, next) {
  try{
     var id = req.params.id
     let dataResponse = await controllerPengeluaran.deletePembelian(id)
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


/* End of Pembelian */




router.get('/beban', function(req, res, next) {
  res.render('index', { title: 'Pengeluaran - Beban', page:'pengeluaran/beban.ejs'});
});

router.get('/beban/detil/:id', function(req, res, next) {
  var id = req.params.id;
  console.log(req.query)
  res.render('index', { title: 'Detail Beban', page:'pengeluaran/beban_detil.ejs', data:req.query});
});

router.get('/beban/edit/:id', function(req, res, next) {
  var id = req.params.id;
  console.log(req.query)
  res.render('index', { title: 'Edit Beban', page:'pengeluaran/beban_edit.ejs', data:req.query});
});

router.get('/beban/tambah', function(req, res, next) {
    res.render('index', { title: 'Tambah Beban', page:'pengeluaran/beban_tambah.ejs'});
});



router.get('/pembayaran', function(req, res, next) {
  res.render('index', { title: 'Pengeluaran - pembayaran', page:'pengeluaran/pembayaran.ejs'});
});

router.get('/pembayaran/detil/:id', function(req, res, next) {
  var id = req.params.id;
  console.log(req.query)
  res.render('index', { title: 'Detail pembayaran', page:'pengeluaran/pembayaran_detil.ejs', data:req.query});
});

router.get('/pembayaran/edit/:id', function(req, res, next) {
  var id = req.params.id;
  console.log(req.query)
  res.render('index', { title: 'Edit pembayaran', page:'pengeluaran/pembayaran_edit.ejs', data:req.query});
});

router.get('/pembayaran/tambah', function(req, res, next) {
    res.render('index', { title: 'Tambah pembayaran', page:'pengeluaran/pembayaran_tambah.ejs'});
});

module.exports = router;
