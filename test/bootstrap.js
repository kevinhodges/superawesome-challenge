const chai = require('chai')
chai.use(require('dirty-chai'))
chai.use(require('sinon-chai'))
chai.config.includeStack = true
global.expect = chai.expect