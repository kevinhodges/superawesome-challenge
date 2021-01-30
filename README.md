# Superawesome Challenge

## The Task

Write a program that takes as argument the path to a file containing one word per line, groups the words that are anagrams to each other, and writes to the standard output each of these groups.

The groups should be separated by newlines and the words inside each group by commas.

### Assumptions

- The words in the input file are ordered by size
- The files may not fit into memory all at once (but all the words of the same size would)
- The words are not necessarily actual English words, for example, “abc” and “cba” are both considered words for the sake of this exercise.

### Other considerations
- If the file type passed at the cmd line is not a .txt we'll reject it, the parser isn't designed to handle potential funky encodings and whatnot
- If more than one instance of a given word is found we'll ignore them
- Any whitespace between words will be ingnored/skipped over
- If we come across any capital letters they could technically still be an anagram so we'll force them to lowercase and continue as normal (assuming it's not a dupe)
- Words must ONLY contain a-zA-Z characters. If a word contains any numbers, symbols or other ascii we will ignore it

## The solution

I've chosen to complete the task in node.js, it's the language I'm currently most comfortable with and provides really good support for streaming large data files. 

The solution I've ended at uses a really nice node.js streams interface called [readline](https://nodejs.org/api/readline.html). It lends itself perfectly to the problem as we can stream the data in so not block the I/O while also not having to worry about buffers and odd chunk sizes as the data is read in.

Although the biggest given example (1.7MB) works well with simply reading the entire file in in one go, it will not scale well if we want to read GB's of data. To this end the stream logic I've implemented leans on the fact that words are guaranteed to be ordered by size and reads all words of the same size in and processes those before moving on to the next size. This means we don't have to worry about [OOM](https://en.wikipedia.org/wiki/Out_of_memory) problems and also gives us a massive performance uptick.

### Performance benchmarking

In my first implementation using a simple `fs.readFileSync` example2.txt (the big one) took ~20 seconds to complete processing on my machine.
My second attempt (current version 1.0.0) using a readStream brought the execution time down to ~8 seconds.

### Big O analysis

For the purpose of algorithm complexity analysis I will just consider the anagrammer algorithm `./lib/anagrammer.js`. 

We have 2 x loops of up to the entire data set so both the best and worst case scenarios are `O(n²)` time.

### Reasons behind data structures chosen 

I've mostly used arrays across the solution as they're fast to access and there's no need for a more complex data structure until we get to the grouping logic for which I've simply got an object of keys with an array of associated anagrams as the value. Keep it simple!

### Given more time

- I'd like to better organise `./processor.js`, it's too big so I'd break it down into a few more functions
- More tests could be written for better resiliance

## Running the solution

This solution assumes you have nodejs v14 and npm v6 installed globally.

### Clone the project:
```
git clone git@github.com:kevinhodges/superawesome-challenge.git
```

### Install node and any dependencies:
```
nvm use
npm i
```

### Run the solution:
```
node index.js [relative path to data file]

// example
node index.js ./data/example1.txt
```

### Run the tests:
```
npm t
```

**Hint:** Once the tests have completed running you can view the coverage report in `./coverage/index.html`
