const fs = require('fs')
const processor = require('./processor')

// as per the task, assume our first argument is the filepath and ignore any others
var filePath = process.argv.slice(2)[0]
if (!fs.existsSync(filePath)) {
  // given filePath couldn't be resolved,
  // in practice we'd log this and depending on severity, alert the team
  console.error('File path couldn\'t be resolved')
  process.exit()
}

processor.execute(filePath)
