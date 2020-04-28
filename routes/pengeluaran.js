var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('/pengeluaran/pembelian')
});

router.get('/pembelian', function(req, res, next) {
  res.render('index', { title: 'Pengeluaran - Pembelian', page:'pengeluaran/pembelian.ejs'});
});

router.get('/pembelian/detil/:id', function(req, res, next) {
  var id = req.params.id;
  console.log(req.query)
  res.render('index', { title: 'Detail Pembelian', page:'pengeluaran/pembelian_detil.ejs', data:req.query});
});

router.get('/pembelian/edit/:id', function(req, res, next) {
  var id = req.params.id;
  console.log(req.query)
  res.render('index', { title: 'Edit Pembelian', page:'pengeluaran/pembelian_edit.ejs', data:req.query});
});

router.get('/pembelian/tambah', function(req, res, next) {
    res.render('index', { title: 'Tambah Pembelian', page:'pengeluaran/pembelian_tambah.ejs'});
});



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
