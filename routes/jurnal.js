var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.redirect('/jurnal/debit-kredit')
});

//---------------debit-kredit-----------------
router.get('/debit-kredit', function(req, res, next) {
    res.render('index', { title: 'Jurnal - Debit/Kredit', page:'jurnal/debit-kredit/debitkredit.ejs'});
  });


//---------------hutang-piutang-----------------
router.get('/hutang-piutang', function(req, res, next) {
  res.render('index', { title: 'Jurnal - Hutang/Piutang', page:'jurnal/hutang-piutang/hutangpiutang.ejs'});
});


module.exports = router;