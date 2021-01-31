const fileValidator = require('./lib/fileValidator')
const processor = require('./lib/processor')

// as per the task, assume our first argument is the filepath and ignore any others
const filePath  = process.argv.slice(2)[0]
fileValidator.run(filePath)

processor.execute(filePath)
