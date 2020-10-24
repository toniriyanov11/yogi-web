var express = require('express');
var router = express.Router();

const controllerOthers= require('../controllers/controllerOthers.js');
const util = require('../configs/utils.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Laba Rugi', page:'laba-rugi/labarugi.ejs'});
});

router.post('/', async function(req, res, next) {
  try {
     var data = req.body.data
     let dataResponse = await controllerOthers.getLabaRugi(data)
     if (dataResponse.success) {
        data = await util.convertObjectStructureLabaRugi(dataResponse, 'YYYY-MM-DD')
        res.status(200).json(data);
     } else {
        res.status(400).json();
     }
  } catch (err) {
     res.status(500).json(err);
  }
});


router.get('/detil/:id', function(req, res, next) {
  var id = req.params.id;
  res.render('index', { title: 'Detail Laba Rugi', page:'laba-rugi/labarugi_detil.ejs', data:JSON.stringify(id)});
});

router.post('/detil/:id',async function(req, res, next) {
   try{
      var id = req.params.id;
      let dataResponse = await controllerOthers.getLabaRugiByIdInvoice(id)
      var data =""
      if (dataResponse.success) {
         data = await util.convertObjectStructureLabaRugi(dataResponse, 'DD/MM/YYYY')
         res.status(200).json(data);
      } else {
         res.status(400).json(data);
      }
  }catch(err){
       res.status(500).json(err);
  }
});

module.exports = router;
