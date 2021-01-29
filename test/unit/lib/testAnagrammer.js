const anagrammer = require('../../../lib/anagrammer')
const sandbox = require('sinon').createSandbox()

describe('testing anagrammer', () => {

  afterEach(() => {
    sandbox.restore()
  })

  describe('process()', () => {
    it('returns the result having called both functions with correct values', () => {
      const mock = ['ab', 'ba', 'bc', 'cd']
      const expected = [['ab', 'ba']]
      const groupAnagramsResult = { ab: [ 'ab', 'ba' ], bc: [ 'bc' ], cd: [ 'cd' ] }
      const groupAnagramsStub = sandbox.stub(anagrammer, 'groupAnagrams').returns(groupAnagramsResult)
      const removeInvalidResultsAndFlattenStub = sandbox.stub(anagrammer, 'removeInvalidResultsAndFlatten').returns(expected)

      expect(anagrammer.process(mock)).to.deep.equal(expected)
      expect(groupAnagramsStub).to.have.been.calledOnce().and.to.have.been.calledWith(mock)
      expect(removeInvalidResultsAndFlattenStub).to.have.been.calledOnce().and.to.have.been.calledWith(groupAnagramsResult)
    })
  })

  describe('groupAnagrams()', () => {
    it('returns all array values mapped to the correct object key', () => {
      const mock = ['ab', 'ba', 'bc', 'cd']
      const expected = { ab: [ 'ab', 'ba' ], bc: [ 'bc' ], cd: [ 'cd' ] }
      expect(anagrammer.groupAnagrams(mock)).to.deep.equal(expected)
    })
  })

  describe('removeInvalidResultsAndFlatten()', () => {
    it('returns the passed array with any duplicates removed', () => {
      const mock = { ab: [ 'ab', 'ba' ], bc: [ 'bc' ], cd: [ 'cd' ] }
      const expected = [['ab', 'ba']]
      expect(anagrammer.removeInvalidResultsAndFlatten(mock)).to.deep.equal(expected)
    })
  })

})