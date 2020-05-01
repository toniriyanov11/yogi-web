var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'barang return', page:'barang-return/barangreturn.ejs'});
});


module.exports = router;
