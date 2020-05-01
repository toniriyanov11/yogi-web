var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'bahan baku', page:'bahan-baku/bahanbaku.ejs'});
});


module.exports = router;
