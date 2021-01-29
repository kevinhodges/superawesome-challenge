# Superawesome Challenge

## The Task

Write a program that takes as argument the path to a file containing one word per line, groups the words that are anagrams to each other, and writes to the standard output each of these groups.
The groups should be separated by newlines and the words inside each group by commas.

## Assumptions

- The words in the input file are ordered by size
- The files may not fit into memory all at once (but all the words of the same size would)
- The words are not necessarily actual English words, for example, “abc” and “cba” are both considered words for the sake of this exercise.

## Other considerations
- If more than one instance of a given word is found we'll ignore them
- Any whitespace between words will be ingnored/skipped over
- If we come across any capital letters they could technically still be an anagram so we'll force them to lowercase and continue as normal (assuming it's not a dupe)
- Words must ONLY contain a-zA-Z characters. If a word contains any numbers, symbols or other ascii we will ignore it

## Running the solution

This solution assumes you have nodejs v14.3 and npm v6 installed globally.

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
node index.js
```

### Run the tests:

```
npm t
```