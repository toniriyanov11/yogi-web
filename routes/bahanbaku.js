var express = require('express');
var router = express.Router();

const controllerOthers= require('../controllers/controllerOthers.js');
const util = require('../configs/utils.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'bahan baku', page:'bahan-baku/bahanbaku.ejs'});
});

router.post('/',async function(req, res, next) {
  try{
     let dataResponse = await controllerOthers.getMaterials()
     console.log(dataResponse)
     var data =""
     if (dataResponse.success) {
        data = await util.convertDate(dataResponse,'DD/MM/YYYY')
        res.status(200).json(data);
     } else {
        res.status(400).json(data);
     }
   }catch(err){
     console.log(err)
     res.status(500).json(err);
   }
  })


module.exports = router;
