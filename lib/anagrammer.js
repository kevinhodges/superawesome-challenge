const anagrammer = module.exports = {}

anagrammer.process = (words) => {
  // group anagrams by sorting each word
  // alphabetically and using that as a key
  const wordMap = {}
  words.forEach(word => {
    const key = word.split('').sort().join('')
    if (!wordMap[key]) {
      wordMap[key] = []
    }
    wordMap[key].push(word)
  })

  const results = []
  // only keep entries if there's 2 or more versions
  for (const property in wordMap) {
    if (wordMap[property].length >= 2) {
      results.push(wordMap[property])
    }
  }

  return results
}
