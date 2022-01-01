/*
 * Class - HealthController
 */
'use strict'
const winston = require('../config/winston')
const HealthService = require('../services/healthService')

class HealthController {
    static validateHealthRequest(req, res, next) {
        winston.info('HealthController.validateHealthRequest called...')
        next('route')
    }
    static getHealth(req, res, next) {
        winston.info('HealthController.getHealth called...')
        res.status(200).send(HealthService.up())
    }
}

module.exports = HealthController
