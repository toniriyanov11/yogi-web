var express = require('express');
var router = express.Router();

const controllerMaster = require('../controllers/controllerMaster.js');
const util = require('../configs/utils.js');



router.get('/',async function(req, res, next) {
 
})

/* GET home page. */
router.get('/client',async function(req, res, next) {
    try{
        let dataResponse = await controllerMaster.getClient()
        var data =""
        if (dataResponse.success) {
           data = await util.convertRecordDate(dataResponse,'DD/MM/YYYY')
           res.status(200).json(data);
        } else {
           res.status(400).json(data);
        }
      }catch(err){
        res.status(500).json(err);
      }
})

router.get('/supplier',async function(req, res, next) {
   try{
       let dataResponse = await controllerMaster.getSupplier()
       var data =""
       if (dataResponse.success) {
          data = await util.convertRecordDate(dataResponse,'DD/MM/YYYY')
          res.status(200).json(data);
       } else {
          res.status(400).json(data);
       }
     }catch(err){
        console.log(err)
       res.status(500).json(err);
     }
})

router.get('/payment-status',async function(req, res, next) {
    try{
        let dataResponse = await controllerMaster.getPaymentStatus()
        var data =""
        if (dataResponse.success) {
           data = await util.convertRecordDate(dataResponse,'DD/MM/YYYY')
           res.status(200).json(data);
        } else {
           res.status(400).json(data);
        }
      }catch(err){
        res.status(500).json(err);
      }
})

router.get('/input-type',async function(req, res, next) {
    try{    
        let dataResponse = await controllerMaster.getInputType()
        var data =""
        if (dataResponse.success) {
           data = await util.convertRecordDate(dataResponse,'DD/MM/YYYY')
           res.status(200).json(data);
        } else {
           res.status(400).json(data);
        }
      }catch(err){
        res.status(500).json(err);
      }
})

router.get('/buying-type',async function(req, res, next) {
    try{    
        let dataResponse = await controllerMaster.getBuyingType()
        var data =""
        if (dataResponse.success) {
           data = await util.convertRecordDate(dataResponse,'DD/MM/YYYY')
           res.status(200).json(data);
        } else {
           res.status(400).json(data);
        }
      }catch(err){
        res.status(500).json(err);
      }
})

router.get('/master-material',async function(req, res, next) {
    try{    
        let dataResponse = await controllerMaster.getMasterMaterial()
        var data =""
        if (dataResponse.success) {
           data = await util.convertRecordDate(dataResponse,'DD/MM/YYYY')
           res.status(200).json(data);
        } else {
           res.status(400).json(data);
        }
      }catch(err){
        res.status(500).json(err);
      }
})

router.get('/load-type',async function(req, res, next) {
   try{    
       let dataResponse = await controllerMaster.getLoadType()
       var data =""
       if (dataResponse.success) {
          data = await util.convertRecordDate(dataResponse,'DD/MM/YYYY')
          res.status(200).json(data);
       } else {
          res.status(400).json(data);
       }
     }catch(err){
       res.status(500).json(err);
     }
})


router.get('/payment-type',async function(req, res, next) {
   try{    
       let dataResponse = await controllerMaster.getPaymentType()
       var data =""
       if (dataResponse.success) {
          data = await util.convertRecordDate(dataResponse,'DD/MM/YYYY')
          res.status(200).json(data);
       } else {
          res.status(400).json(data);
       }
     }catch(err){
       res.status(500).json(err);
     }
})

router.get('/stuff-type',async function(req, res, next) {
   try{    
       let dataResponse = await controllerMaster.getStuffType()
       var data =""
       if (dataResponse.success) {
          data = await util.convertRecordDate(dataResponse,'DD/MM/YYYY')
          res.status(200).json(data);
       } else {
          res.status(400).json(data);
       }
     }catch(err){
       res.status(500).json(err);
     }
})

