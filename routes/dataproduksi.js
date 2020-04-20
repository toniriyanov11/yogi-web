var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Data Produksi', page:'data-produksi/beranda.ejs'});
});

//---------------cutting-----------------
router.get('/cutting', function(req, res, next) {
    res.render('index', { title: 'Data Produksi - Cutting', page:'data-produksi/cutting/cutting.ejs'});
  });
  
router.get('/cutting/tambah', function(req, res, next) {
    res.render('index', { title: 'Tambah Cutting', page:'data-produksi/cutting/cutting_tambah.ejs'});
});

router.get('/cutting/edit/:id', function(req, res, next) {
    res.render('index', { title: 'Edit Cutting', page:'data-produksi/cutting/cutting_edit.ejs', data:req.query});
});

router.get('/cutting/detil/:id', function(req, res, next) {
    res.render('index', { title: 'Detail Cutting', page:'data-produksi/cutting/cutting_detil.ejs', data:req.query});
});


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
