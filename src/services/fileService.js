/*
 * Class - FileService
 */
const winston = require('../config/winston')
const fs = require('fs')
const directoryExists = require('directory-exists')
const fileExists = require('file-exists')
const srcPath = fs.realpathSync('.')
const validator = require('validator')

class FileService {
/* Write all your service/business logic here. */
    static getResponse(req, res) {
        var fileName = req.params.id

        // remove file extension
        fileName = fileName.split('.')[0]
        winston.info(fileName)
        return FileService.processFile(req, res, fileName)
        // res.status(200).send({'status': 'OK'})
    }

    static processFile(req, res, filename) {
        let dirPath = `${srcPath}/response_files`

        if (directoryExists.sync(dirPath)) {
            let filePath = `${dirPath}/${filename}.json`
            if(fileExists.sync(filePath)) {
                try {
                    let json = fs.readFileSync(filePath, 'utf8')
                    if (validator.isJSON(json) == false) {
                        // precondition failed, invalid json
                        winston.error(`Invalid json.`)
                        return res.status(412).send({
                            'timestamp': new Date().toUTCString(),
                            'status': 412,
                            'error': 'Precondition Failed',
                            'message': `Invalid json.`
                        })
                    }
                    return res.status(200).send(json)
                } catch (err) {
                    // precondition failed, error reading file
                    winston.error(`Error reading file - ${filePath}`)
                    return res.status(412).send({
                        'timestamp': new Date().toUTCString(),
                        'status': 412,
                        'error': 'Precondition Failed',
                        'message': `Error reading file - ${filePath}`
                    })
                }
            } else {
                // precondition failed, file does not exist
                winston.error(`File - ${filePath} does not exist.`)
                return res.status(412).send({
                    'timestamp': new Date().toUTCString(),
                    'status': 412,
                    'error': 'Precondition Failed',
                    'message': `File - ${filePath} does not exist.`
                })
            }

        } else {
            // precondition failed, response_files directory does not exist
            winston.error(`Directory - ${dirPath} does not exist.`)
            return res.status(412).send({
                'timestamp': new Date().toUTCString(),
                'status': 412,
                'error': 'Precondition Failed',
                'message': `Directory - ${dirPath} does not exist.`
            })
        }
    }
}

module.exports = FileService