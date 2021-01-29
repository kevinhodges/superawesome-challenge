const parser = module.exports = {}

// we could make this a class and chain these calls together which would be tidier

parser.execute = (words) => {
  // force lowercase
  words = parser.forceLowerCase(words)
  // console.log('all lcase', words)

  // remove duplciates
  words = parser.removeDuplicates(words)
  // console.log('with dups removed', words)

  // remove non alpha values
  words = parser.removeInvalid(words)
  // console.log('with invalid removed', words)
  
  return words
}

parser.forceLowerCase = (words) => {
  return words.map(word => word.toLowerCase())
}

parser.removeInvalid = (words) => {
  return words.filter(word => {
    return /^[a-zA-Z]+$/.test(word)    
  })
}

parser.removeDuplicates = (words) => {
  var uniqueWords = []
  words.forEach(word => {
    if (uniqueWords.indexOf(word) === -1) {
      uniqueWords.push(word)
    }
  })
  return uniqueWords
}