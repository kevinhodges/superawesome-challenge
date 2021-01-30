const processor = module.exports = {}

const fs = require('fs')
const readline = require('readline')
const parser = require('./lib/parser')
const anagrammer = require('./lib/anagrammer')

processor.execute = async (filePath) => {
  return new Promise((resolve, reject) => {
    try {
      const rl = readline.createInterface({
        input: fs.createReadStream(filePath, { encoding: 'utf8' })
      })
      let thisCharacterLength = 0
      let previousCharacterLength = 0
      let data = []
      rl.on('line', (line) => {
        if (thisCharacterLength === 0) {
          thisCharacterLength = previousCharacterLength = line.length
        } else {
          thisCharacterLength = line.length
          // check if this word is longer than the last
          if (thisCharacterLength > previousCharacterLength) {
            // the dataset is complete for "previousCharacterLength" so we're
            // in a place to process it fully
            previousCharacterLength = thisCharacterLength
            rl.pause()
          }
        }
        data.push(line)
      })

      rl.on('pause', () => {
        processor.processAndOutputData(data)
        // flush the old data to keep our memory footprint down
        data = []
        rl.resume()
      })

      rl.on('close', () => {
        resolve()
      })
    } catch (err) {
      // in practice we'd log these somewhere
      console.error('Exception encountered:', err)
    }
  })
}

processor.processAndOutputData = (data) => {
  const words = parser.execute(data)
  const results = anagrammer.process(words)
  results.forEach(result => {
    console.log(result.join(',') + '\n')
  })
}
