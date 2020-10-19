var express = require('express');
const controllerOthers = require('../controllers/controllerOthers');
const util = require('../configs/utils.js');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'barang return', page:'barang-return/barangreturn.ejs'});
});

router.post('/',async function(req, res, next) {
  try{
     let dataResponse = await controllerOthers.getBarangReturnAll()
     var data =""
     if (dataResponse.success) {
        data = await util.convertDate(dataResponse,'DD/MM/YYYY')
        res.status(200).json(data);
     } else {
        res.status(400).json(data);
     }
   }catch(err){
     res.status(500).json(err);
   }
})


module.exports = router;
