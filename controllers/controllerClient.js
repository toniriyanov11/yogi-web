const modelClient= require('../models/modelClient.js');


async function getClientAll() {
    try {
        let rows = []
        rows = await modelClient.getClientAll()

        if ( rows.length >= 1 ) {
            var response = { ret: '0', msg: 'success', data:rows };
        } else if ( rows.length == 0 ) {
            var response = { ret: '-1', msg: 'data not found' };
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
