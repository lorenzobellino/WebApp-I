"use strict";

function Answer(text, respondent, score, date) {
    this.text = text;
    this.respondent = respondent;
    this.score = score;
    this.date = date;
}

const ans1 = new Answer("I don't know", "John", 0, new Date());

console.log(ans1);