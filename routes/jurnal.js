var express = require('express');
var router = express.Router();


const controllerOthers= require('../controllers/controllerOthers.js');
const util = require('../configs/utils.js');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.redirect('/jurnal/debit-kredit')
});

//---------------debit-kredit-----------------
router.get('/debit-kredit', function(req, res, next) {
    res.render('index', { title: 'Jurnal - Debit/Kredit', page:'jurnal/debit-kredit/debitkredit.ejs'});
  });

router.post('/debit-kredit', async function(req, res, next) {
  try {
      var data = req.body.data
      console.log(data)
      let dataResponse = await controllerOthers.getDebitKredit(data)
      console.log(dataResponse)
      data =  await util.convertObjectStructureDebitKredit(dataResponse, 'DD/MM/YYYY')
      console.log('data',data[0])
      if (dataResponse.success) {
        res.status(200).json(data);
      } else {
        res.status(400).json();
      }
  } catch (err) {
      res.status(500).json(err);
  }
});




//---------------utang-piutang-----------------
router.get('/utang-piutang', function(req, res, next) {
  res.render('index', { title: 'Jurnal - Utang/Piutang', page:'jurnal/utang-piutang/utangpiutang.ejs'});
});


router.post('/utang-piutang', async function(req, res, next) {
  try {
      var data = req.body.data
      console.log(data)
      let dataResponse = await controllerOthers.getUtangPiutang(data)
      console.log(dataResponse)
      data =  await util.convertObjectStructureUtangPiutang(dataResponse, 'DD/MM/YYYY')
      console.log('data',data[0])
      if (dataResponse.success) {
        res.status(200).json(data);
      } else {
        res.status(400).json();
      }
  } catch (err) {
      res.status(500).json(err);
  }
});

module.exports = router;