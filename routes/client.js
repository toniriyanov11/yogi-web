var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'client', page:'client/client.ejs'});
});

router.get('/detil/:id', function(req, res, next) {
  var id = req.params.id;
  console.log(req.query)
  res.render('index', { title: 'Detail client', page:'client/client_detil.ejs', data:req.query});
});

router.get('/edit/:id', function(req, res, next) {
  var id = req.params.id;
  console.log(req.query)
  res.render('index', { title: 'Edit client', page:'client/client_edit.ejs', data:req.query});
});

router.get('/tambah', function(req, res, next) {
    res.render('index', { title: 'Tambah client', page:'client/client_tambah.ejs'});
});

module.exports = router;