router.get('/stuff-variant',async function(req, res, next) {
   try{    
       let dataResponse = await controllerMaster.getStuffVariant()
       var data =""
       if (dataResponse.success) {
          data = await util.convertRecordDate(dataResponse,'DD/MM/YYYY')
          res.status(200).json(data);
       } else {
          res.status(400).json(data);
       }
     }catch(err){
       res.status(500).json(err);
     }
})

router.get('/stuff-color',async function(req, res, next) {
   try{    
       let dataResponse = await controllerMaster.getStuffColor()
       var data =""
       if (dataResponse.success) {
          data = await util.convertRecordDate(dataResponse,'DD/MM/YYYY')
          res.status(200).json(data);
       } else {
          res.status(400).json(data);
       }
     }catch(err){
       res.status(500).json(err);
     }
})

router.get('/cutting-type',async function(req, res, next) {
   try{    
       let dataResponse = await controllerMaster.getCuttingType()
       var data =""
       if (dataResponse.success) {
          data = await util.convertRecordDate(dataResponse,'DD/MM/YYYY')
          res.status(200).json(data);
       } else {
          res.status(400).json(data);
       }
     }catch(err){
       res.status(500).json(err);
     }
})

router.get('/sub-cutting-type',async function(req, res, next) {
   try{    
       let dataResponse = await controllerMaster.getSubCuttingType()
       var data =""
       if (dataResponse.success) {
          data = await util.convertRecordDate(dataResponse,'DD/MM/YYYY')
          res.status(200).json(data);
       } else {
          res.status(400).json(data);
       }
     }catch(err){
       res.status(500).json(err);
     }
})

router.get('/stuff-stock',async function(req, res, next) {
   try{    
       let dataResponse = await controllerMaster.getStuffStock()
       var data =""
       console.log(dataResponse)
       if (dataResponse.success) {
          data = await util.convertRecordDate(dataResponse,'DD/MM/YYYY')
          res.status(200).json(data);
       } else {
          res.status(400).json(data);
       }
     }catch(err){
       res.status(500).json(err);
     }
})

// master warna 
router.get('/masterwarna',async function(req, res, next) {
   res.render('index', { title: 'Master Warna', page:'master-data/master-warna/masterwarna.ejs'});
})

router.post('/masterwarna/edit', async function(req, res, next) {
   try {
      var data = req.body.data
      let dataResponse = await controllerMaster.updateMasterWarna(data)
      if (dataResponse.success) {
         res.status(200).json(dataResponse);
      } else {
         res.status(400).json();
      }
   } catch (err) {
      res.status(500).json(err);
   }
 });


router.get('/masterwarna/tambah', function(req, res, next) {
   res.render('index', { title: 'Tambah Master Warna', page:'master-data/master-warna/masterwarna_tambah.ejs'});
});

router.post('/masterwarna/tambah', async function(req, res, next) {
   try{
      var data = req.body.data
      let dataResponse = await controllerMaster.insertMasterWarna(data)
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


 // master jenis bahan 
router.get('/masterjenisbahan',async function(req, res, next) {
   res.render('index', { title: 'Master Jenis Bahan', page:'master-data/master-jenisbahan/masterjenisbahan.ejs'});
})


router.post('/masterjenisbahan/edit', async function(req, res, next) {
   try {
      var data = req.body.data
      let dataResponse = await controllerMaster.updateMasterJenisBahan(data)
      if (dataResponse.success) {
         res.status(200).json(dataResponse);
      } else {
         res.status(400).json();
      }
   } catch (err) {
      res.status(500).json(err);
   }
 });


router.get('/masterjenisbahan/tambah', function(req, res, next) {
   res.render('index', { title: 'Tambah Jenis Bahan', page:'master-data/master-jenisbahan/masterJenisBahan_tambah.ejs'});
});

router.post('/masterjenisbahan/tambah', async function(req, res, next) {
   try{
      var data = req.body.data
      let dataResponse = await controllerMaster.insertMasterJenisBahan(data)
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