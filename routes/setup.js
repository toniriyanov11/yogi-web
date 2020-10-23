var express = require('express');
var router = express.Router();

const controllerOthers = require('../controllers/controllerOthers.js');
const util = require('../configs/utils.js');



 // setup harga 
router.get('/setupharga',async function(req, res, next) {
   res.render('index', { title: 'Setup Harga', page:'setup-data/setupharga.ejs'});
})


router.post('/setupharga/edit', async function(req, res, next) {
   try {
      var data = req.body.data
      let dataResponse = await controllerMaster.updateMasterVarianBahan(data)
      if (dataResponse.success) {
         res.status(200).json(dataResponse);
      } else {
         res.status(400).json();
      }
   } catch (err) {
      res.status(500).json(err);
   }
});


 // setup harga 
 router.get('/setuphargabarangreturn',async function(req, res, next) {
   res.render('index', { title: 'Setup Harga Barang Return', page:'setup-data/setuphargabarangreturn.ejs'});
})


router.post('/setuphargabarangreturn/edit', async function(req, res, next) {
   try {
      var data = req.body.data
      let dataResponse = await controllerMaster.updateMasterVarianBahan(data)
      if (dataResponse.success) {
         res.status(200).json(dataResponse);
      } else {
         res.status(400).json();
      }
   } catch (err) {
      res.status(500).json(err);
   }
});



module.exports = router;