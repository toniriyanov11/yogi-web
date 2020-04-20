var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Data Invoice', page:'invoice/invoice.ejs'});
});

router.get('/buat', function(req, res, next) {
    res.render('index', { title: 'Buat Invoice', page:'invoice/invoice_buat.ejs'});
});

router.get('/edit/:id', function(req, res, next) {
    res.render('index', { title: 'Edit Invoice', page:'invoice/invoice_edit.ejs', data:req.query});
});

router.get('/detil/:id', function(req, res, next) {
    res.render('index', { title: 'Detail Invoice', page:'invoice/invoice_detil.ejs', data:req.query});
});

module.exports = router;
