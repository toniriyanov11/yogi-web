var express = require('express');
var router = express.Router();

const controllerMaster = require('../controllers/controllerMaster.js')



router.get('/',async function(req, res, next) {
 
})

/* GET home page. */
router.get('/client',async function(req, res, next) {
    let dataResponse = await controllerMaster.getClientAll()
    if (dataResponse.success) {
       for(let i=0; i<=dataResponse.data[0].length-1; i++){
           dataResponse.data[i].tgl_rekam = moment(dataResponse.data[i].tgl_rekam).format('DD/MM/YYYY')
       }
       var data = dataResponse.data
       res.status(200).json(data);
    } else {
       res.status(500).json();
    }
 
})

router.get('/payment-status',async function(req, res, next) {

    let dataResponse = await controllerMaster.getPaymentStatus()
    if (dataResponse.success ) {
       for(let i=0; i<=dataResponse.data[0].length-1; i++){
           dataResponse.data[i].tgl_rekam = moment(dataResponse.data[i].tgl_rekam).format('DD/MM/YYYY')
       }
       var data = dataResponse.data
       res.status(200).json(data);
    } else {
       res.status(500).json();
    }
 
})

router.get('/input-type',async function(req, res, next) {

    let dataResponse = await controllerMaster.getInputType()
    if (dataResponse.success) {
       for(let i=0; i<=dataResponse.data[0].length-1; i++){
           dataResponse.data[i].tgl_rekam = moment(dataResponse.data[i].tgl_rekam).format('DD/MM/YYYY')
       }
       var data = dataResponse.data
       res.status(200).json(data);
    } else {
       res.status(400).json();
    }
 
})

module.exports = router;