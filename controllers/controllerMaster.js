const modelClient= require('../models/modelClient.js');
const modelMaster= require('../models/modelMaster.js');


async function getClientAll() {
    try {
        const rows = await modelClient.getClientAll()

        if ( rows.length >= 1 ) {
            var response = { ret: '0', msg: 'success', data:rows };
        } else if ( rows.length == 0 ) {
            var response = { ret: '0', msg: 'data not found' };
        } else {
            var response = { ret: '-1', msg: 'paramter is required' };
        }
  
        return response

        
    } catch(err) {

        console.log(err)
        var response = { ret: '-1', msg: 'server error, please try again!', err:err }

        return response

    }
}

module.exports.getClientAll = getClientAll;

async function getPaymentStatus() {
    try {
        const rows = await modelMaster.getPaymentStatus()

        if ( rows.length >= 1 ) {
            var response = { ret: '0', msg: 'success', data:rows };
        } else if ( rows.length == 0 ) {
            var response = { ret: '0', msg: 'data not found' };
        } else {
            var response = { ret: '-1', msg: 'paramter is required' };
        }
  
        return response

        
    } catch(err) {

        console.log(err)
        var response = { ret: '-1', msg: 'server error, please try again!', err:err }

        return response

    }
}

module.exports.getPaymentStatus = getPaymentStatus;


async function getInputType() {
    try {
        const rows = await modelMaster.getInputType()

        if ( rows.length >= 1 ) {
            var response = { ret: '0', msg: 'success', data:rows };
        } else if ( rows.length == 0 ) {
            var response = { ret: '0', msg: 'data not found' };
        } else {
            var response = { ret: '-1', msg: 'paramter is required' };
        }
  
        return response

        
    } catch(err) {

        console.log(err)
        var response = { ret: '-1', msg: 'server error, please try again!', err:err }

        return response

    }
}

module.exports.getInputType = getInputType;
