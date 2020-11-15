var express = require('express');
var router = express.Router();


const controllerDataProduksi= require('../controllers/controllerDataProduksi.js');
const controllerOthers= require('../controllers/controllerOthers.js');
const util = require('../configs/utils.js');
const { clone } = require('lodash');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Data Produksi', page:'data-produksi/beranda.ejs'});
});

//---------------cutting-----------------
router.get('/cutting', function(req, res, next) {
    res.render('index', { title: 'Data Produksi - Cutting', page:'data-produksi/cutting/cutting.ejs'});
});

router.post('/cutting',async function(req, res, next) {
  try{
     let dataResponse = await controllerDataProduksi.getCuttingAll()
     var data =""
     if (dataResponse.success) {
        console.log('data response cutting ',dataResponse)
        data = await util.convertObjectStructureCutting(dataResponse,'DD/MM/YYYY')
        res.status(200).json(data);
     } else {
        res.status(400).json(data);
     }
   }catch(err){
     res.status(500).json(err);
   }
})

router.get('/cutting/detil/:id', function(req, res, next) {
  var id = req.params.id;
  res.render('index', { title: 'Detail Cutting', page:'data-produksi/cutting/cutting_detil.ejs', data:JSON.stringify(id)});
});

router.post('/cutting/detil/:id',async function(req, res, next) {
   try{
      var id = req.params.id;
      let dataResponse = await controllerDataProduksi.getCuttingById(id)
      var data =""
      if (dataResponse.success) {
         data = await util.convertObjectStructureCutting(dataResponse,'DD/MM/YYYY')
         res.status(200).json(data);
      } else {
         res.status(400).json(data);
      }
  }catch(err){
       res.status(500).json(err);
  }
});


router.get('/cutting/tambah', function(req, res, next) {
    res.render('index', { title: 'Tambah Cutting', page:'data-produksi/cutting/cutting_tambah.ejs'});
});

router.post('/cutting/tambah', async function(req, res, next) {
  try{
     var data = req.body.data
     let dataResponse = await controllerDataProduksi.insertCutting(data)
     console.log('cutting tambaah -------------',dataResponse)
     if (dataResponse.success) {
        res.status(200).json(dataResponse);
     } else {
        res.status(400).json();
     }
  }catch(err){
     res.status(500).json(err);
  }
});

router.get('/cutting/edit/:id', function(req, res, next) {
    var id = req.params.id;
    res.render('index', { title: 'Edit Cutting', page:'data-produksi/cutting/cutting_edit.ejs', data:JSON.stringify(id)});
});

