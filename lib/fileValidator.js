const fs = require('fs')
const path = require('path')

const fileValidator = module.exports = {}

fileValidator.run = (filePath) => {
  if (!fs.existsSync(filePath)) {
    // the filePath couldn't be resolved
    // in practice we'd log this and depending on severity, alert the team
    console.error('File path couldn\'t be resolved')
    process.exit()
  }

  if (path.extname(filePath) !== '.txt') {
    // it's a file extension we're not prepared to handle
    console.error('File extension invalid')
    process.exit()
  }
}
