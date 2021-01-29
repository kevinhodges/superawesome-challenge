const fs = require('fs')
const readline = require('readline')

console.time('duration')

const parser = require('./lib/parser')
const anagrammer = require('./lib/anagrammer')

const rl = readline.createInterface({
  input: fs.createReadStream('./data/example2.txt',{ highWaterMark: 10, encoding: 'utf8' })
});

let thisCharacterLength = 0
let previousCharacterLength = 0
let data = []

rl.on('line', (line) => {
  // first line
  if(thisCharacterLength===0) {
    thisCharacterLength = previousCharacterLength = line.length
  } else {
    thisCharacterLength = line.length
    // check if this line is longer than the last
    if(thisCharacterLength > previousCharacterLength) {
      // the dataset is complete for `previousCharacterLength`
      previousCharacterLength = thisCharacterLength
      rl.pause()
    }
  }
  
  // add data to the data
  // console.log('line-', line);
  data.push(line)

})

rl.on('pause', () => {
  // console.log('PAUSED')
  processData()
  // console.log('RESUMING in 2000')
  setTimeout(rl.resume.bind(rl), 0)
})

rl.on('close', () => {
  // console.log('CLOSED')
  console.timeEnd('duration')
})

let processData = () => {
  // console.log('-- ANAGRAMMING --')
  let words = parser.execute(data)
  // flush the old data
  data = []
  const results = anagrammer.process(words)
  // output the results
  results.forEach(result => {
    console.log(result.join(',') + '\n')
  })
}

