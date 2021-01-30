const fs = require('fs')
const processor = require('./processor')
const path = require('path')

// as per the task, assume our first argument is the filepath and ignore any others
var filePath = process.argv.slice(2)[0]
if (!fs.existsSync(filePath)) {
  // given filePath couldn't be resolved,
  // in practice we'd log this and depending on severity, alert the team
  console.error('File path couldn\'t be resolved')
  process.exit()
}

if (path.extname(filePath) !== '.txt') {
  // who knows what funky whitespace or character encoding we might get if it's not a txt...
  console.error('Invalid file extension')
  process.exit()
}

processor.execute(filePath)
