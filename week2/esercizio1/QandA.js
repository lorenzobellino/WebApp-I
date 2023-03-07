"use strict";

const dayjs = require("dayjs");

function Answer(text, respondent, score, date) {
    this.text = text;
    this.respondent = respondent;
    this.score = score;
    this.date = date;

    this.str = function () {
        return `Answer: ${this.text}, by ${this.respondent} on ${this.date.format("YYYY-MM-DD")} with score ${this.score}`;
    }
}

function Question(text, questioner, score, date) {
    this.text = text;
    this.questioner = questioner;
    this.score = score;
    this.date = date;

    this.str = function () {
        return `Question: ${this.text}, by ${this.questioner} on ${this.date.format("YYYY-MM-DD")} with score ${this.score}`;
    }
}

const ans1 = new Answer("I don't know", "John", 0, dayjs("2023-03-05"));

console.log(ans1.str());