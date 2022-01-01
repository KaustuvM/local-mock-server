'use strict'
const process = require('../src/listeners/processListener.js')
const application = require('../app.js')
const express = require('express')
const app = module.exports = express()
const request = require('supertest')

describe('Loading server', () => {
    beforeEach(() => {
        process.listen()
        application.run(app)
    })

    afterEach(() => {
        application.close()
    })

    it('Verifying /health', function testSlash(done) {
        request(global.server)
            .get('/health')
            .expect(200, { status: 'UP' }, done)
    })

})
