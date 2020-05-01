var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'barang sisa', page:'barang-sisa/barangsisa.ejs'});
});


module.exports = router;
