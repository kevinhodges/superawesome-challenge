const processor = require('../../../lib/processor')
const sinon = require('sinon')

describe('testing processor', () => {
  afterEach(() => {
    console.log.restore()
  })

  beforeEach(() => {
    sinon.spy(console, 'log')
  })

  describe('execute()', () => {
    it('does all the things', async () => {
      const expectedOne = 'ab,ba\n'
      const expectedTwo = 'abc,bca\n'
      await processor.execute('./test/unit/data.txt')
      expect(console.log).to.have.been.calledTwice()
      expect(console.log.firstCall.args[0]).to.equal(expectedOne)
      expect(console.log.secondCall.args[0]).to.equal(expectedTwo)
    })
  })

  describe('processAndOutputData()', () => {
    it('with the given data, processes it and outputs the results to the console', async () => {
      const mock = ['ab', 'ba', 'cb', 'abc', 'def', 'bca', 'absh', 'p0oi']
      const expectedOne = 'ab,ba\n'
      const expectedTwo = 'abc,bca\n'
      processor.processAndOutputData(mock)
      expect(console.log).to.have.been.calledTwice()
      expect(console.log.firstCall.args[0]).to.equal(expectedOne)
      expect(console.log.secondCall.args[0]).to.equal(expectedTwo)
    })
  })
})
