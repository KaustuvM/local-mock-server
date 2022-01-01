/*
 * Class - Application
 */
'use strict'
const winston = require('./src/config/winston')
const Router = require('./src/routers/router.js')
const Middleware = require('./src/middlewares/middleware.js')

/*
 * Class - Application
 */

const HTTP_PORT = 3000

class Application {

    static run(app) {
        // Mount Middlewares
        Middleware.initialize(app)

        // Mount Routes
        Router.mountRoutes(app)

        // Create HTTP server
        global.server = app.listen(process.env.PORT || 3000, () => {
            winston.info(`HTTP server started at port ${process.env.PORT || 3000}`)
        })
    }

    static close() {
        global.server.close()
    }
}

module.exports = Application
