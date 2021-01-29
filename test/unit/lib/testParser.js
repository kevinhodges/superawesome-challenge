const parser = require('../../../lib/parser')
const sandbox = require('sinon').createSandbox()

describe('testing parser', () => {

  afterEach(() => {
    sandbox.restore()
  })

  describe('execute()', () => {
    it('returns the result having called all three parsing function with correct values', () => {
      const mock = ['A', 'b', 'b', '.']
      const expected = ['a', 'b']
      const forceLowerCaseResult = ['a', 'b', 'b', '.']
      const forceLowerCaseStub = sandbox.stub(parser, 'forceLowerCase').returns(forceLowerCaseResult)
      const removeDuplicatesResult = ['a', 'b', '.']
      const removeDuplciatesStub = sandbox.stub(parser, 'removeDuplicates').returns(removeDuplicatesResult)
      const removeInvalidsStub = sandbox.stub(parser, 'removeInvalids').returns(expected)

      expect(parser.execute(mock)).to.deep.equal(expected)
      expect(forceLowerCaseStub).to.have.been.calledOnce().and.to.have.been.calledWith(mock)
      expect(removeDuplciatesStub).to.have.been.calledOnce().and.to.have.been.calledWith(forceLowerCaseResult)
      expect(removeInvalidsStub).to.have.been.calledOnce().and.to.have.been.calledWith(removeDuplicatesResult)
    })
  })

  describe('forceLowerCase()', () => {
    it('returns the passed array with all values in lowercase', () => {
      const mock = ['A', 'b']
      const expected = ['a', 'b']
      expect(parser.forceLowerCase(mock)).to.deep.equal(expected)
    })
  })

  describe('removeDuplicates()', () => {
    it('returns the passed array with any duplicates removed', () => {
      const mock = ['a', 'a', 'b']
      const expected = ['a', 'b']
      expect(parser.removeDuplicates(mock)).to.deep.equal(expected)
    })
  })

  describe('removeInvalids()', () => {
    it('returns the passed array with any values that aren\'t stricly a-zA-Z removed', () => {
      const mock = ['a', '.', '1', 'b', '-']
      const expected = ['a', 'b']
      expect(parser.removeInvalids(mock)).to.deep.equal(expected)
    })
  })

})