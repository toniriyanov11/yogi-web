var express = require('express');
var router = express.Router();

const controllerMaster = require('../controllers/controllerMaster.js')



router.get('/',async function(req, res, next) {
 
})

/* GET home page. */
router.get('/client',async function(req, res, next) {

    let dataResponse = await controllerMaster.getClientAll()
    if (dataResponse.ret == '0') {
       for(let i=0; i<=dataResponse.data[0].length-1; i++){
           dataResponse.data[i].tgl_rekam = moment(dataResponse.data[i].tgl_rekam).format('DD/MM/YYYY')
       }
       var data = dataResponse.data
       res.status(200).json(data);
    } else {
       var data = null
       res.status(500).json(data);
    }
 
})

router.get('/payment-status',async function(req, res, next) {

    let dataResponse = await controllerMaster.getPaymentStatus()
    if (dataResponse.ret == '0') {
       for(let i=0; i<=dataResponse.data[0].length-1; i++){
           dataResponse.data[i].tgl_rekam = moment(dataResponse.data[i].tgl_rekam).format('DD/MM/YYYY')
       }
       var data = dataResponse.data
       res.status(200).json(data);
    } else {
       var data = null
       res.status(500).json(data);
    }
 
})

router.get('/input-type',async function(req, res, next) {

    let dataResponse = await controllerMaster.getInputType()
    if (dataResponse.ret == '0') {
       for(let i=0; i<=dataResponse.data[0].length-1; i++){
           dataResponse.data[i].tgl_rekam = moment(dataResponse.data[i].tgl_rekam).format('DD/MM/YYYY')
       }
       var data = dataResponse.data
       res.status(200).json(data);
    } else {
       var data = null
       res.status(400).json(data);
    }
 
})

module.exports = router;