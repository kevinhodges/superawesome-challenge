const fileValidator = require('../../../lib/fileValidator')
const path = require('path')
const fs = require('fs')
const sinon = require('sinon')
const sandbox = sinon.createSandbox()

let processExitStub, fsExistsSyncStub

describe('testing fileValidator', () => {
  afterEach(() => {
    sandbox.restore()
    console.error.restore()
  })

  beforeEach(() => {
    fsExistsSyncStub = sandbox.stub(fs, 'existsSync')
    // stub process.exit to avoid bailing the tests
    processExitStub = sandbox.stub(process, 'exit')
    sinon.spy(console, 'error')
  })

  describe('run()', () => {
    it('kills the process when the filepath isn\'t valid', () => {
      const expected = 'File path couldn\'t be resolved'
      fsExistsSyncStub.returns(false)
      fileValidator.run('./test/unit/missingFile.txt')
      expect(console.error).to.have.been.calledOnce()
      expect(console.error.firstCall.args[0]).to.equal(expected)
    })

    it('kills the process when the file extension isn\'t valid', () => {
      const expected = 'File extension invalid'
      fsExistsSyncStub.returns(true)
      sandbox.stub(path, 'extname').returns('.foo')
      fileValidator.run('./test/unit/data.foo')
      expect(console.error).to.have.been.calledOnce()
      expect(console.error.firstCall.args[0]).to.equal(expected)
    })
  })
})
