"use strict";

const dayjs = require('dayjs');
const sqlite = require('sqlite3');

const db = new sqlite.Database('qa.sqlite', (err) => { if (err) throw err; });


function Answer(text, respondent, score, date) {
    this.text = text;
    this.respondent = respondent;
    this.score = score;
    this.date = date;

    this.str = function () {
        return `${this.text}, by ${this.respondent} on ${this.date.format("YYYY-MM-DD")} : ${this.score}`;
    }
}

function Question(text, questioner, date) {
    this.text = text;
    this.questioner = questioner;
    this.date = date;
    this.answers = [];

    this.str = function () {
        return `${this.questioner} asked on ${this.date.format("YYYY-MM-DD")}:\n\t${this.text}\nAnswers:\n\t${this.answers.map(a => a.str()).join("\n\t")}`;
    }

    this.add = (e) => {
        return new Promise((resolve, reject) => {
            const sql = 'INSERT INTO answers(text, respondent, score, date) VALUES(?, ?, ?, DATE(?))';
            db.run(sql, [e.text, e.respondent, e.score, e.date.format('YYYY-MM-DD')], function (err) {
                if (err) reject(err);
                else resolve(this.lastID);
            });
        });
    }

    // this.addAnswer = function (answer) {
    //     this.answers.push(answer);
    // }

    this.getAll = () => {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM answers';
            db.all(sql, [], (err, rows) => {
                if (err) reject(err);
                else {
                    const response = rows.map(r => new Answer(r.text, r.respondent, r.score, dayjs(r.date).format("YYYY-MM-DD")));
                    resolve(response);
                }
            })
        });
    }

    this.findAll = function (filter) {
        return this.answers.filter(filter);
    }

    this.afterDate = function (date) {
        return this.findAll(a => a.date.isAfter(date));
    }

    this.listByDate = function () {
        return this.answers.sort((a1, a2) => a2.date.diff(a1.date));
    }

    this.listByScore = function () {
        return this.answers.sort((a1, a2) => a2.score - a1.score);
    }
}

const q1 = new Question("What is the meaning of life?", "John", dayjs("2021-01-02"));

const ans1 = new Answer("I don't know", "Mario", -2, dayjs("2021-03-05"));
const ans2 = new Answer("42", "Carlos", 10, dayjs("2021-03-05"));
const ans3 = new Answer("suffering", "Simona", 4, dayjs("2021-01-10"))
const ans4 = new Answer("There is no meaning", "Marcello", -1, dayjs("2021-04-01"))

let answers = [ans1, ans2, ans3, ans4];

async function createTable() {
    return new Promise((resolve, reject) => {
        const sql = 'CREATE TABLE answers(id INTEGER PRIMARY KEY AUTOINCREMENT, text TEXT, respondent TEXT, score INTEGER, date DATE)';
        db.run(sql, (err) => {
            if (err) reject(err);
            else resolve();
        });
    });
}


async function load() {
    console.log("Loading...");
    for (const a of answers) {
        await q1.add(a).then((id) => {
            console.log(`Answer ${id} added`);
        })
    }
}

// createTable().then(() => {
//     load().then(
//         () => {
//             console.log("table created and loaded")
//         }).catch(
//             (err) => { console.log(`Error: ${err}`) }
//         )
// }).catch(
//     (err) => {
//         console.log(`Error: ${err}`)
//     });

q1.getAll().then((rows) => {
    console.log(rows);
}).catch((err) => {
    console.log(`Error: ${err}`);
});


// createTable().then(() => { console.log("Table created") }).catch((err) => { console.log(err) });

// load();




// q1.addAnswer(ans1);
// q1.addAnswer(ans2);
// q1.addAnswer(ans3);
// q1.addAnswer(ans4);

// console.log(q1.str());

// const after_feb = q1.afterDate(dayjs("2021-02-01"));
// const findall_marcello = q1.findAll(a => a.respondent === "Marcello");
// const list_by_date = q1.listByDate();
// const list_by_score = q1.listByScore();

// console.log(`after feb:\n\t${after_feb.map(a => a.str()).join("\n\t")}`);
// console.log(`findall marcello:\n\t${findall_marcello.map(a => a.str()).join("\n\t")}`);
// console.log(`list by date:\n\t${list_by_date.map(a => a.str()).join("\n\t")}`);
// console.log(`list by score:\n\t${list_by_score.map(a => a.str()).join("\n\t")}`);

