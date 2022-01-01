/*
 * Class - FileController
 */
const winston = require('../config/winston')
const fileService = require('../services/fileService')

class FileController {

    /*
     * fileValidateGetRequest
     */
    static async fileValidateGetRequest(req, res, next) {
        winston.info('fileController.fileValidateGetRequest called...')
        if ((req.params != null) && (req.params.id != null))
        {
            next('route')
        } else {
            return res.status(412).send({
                'timestamp': new Date().toUTCString(),
                'status': 412,
                'error': 'Precondition Failed',
                'message': 'No file name to load'
            })
        }

    }


    /*
     * fileGetOperation
     */
    static async fileGetOperation(req, res, next) {
        winston.info('fileController.fileGetOperation called...')
        /*
         * Call service class to get the job done and return the result.
         * "OK" is just a sample.
         */
        return  fileService.getResponse(req, res)
    }
}

module.exports = FileController