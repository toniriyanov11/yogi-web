var express = require('express');
var router = express.Router();

const controllerMaster = require('../controllers/controllerMaster.js');
const util = require('../configs/utils.js');



router.get('/',async function(req, res, next) {
 
})

/* GET home page. */
router.get('/client',async function(req, res, next) {
    try{
        let dataResponse = await controllerMaster.getClientAll()
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

module.exports = router;