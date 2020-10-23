var express = require('express');
var router = express.Router();

const controllerOthers = require('../controllers/controllerOthers.js');
const util = require('../configs/utils.js');



 // setup harga 
router.get('/setupharga',async function(req, res, next) {
   res.render('index', { title: 'Setup Harga', page:'setup-data/setupharga.ejs'});
})


router.post('/mastervarianbahan/edit', async function(req, res, next) {
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


router.get('/mastervarianbahan/tambah', function(req, res, next) {
   res.render('index', { title: 'Tambah Varian Bahan', page:'master-data/master-varianbahan/mastervarianBahan_tambah.ejs'});
});

router.post('/mastervarianbahan/tambah', async function(req, res, next) {
   try{
      var data = req.body.data
      let dataResponse = await controllerMaster.insertMasterVarianBahan(data)
      console.log(dataResponse)
      if (dataResponse.success) {
         res.status(200).json(dataResponse);
      } else {
         res.status(400).json();
      }
   }catch(err){
     console.log(err)
      res.status(500).json(err);
   }
 });

module.exports = router;