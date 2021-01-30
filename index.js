const fs = require('fs')
const processor = require('./processor')
const path = require('path')

// as per the task, assume our first argument is the filepath and ignore any others
var filePath = process.argv.slice(2)[0]
if (!fs.existsSync(filePath) || path.extname(filePath) !== '.txt') {
  // given filePath couldn't be resolved or it's a file extenstion we're not prepared to handle,
  // in practice we'd log this and depending on severity, alert the team
  console.error('File path couldn\'t be resolved')
  process.exit()
}

processor.execute(filePath)
