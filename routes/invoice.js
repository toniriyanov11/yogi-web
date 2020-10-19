var express = require('express');
var router = express.Router();



const controllerInvoice= require('../controllers/controllerInvoice.js');
const util = require('../configs/utils.js');
const { clone } = require('lodash');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Data Invoice', page:'invoice/invoice.ejs'});
});


router.post('/',async function(req, res, next) {
   try{
      let dataResponse = await controllerInvoice.getInvoiceAll()
      var data =""
      console.log('-------------------------------incovoice------------------------')
      console.log(dataResponse)
      if (dataResponse.success) {
         data = await util.convertObjectStructureInvoice(dataResponse,'DD/MM/YYYY')
         console.log(data)
         res.status(200).json(data);
      } else {
         res.status(400).json(data);
      }
    }catch(err){
      res.status(500).json(err);
    }
 })
 
 router.get('/detil/:id', function(req, res, next) {
   var id = req.params.id;
   res.render('index', { title: 'Detail Invoice', page:'invoice/invoice_detil.ejs', data:JSON.stringify(id)});
 });
 
 router.post('/detil/:id',async function(req, res, next) {
    try{
       var id = req.params.id;
       let dataResponse = await controllerInvoice.getInvoiceById(id)
       var data =""
       if (dataResponse.success) {
          data = await util.convertObjectStructureInvoice(dataResponse, 'DD/MM/YYYY')
          res.status(200).json(data);
       } else {
          res.status(400).json(data);
       }
   }catch(err){
        res.status(500).json(err);
   }
 });
 
 
 router.get('/tambah', function(req, res, next) {
     res.render('index', { title: 'Tambah Invoice', page:'invoice/invoice_buat.ejs'});
 });
 
 router.post('/tambah', async function(req, res, next) {
   try{
      var data = req.body.data
      let dataManipulation = await util.manipulateDataInvoice(data)
      console.log("tambah invoice")
      let dataResponse = await controllerInvoice.insertInvoice(dataManipulation)
      if (dataResponse.success) {
         res.status(200).json(dataResponse);
      } else {
         res.status(400).json();
      }
   }catch(err){
      res.status(500).json(err);
   }
 });

 //end of Invoice


module.exports = router;
