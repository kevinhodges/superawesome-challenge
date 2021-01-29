## Data ingestion
- Read the entire contents of the file in one go.
  - pros, quick and simple
  - cons, assumption is the entire data set might not fit in to memory
- As the words are ordered be size, stream the data in one word length at a time and bin each data set before the next is ingested
  - pros, guarantees we wont hit OOM errors
  - cons, adds some complexity

## Data parsing/sanitisation
- Validate data as per assumptions
- Unless we hit an unhandled exception we'll process as much of the data as possible
- Needs to make the data as valid as possible for the anagrammer to do it's thing reliably

## Potential components/files
- processor a la index.js
- data ingestion, which in a wider system could be cleanly abstracted for re-use, this will handle checking the file exists and that the data read in is in a state we can use
- data parsing, making the data meet our assumptions to enable clean processing
- anagram logic
- outputting results

## Anagram algorithm
- sorting letters of words in alphabetic order is a good way of enabling a simple anagram test

## Output
- create a write stream to handle output
- dump the results of each word length once all words of the current length have been grouped
- log some performance characteristics upon completion

## Other
- From an memory efficiency and simplicity perspective i'll use simple objects for all components as opposed to classes
- If we only read more data once the first set has finished writing we won't have to deal with backpressure. We could get smart with reading and writing different data sets asynchronously to improve performance