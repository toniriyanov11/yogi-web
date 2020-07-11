var express = require('express');
var router = express.Router();

const controllerMaster= require('../controllers/controllerMaster.js');
const controllerClient= require('../controllers/controllerClient.js');
const util = require('../configs/utils.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'client', page:'client/client.ejs'});
});

router.post('/',async function(req, res, next) {
  try{
     let dataResponse = await controllerMaster.getClient()
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

router.get('/detil/:id',async function(req, res, next) {
   var id = req.params.id;
   res.render('index', { title: 'Detail Client', page:'client/client_detil.ejs', data:JSON.stringify(id)});
});

router.post('/detil/:id',async function(req, res, next) {
   try{
      var id = req.params.id;
      let dataResponse = await controllerClient.getClientById(id)
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
});


router.get('/edit/:id', async function(req, res, next) {
   var id = req.params.id;
   res.render('index', { title: 'Edit Client', page:'client/client_edit.ejs', data:JSON.stringify(id)});
   });
   
   router.post('/edit/:id', async function(req, res, next) {
   try{
      var id = req.params.id;
      let dataResponse = await controllerClient.getClientById(id)   
      var data =""
      if (dataResponse.success) {
         data = await util.convertDate(dataResponse,'YYYY-MM-DD')
         res.status(200).json(data);
      } else {
         res.status(400).json(data);
      }
   } catch(err){
      console.log(err)
      res.status(500).json(err);
   }
   });
   
   router.post('/edit', async function(req, res, next) {
   try {
      var data = req.body.data
      let dataResponse = await controllerClient.updateClient(data)
      if (dataResponse.success) {
         res.status(200).json(dataResponse);
      } else {
         res.status(400).json();
      }
   } catch (err) {
      res.status(500).json(err);
   }
   });
   

router.get('/tambah', function(req, res, next) {
   res.render('index', { title: 'Tambah', page:'client/client_tambah.ejs'});
});

router.post('/tambah', async function(req, res, next) {
try{
   var data = req.body.data
   let dataResponse = await controllerClient.insertClient(data)
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
