var express = require('express');
var router = express.Router();

const controllerPengeluaran= require('../controllers/controllerPengeluaran.js')
const util = require('../configs/utils.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('/pengeluaran/pembelian')
});


/* Pembelian */
router.get('/pembelian', function(req, res, next) {
  res.render('index', { title: 'Pengeluaran - Pembelian', page:'pengeluaran/pembelian.ejs'});
});

router.post('/pembelian',async function(req, res, next) {
  try{
     let dataResponse = await controllerPengeluaran.getPembelianAll()
     console.log(dataResponse)
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


router.get('/pembelian/detil/:id', function(req, res, next) {
  var id = req.params.id;
  res.render('index', { title: 'Detail Pembelian', page:'pengeluaran/pembelian_detil.ejs', data:JSON.stringify(id)});
});


router.post('/pembelian/detil/:id',async function(req, res, next) {
  try{
     var id = req.params.id;
     let dataResponse = await controllerPengeluaran.getPembelianById(id)
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
});


router.get('/pembelian/edit/:id', async function(req, res, next) {
  var id = req.params.id;
  res.render('index', { title: 'Edit Pembelian', page:'pengeluaran/pembelian_edit.ejs', data:JSON.stringify(id)});
});

router.post('/pembelian/edit/:id', async function(req, res, next) {
  try{
     var id = req.params.id;
     let dataResponse = await controllerPengeluaran.getPembelianById(id)   
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

router.post('/pembelian/edit', async function(req, res, next) {
  try {
     var data = req.body.data
     let dataResponse = await controllerPengeluaran.updatePembelian(data)
     if (dataResponse.success) {
        res.status(200).json(dataResponse);
     } else {
        res.status(400).json();
     }
  } catch (err) {
     res.status(500).json(err);
  }
});


router.get('/pembelian/tambah', function(req, res, next) {
    res.render('index', { title: 'Tambah Pembelian', page:'pengeluaran/pembelian_tambah.ejs'});
});

router.post('/pembelian/tambah', async function(req, res, next) {
  try{
     var data = req.body.data
     let dataResponse = await controllerPengeluaran.insertPembelian(data)
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

router.post('/pembelian/hapus/:id', async function(req, res, next) {
  try{
     var id = req.params.id
     let dataResponse = await controllerPengeluaran.deletePembelian(id)
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


/* End of Pembelian */





/* Beban */
router.get('/beban', function(req, res, next) {
  res.render('index', { title: 'Pengeluaran - Beban', page:'pengeluaran/beban.ejs'});
});


router.post('/beban',async function(req, res, next) {
   try{
      let dataResponse = await controllerPengeluaran.getBebanAll()
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

   router.get('/beban/detil/:id', function(req, res, next) {
      var id = req.params.id;
      res.render('index', { title: 'Detail beban', page:'pengeluaran/beban_detil.ejs', data:JSON.stringify(id)});
    });
    
    
    router.post('/beban/detil/:id',async function(req, res, next) {
      try{
         var id = req.params.id;
         let dataResponse = await controllerPengeluaran.getBebanById(id)
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
    });
    

    router.get('/beban/edit/:id', async function(req, res, next) {
      var id = req.params.id;
      res.render('index', { title: 'Edit Beban', page:'pengeluaran/beban_edit.ejs', data:JSON.stringify(id)});
    });
    
    router.post('/beban/edit/:id', async function(req, res, next) {
      try{
         var id = req.params.id;
         let dataResponse = await controllerPengeluaran.getBebanById(id)   
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
    
    router.post('/beban/edit', async function(req, res, next) {
      try {
         var data = req.body.data
         let dataResponse = await controllerPengeluaran.updateBeban(data)
         if (dataResponse.success) {
            res.status(200).json(dataResponse);
         } else {
            res.status(400).json();
         }
      } catch (err) {
         res.status(500).json(err);
      }
    });


router.get('/beban/tambah', function(req, res, next) {
    res.render('index', { title: 'Tambah Beban', page:'pengeluaran/beban_tambah.ejs'});
});

router.post('/beban/tambah', async function(req, res, next) {
   try{
      var data = req.body.data
      let dataResponse = await controllerPengeluaran.insertBeban(data)
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

 router.post('/beban/hapus/:id', async function(req, res, next) {
   try{
      var id = req.params.id
      let dataResponse = await controllerPengeluaran.deleteBeban(id)
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

//End of Beban



//Pembayaran
router.get('/pembayaran', function(req, res, next) {
  res.render('index', { title: 'Pengeluaran - pembayaran', page:'pengeluaran/pembayaran.ejs'});
});

router.post('/pembayaran',async function(req, res, next) {
   try{
      let dataResponse = await controllerPengeluaran.getPembayaranAll()
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

router.get('/pembayaran/detil/:id', function(req, res, next) {
   var id = req.params.id;
   res.render('index', { title: 'Detail pembayaran', page:'pengeluaran/pembayaran_detil.ejs', data:JSON.stringify(id)});
 });
 
 
 router.post('/pembayaran/detil/:id',async function(req, res, next) {
   try{
      var id = req.params.id;
      let dataResponse = await controllerPengeluaran.getPembayaranById(id)
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
 });

 router.get('/pembayaran/edit/:id', async function(req, res, next) {
   var id = req.params.id;
   res.render('index', { title: 'Edit pembayaran', page:'pengeluaran/pembayaran_edit.ejs', data:JSON.stringify(id)});
 });
 
 router.post('/pembayaran/edit/:id', async function(req, res, next) {
   try{
      var id = req.params.id;
      let dataResponse = await controllerPengeluaran.getPembayaranById(id)   
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
 
 router.post('/pembayaran/edit', async function(req, res, next) {
   try {
      var data = req.body.data
      let dataResponse = await controllerPengeluaran.updatePembayaran(data)
      if (dataResponse.success) {
         res.status(200).json(dataResponse);
      } else {
         res.status(400).json();
      }
   } catch (err) {
      res.status(500).json(err);
   }
 });

router.get('/pembayaran/tambah', function(req, res, next) {
   res.render('index', { title: 'Tambah Pembayaran', page:'pengeluaran/pembayaran_tambah.ejs'});
});

router.post('/pembayaran/tambah', async function(req, res, next) {
  try{
     var data = req.body.data
     let dataResponse = await controllerPengeluaran.insertPembayaran(data)
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

router.post('/pembayaran/hapus/:id', async function(req, res, next) {
   try{
      var id = req.params.id
      let dataResponse = await controllerPengeluaran.deletePembayaran(id)
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
//End of Pembayaran


/* csr */
router.get('/csr', function(req, res, next) {
   res.render('index', { title: 'Pengeluaran - csr', page:'pengeluaran/csr.ejs'});
 });
 
 router.post('/csr',async function(req, res, next) {
   try{
      let dataResponse = await controllerPengeluaran.getCsrAll()
      console.log(dataResponse)
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
 
 
 router.get('/csr/detil/:id', function(req, res, next) {
   var id = req.params.id;
   res.render('index', { title: 'Detail csr', page:'pengeluaran/csr_detil.ejs', data:JSON.stringify(id)});
 });
 
 
 router.post('/csr/detil/:id',async function(req, res, next) {
   try{
      var id = req.params.id;
      let dataResponse = await controllerPengeluaran.getCsrById(id)
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
 });
 
 
 router.get('/csr/edit/:id', async function(req, res, next) {
   var id = req.params.id;
   res.render('index', { title: 'Edit csr', page:'pengeluaran/csr_edit.ejs', data:JSON.stringify(id)});
 });
 
 router.post('/csr/edit/:id', async function(req, res, next) {
   try{
      var id = req.params.id;
      let dataResponse = await controllerPengeluaran.getCsrById(id)   
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
 
 router.post('/csr/edit', async function(req, res, next) {
   try {
      var data = req.body.data
      let dataResponse = await controllerPengeluaran.updateCsr(data)
      if (dataResponse.success) {
         res.status(200).json(dataResponse);
      } else {
         res.status(400).json();
      }
   } catch (err) {
      res.status(500).json(err);
   }
 });
 
 
 router.get('/csr/tambah', function(req, res, next) {
     res.render('index', { title: 'Tambah csr', page:'pengeluaran/csr_tambah.ejs'});
 });
 
 router.post('/csr/tambah', async function(req, res, next) {
   try{
      var data = req.body.data
      let dataResponse = await controllerPengeluaran.insertCsr(data)
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
 
 router.post('/csr/hapus/:id', async function(req, res, next) {
   try{
      var id = req.params.id
      let dataResponse = await controllerPengeluaran.deleteCsr(id)
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
 
 
 /* End of csr */
module.exports = router;
