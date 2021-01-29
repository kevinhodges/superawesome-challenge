const anagrammer = module.exports = {}

anagrammer.process = (words) => {
  // group anagrams by sorting each word
  // alphabetically and using that as a key
  const wordMap = anagrammer.groupAnagrams(words)
  // remove words with no anagrams
  return anagrammer.removeInvalidResultsAndFlatten(wordMap)
}

anagrammer.groupAnagrams = (words) => {
  const wordMap = {}
  words.forEach(word => {
    const key = word.split('').sort().join('')
    if (!wordMap[key]) {
      wordMap[key] = []
    }
    wordMap[key].push(word)
  })
  return wordMap
}

anagrammer.removeInvalidResultsAndFlatten = (wordMap) => {
  const results = []
  for (const property in wordMap) {
    if (wordMap[property].length >= 2) {
      results.push(wordMap[property])
    }
  }
  return results
}
