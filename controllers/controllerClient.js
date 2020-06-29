const modelClient= require('../models/modelClient.js');
const util = require('../configs/utils.js');

async function getClientAll() {
    try {
        const rows = await modelClient.getClientAll()

        if ( rows.length >= 1 ) {
            return util.responseSuccess(rows)
        } else if ( rows.length == 0 ) {
            return util.responseNotFound()
        } else {
            return util.responseFailedGet()
        }

    } catch(err) {
        console.log(err)
        return util.responseErrorServer(err)
    }
}


module.exports.getClientAll = getClientAll;
