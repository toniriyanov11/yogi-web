var express = require('express');
var router = express.Router();
var moment = require('moment');
require('dotenv').config();

const controllerPemasukan = require('../controllers/controllerPemasukan.js')
const util = require('../configs/utils.js');

/* GET home page. */
router.get('/',async function(req, res, next) {
   res.render('index', { title: 'Pemasukan', page:'pemasukan/pemasukan.ejs'});
})


router.post('/',async function(req, res, next) {
try{
   let dataResponse = await controllerPemasukan.getPemasukanAll()
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

router.get('/edit/:id', async function(req, res, next) {
   var id = req.params.id;
   res.render('index', { title: 'Edit Pemasukan', page:'pemasukan/pemasukan_edit.ejs', data:JSON.stringify(id)});
});

router.post('/edit/:id', async function(req, res, next) {
   try{
      var id = req.params.id;
      let dataResponse = await controllerPemasukan.getPemasukanById(id)   
      var data =""
      if (dataResponse.success) {
         data = await util.convertDate(dataResponse,'YYYY-MM-DD')
         res.status(200).json(data);
      } else {
         res.status(400).json(data);
      }
   } catch(err){
      res.status(500).json(err);
   }
});

router.post('/edit', async function(req, res, next) {
   try {
      var data = req.body.data
      let dataResponse = await controllerPemasukan.updatePemasukan(data)
      if (dataResponse.success) {
         res.status(200).json(dataResponse);
      } else {
         res.status(400).json();
      }
   } catch (err) {
      res.status(500).json(err);
   }
});


router.get('/detil/:id',async function(req, res, next) {
  var id = req.params.id;
  res.render('index', { title: 'Detail Pemasukan', page:'pemasukan/pemasukan_detil.ejs', data:JSON.stringify(id)});
});

router.post('/detil/:id',async function(req, res, next) {
   try{
      var id = req.params.id;
      let dataResponse = await controllerPemasukan.getPemasukanById(id)
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

router.get('/tambah', function(req, res, next) {
    res.render('index', { title: 'Tambah Pemasukan', page:'pemasukan/pemasukan_tambah.ejs'});
});

router.post('/tambah', async function(req, res, next) {
   try{
      var data = req.body.data
      let dataResponse = await controllerPemasukan.insertPemasukan(data)
      if (dataResponse.success) {
         res.status(200).json(dataResponse);
      } else {
         res.status(400).json();
      }
   }catch(err){
      res.status(500).json(err);
   }
});

router.post('/hapus/:id', async function(req, res, next) {
   try{
      var id = req.params.id
      let dataResponse = await controllerPemasukan.deletePemasukan(id)
      console.log(dataResponse)
      if (dataResponse.success ) {
         res.status(200).json(dataResponse);
      } else {
         res.status(400).json();
      }
   } catch(err){
      res.status(500).json(err);
   }
});


module.exports = router;
