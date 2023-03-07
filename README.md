# Applicazioni Web I
---
This is the repository for the course of [Web Applications I](http://media.polito.it/wordpress/classes/aw1/index.html) held at the [Politecnico di Torino](https://www.polito.it) in the academic year 2022/2023 and taught by professor [Enrico Masala](https://www.polito.it/en/staff?p=004111)

## Q&A exercise
_Goal: managing a simple data structure as an array of objects_.

Using JavaScript objects and functional programming methods, manage objects that contain information about a question and their answers.

Each answer will contain:
- Response (text)
- Respondent name
- Score (integer number, positive or negative)
- Date

Define a constructor function `Answer` to create one or more answers.

A question, instead, is made of:
- Question (text)
- Questioner name
- Date
- List of answers

Define a constructor function `Question` to represent a question. Implement the following methods to manipulate its answers: 

- `add(answer)` // pass a fully-constructed `Answer` object
- `findAll(name)` // returns all the Answers of a given person
- `afterDate(date)` // returns an array of Answers after the given date
- `listByDate()` // returns an array of Answers, sorted by increasing date
- `listByScore()` // idem, by decreasing score

Create an instance of `Question` with at least four `Answer`s in it.

### Solution
The solution is implemented in [QandA.js](https://github.com/lorenzobellino/WebApp-I/tree/master/test-examples/week2/QandA.js) file.