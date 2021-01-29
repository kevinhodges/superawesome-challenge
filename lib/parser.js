const parser = module.exports = {}

parser.execute = (words) => {
  words = parser.forceLowerCase(words)
  words = parser.removeDuplicates(words)
  return parser.removeInvalids(words)
}

parser.forceLowerCase = (words) => {
  return words.map(word => word.toLowerCase())
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

parser.removeInvalids = (words) => {
  return words.filter(word => {
    return /^[a-zA-Z]+$/.test(word)
  })
}
