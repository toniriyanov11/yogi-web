var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'supplier', page:'supplier/supplier.ejs'});
});

router.get('/detil/:id', function(req, res, next) {
  var id = req.params.id;
  console.log(req.query)
  res.render('index', { title: 'Detail supplier', page:'supplier/supplier_detil.ejs', data:req.query});
});

router.get('/edit/:id', function(req, res, next) {
  var id = req.params.id;
  console.log(req.query)
  res.render('index', { title: 'Edit supplier', page:'supplier/supplier_edit.ejs', data:req.query});
});

router.get('/tambah', function(req, res, next) {
    res.render('index', { title: 'Tambah supplier', page:'supplier/supplier_tambah.ejs'});
});


module.exports = router;
