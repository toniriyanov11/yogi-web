var express = require('express');
var router = express.Router();

const controllerOthers = require('../controllers/controllerOthers.js');
const util = require('../configs/utils.js');



 // setup harga 
router.get('/harga',async function(req, res, next) {
   res.render('index', { title: 'Setup Harga', page:'setup-data/setupharga.ejs'});
})


router.post('/harga/edit', async function(req, res, next) {
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


 // setup harga barang return
 router.get('/hargabarangreturn',async function(req, res, next) {
   res.render('index', { title: 'Setup Harga Barang Return', page:'setup-data/setuphargabarangreturn.ejs'});
})

router.post('/hargabarangreturn', async function(req, res, next) {
   try {
      var data = req.body.data
      let dataResponse = await controllerOthers.getHargaBarangReturn(data)
      if (dataResponse.success) {
         data = await util.convertRecordDate(dataResponse, 'YYYY-MM-DD')
         res.status(200).json(data);
      } else {
         res.status(400).json();
      }
   } catch (err) {
      res.status(500).json(err);
   }
});

router.post('/hargabarangreturn/edit', async function(req, res, next) {
   try {
      var data = req.body.data
      let dataResponse = await controllerOthers.updateHargaBarangReturn(data)
      if (dataResponse.success) {
         res.status(200).json(dataResponse);
      } else {
         res.status(400).json();
      }
   } catch (err) {
      res.status(500).json(err);
   }
});


 // setup harga csr
 router.get('/setupcsr',async function(req, res, next) {
   res.render('index', { title: 'Setup CSR', page:'setup-data/setupcsr.ejs'});
})


router.post('/setupcsr/edit', async function(req, res, next) {
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