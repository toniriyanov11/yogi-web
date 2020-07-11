const modelOthers = require('../models/modelOthers.js');
const util = require('../configs/utils.js');


async function getMaterials(id) {
    try {
        const rows = await modelOthers.getMaterials(id)

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

module.exports = {
    getMaterials,
}