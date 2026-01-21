require('dotenv').config()
const logger = require('../utils/logger')
const PORT = process.env.PORT || 3003
const MONGODB_URI = process.env.NODE_ENV === 'test'
    ? process.env.TEST_MONGODB_URI
    : process.env.MONGODB_URI
logger.info("Current Mode:",process.env.NODE_ENV)
module.exports = { MONGODB_URI, PORT }
