var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Pemasukan', page:'pemasukan/pemasukan.ejs'});
});

router.get('/detil/:id', function(req, res, next) {
  var id = req.params.id;
  console.log(req.query)
  res.render('index', { title: 'Detail Pemasukan', page:'pemasukan/pemasukan_detil.ejs', data:req.query});
});

router.get('/edit/:id', function(req, res, next) {
  var id = req.params.id;
  console.log(req.query)
  res.render('index', { title: 'Edit Pemasukan', page:'pemasukan/pemasukan_edit.ejs', data:req.query});
});

router.get('/tambah', function(req, res, next) {
    res.render('index', { title: 'Tambah Pemasukan', page:'pemasukan/pemasukan_tambah.ejs'});
});


module.exports = router;
