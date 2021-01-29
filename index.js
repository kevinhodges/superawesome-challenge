// const index2 = module.exports = {}

// const fileIngestor = require('./fileIngestor')

// index2.go = async () => {

//   await fileIngestor.open('./data/example1.txt')

//   let results = await fileIngestor.nextSetOfWordsPlease()
//   console.log('results', results)
// }


const fs = require('fs')
const parser = require('./lib/parser')
const anagrammer = require('./lib/anagrammer')

let data = fs.readFileSync(__dirname + '/data/example1.txt', 'utf8')
let words = parser.execute(data)

const results = anagrammer.process(words)

// output the results
results.forEach(result => {
  console.log(result.join(',') + '\n')
})