router.post('/cutting/edit/:id', async function(req, res, next) {
  try{
     var id = req.params.id;
     let dataResponse = await controllerDataProduksi.getCuttingById(id)   
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

router.post('/cutting/edit', async function(req, res, next) {
  try {
     var data = req.body.data
     let dataResponse = await controllerDataProduksi.updateCutting(data)
     if (dataResponse.success) {
        res.status(200).json(dataResponse);
     } else {
        res.status(400).json();
     }
  } catch (err) {
     res.status(500).json(err);
  }
});

router.post('/cutting/hapus/:id', async function(req, res, next) {
  try{
     var id = req.params.id
     let dataResponse = await controllerDataProduksi.deleteCutting(id)
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

//end of Cutting



//---------------sablon-----------------
router.get('/sablon', function(req, res, next) {
  res.render('index', { title: 'Data Produksi - sablon', page:'data-produksi/sablon/sablon.ejs'});
});

router.post('/sablon',async function(req, res, next) {
  try{
     let dataResponse = await controllerDataProduksi.getSablonAll()
     var data =""
     if (dataResponse.success) {
        data = await util.convertObjectStructure(dataResponse,'DD/MM/YYYY')
        res.status(200).json(data);
     } else {
        res.status(400).json(data);
     }
   }catch(err){
     res.status(500).json(err);
   }
})

router.get('/sablon/detil/:id', function(req, res, next) {
  var id = req.params.id;
  res.render('index', { title: 'Detail Sablon', page:'data-produksi/sablon/sablon_detil.ejs', data:JSON.stringify(id)});
});

router.post('/sablon/detil/:id',async function(req, res, next) {
   try{
      var id = req.params.id;
      let dataResponse = await controllerDataProduksi.getSablonById(id)
      var data =""
      if (dataResponse.success) {
         data = await util.convertObjectStructure(dataResponse, 'DD/MM/YYYY')
         res.status(200).json(data);
      } else {
         res.status(400).json(data);
      }
  }catch(err){
       res.status(500).json(err);
  }
});


router.get('/sablon/tambah', function(req, res, next) {
    res.render('index', { title: 'Tambah Sablon', page:'data-produksi/sablon/sablon_tambah.ejs'});
});

router.post('/sablon/tambah', async function(req, res, next) {
  try{
     var data = req.body.data
     let dataManipulation = await util.manipulateData(data)
     let dataResponse = await controllerDataProduksi.insertSablon(dataManipulation)
     if (dataResponse.success) {
        res.status(200).json(dataResponse);
     } else {
        res.status(400).json();
     }
  }catch(err){
     res.status(500).json(err);
  }
});

router.get('/sablon/edit/:id', function(req, res, next) {
    var id = req.params.id;
    res.render('index', { title: 'Edit Sablon', page:'data-produksi/sablon/sablon_edit.ejs', data:JSON.stringify(id)});
});

router.post('/sablon/edit/:id', async function(req, res, next) {
  try{
     var id = req.params.id;
     let dataResponse = await controllerDataProduksi.getSablonById(id)   
     var data =""
     if (dataResponse.success) {
        data = await util.convertObjectStructure(dataResponse, 'YYYY-MM-DD')
        res.status(200).json(data);
     } else {
        res.status(400).json(data);
     }
  } catch(err){
     res.status(500).json(err);
  }
});

router.post('/sablon/edit', async function(req, res, next) {
  try {
     var data = req.body.data
     let dataResponse = await controllerDataProduksi.updateSablon(data)
     if (dataResponse.success) {
        res.status(200).json(dataResponse);
     } else {
        res.status(400).json();
     }
  } catch (err) {
     res.status(500).json(err);
  }
});

router.post('/sablon/hapus/:id', async function(req, res, next) {
  try{
     var id = req.params.id
     let dataResponse = await controllerDataProduksi.deleteSablon(id)
     if (dataResponse.success ) {
        res.status(200).json(dataResponse);
     } else {
        res.status(400).json();
     }
  } catch(err){
     res.status(500).json(err);
  }
});
//end of Sablon




//---------------jahit-----------------
router.get('/jahit', function(req, res, next) {
   res.render('index', { title: 'Data Produksi - Jahit', page:'data-produksi/jahit/jahit.ejs'});
 });
 
 router.post('/jahit',async function(req, res, next) {
   try{
      let dataResponse = await controllerDataProduksi.getJahitAll()
      var data =""
      if (dataResponse.success) {
         data = await util.convertObjectStructureJahit(dataResponse,'DD/MM/YYYY')
         console.log(data)
         res.status(200).json(data);
      } else {
         res.status(400).json(data);
      }
    }catch(err){
      res.status(500).json(err);
    }
 })
 
 router.get('/jahit/detil/:id', function(req, res, next) {
   var id = req.params.id;
   res.render('index', { title: 'Detail Jahit', page:'data-produksi/jahit/jahit_detil.ejs', data:JSON.stringify(id)});
 });
 
 router.post('/jahit/detil/:id',async function(req, res, next) {
    try{
       var id = req.params.id;
       let dataResponse = await controllerDataProduksi.getJahitById(id)
       var data =""
       if (dataResponse.success) {
          data = await util.convertObjectStructureJahit(dataResponse, 'DD/MM/YYYY')
          res.status(200).json(data);
       } else {
          res.status(400).json(data);
       }
   }catch(err){
        res.status(500).json(err);
   }
 });
 
 
 router.get('/jahit/tambah', function(req, res, next) {
     res.render('index', { title: 'Tambah Jahit', page:'data-produksi/jahit/jahit_tambah.ejs'});
 });
 
 router.post('/jahit/tambah', async function(req, res, next) {
   try{
      var data = req.body.data
      let dataManipulation = await util.manipulateData(data)
      let dataResponse = await controllerDataProduksi.insertJahit(dataManipulation)
      if (dataResponse.success) {
         res.status(200).json(dataResponse);
      } else {
         res.status(400).json();
      }
   }catch(err){
      res.status(500).json(err);
   }
 });
 
 router.get('/jahit/edit/:id', function(req, res, next) {
     var id = req.params.id;
     res.render('index', { title: 'Edit Jahit', page:'data-produksi/jahit/jahit_edit.ejs', data:JSON.stringify(id)});
 });
 
 router.post('/jahit/edit/:id', async function(req, res, next) {
   try{
      var id = req.params.id;
      let dataResponse = await controllerDataProduksi.getJahitById(id)   
      var data =""
      if (dataResponse.success) {
         data = await util.convertObjectStructureJahit(dataResponse, 'YYYY-MM-DD')
         res.status(200).json(data);
      } else {
         res.status(400).json(data);
      }
   } catch(err){
      res.status(500).json(err);
   }
 });
 
 router.post('/jahit/edit', async function(req, res, next) {
   try {
      var data = req.body.data
      let dataResponse = await controllerDataProduksi.updateJahit(data)
      if (dataResponse.success) {
         res.status(200).json(dataResponse);
      } else {
         res.status(400).json();
      }
   } catch (err) {
      res.status(500).json(err);
   }
 });
 
 router.post('/jahit/hapus/:id', async function(req, res, next) {
   try{
      var id = req.params.id
      let dataResponse = await controllerDataProduksi.deleteJahit(id)
      if (dataResponse.success ) {
         res.status(200).json(dataResponse);
      } else {
         res.status(400).json();
      }
   } catch(err){
      res.status(500).json(err);
   }
 });
 //end of jahit


//---------------barangjadi-----------------
router.get('/barangjadi', function(req, res, next) {
  res.render('index', { title: 'Data Produksi - barang jadi', page:'data-produksi/barangjadi/barangjadi.ejs'});
});

router.post('/barangjadi',async function(req, res, next) {
   try{
      let dataResponse = await controllerDataProduksi.getBarangJadiAll()
      var data =""
      if (dataResponse.success) {
         data = await util.convertObjectStructureBarangJadi(dataResponse,'DD/MM/YYYY')
         console.log(data)
         res.status(200).json(data);
      } else {
         res.status(400).json(data);
      }
    }catch(err){
      res.status(500).json(err);
    }
 })
 
 router.get('/barangjadi/detil/:id', function(req, res, next) {
   var id = req.params.id;
   res.render('index', { title: 'Detail Barang Jadi', page:'data-produksi/barangjadi/barangjadi_detil.ejs', data:JSON.stringify(id)});
 });
 
 router.post('/barangjadi/detil/:id',async function(req, res, next) {
    try{
       var id = req.params.id;
       let dataResponse = await controllerDataProduksi.getBarangJadiById(id)
       var data =""
       if (dataResponse.success) {
          data = await util.convertObjectStructureBarangJadi(dataResponse, 'DD/MM/YYYY')
          res.status(200).json(data);
       } else {
          res.status(400).json(data);
       }
   }catch(err){
        res.status(500).json(err);
   }
 });
 
 
 router.get('/barangjadi/tambah', function(req, res, next) {
     res.render('index', { title: 'Tambah Barang Jadi', page:'data-produksi/barangjadi/barangjadi_tambah.ejs'});
 });
 
 router.post('/barangjadi/tambah', async function(req, res, next) {
   try{
      var data = req.body.data
      let dataManipulation = await util.manipulateData(data)
      let dataResponse = await controllerDataProduksi.insertBarangJadi(dataManipulation)
      if (dataResponse.success) {
         res.status(200).json(dataResponse);
      } else {
         res.status(400).json();
      }
   }catch(err){
      res.status(500).json(err);
   }
 });
 
 router.get('/barangjadi/edit/:id', function(req, res, next) {
     var id = req.params.id;
     res.render('index', { title: 'Edit Barang Jadi', page:'data-produksi/barangjadi/barangjadi_edit.ejs', data:JSON.stringify(id)});
 });
 
 router.post('/barangjadi/edit/:id', async function(req, res, next) {
   try{
      var id = req.params.id;
      let dataResponse = await controllerDataProduksi.getBarangJadiById(id)   
      var data =""
      if (dataResponse.success) {
         data = await util.convertObjectStructureBarangJadi(dataResponse, 'YYYY-MM-DD')
         res.status(200).json(data);
      } else {
         res.status(400).json(data);
      }
   } catch(err){
      res.status(500).json(err);
   }
 });
 
 router.post('/barangjadi/edit', async function(req, res, next) {
   try {
      var data = req.body.data
      let dataResponse = await controllerDataProduksi.updateBarangJadi(data)
      if (dataResponse.success) {
         res.status(200).json(dataResponse);
      } else {
         res.status(400).json();
      }
   } catch (err) {
      res.status(500).json(err);
   }
 });
 
 router.post('/barangjadi/hapus/:id', async function(req, res, next) {
   try{
      var id = req.params.id
      let dataResponse = await controllerDataProduksi.deleteBarangJadi(id)
      if (dataResponse.success ) {
         res.status(200).json(dataResponse);
      } else {
         res.status(400).json();
      }
   } catch(err){
      res.status(500).json(err);
   }
 });

 router.post('/penambahanbiaya',async function(req, res, next) {
   try{
      var data = req.body.data
      let dataResponse = await controllerOthers.getAddingPrices(data)
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
 //end of barang jadi


 //home
 router.post('/beranda',async function(req, res, next) {
   try{
      let dataResponse = await controllerDataProduksi.getCountDataProduksi()
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
 //end of home


module.exports = router;
