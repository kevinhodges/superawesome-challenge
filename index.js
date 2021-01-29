const fs = require('fs')
const readline = require('readline')

console.time('duration')

const parser = require('./lib/parser')
const anagrammer = require('./lib/anagrammer')

// as per the task, assume our first argument is the filepath and ignore any others
var filePath = process.argv.slice(2)[0]

if (!fs.existsSync(filePath)) {
  // given filePath couldn't be resolved,
  // in practice we'd log this and depending on severity, alert the team
  console.error('File path couldn\'t be resolved')
  process.exit()
}

const rl = readline.createInterface({
  input: fs.createReadStream(filePath,{ encoding: 'utf8' })
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
    if(thisCharacterLength > previousCharacterLength) {
      // the dataset is complete for "previousCharacterLength" so we're
      // in a place to process it fully
      previousCharacterLength = thisCharacterLength
      rl.pause()
    }
  }
  data.push(line)
})

rl.on('pause', () => {
  processData()
  rl.resume()
})

rl.on('close', () => {
  console.timeEnd('duration')
})

let processData = () => {
  let words = parser.execute(data)
  // flush the old data to keep our memory footprint down
  data = []
  const results = anagrammer.process(words)
  results.forEach(result => {
    console.log(result.join(',') + '\n')
  })
}

