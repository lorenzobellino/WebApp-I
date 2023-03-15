"use strict"

//import sqlite

const sqlite = require("sqlite3");

// const db = new sqlite.Database("exam.sqlite", err => { if (err) throw err; });

// //create table
// db.run("CREATE TABLE IF NOT EXISTS exam (id TEXT PRIMARY KEY, name TEXT, score INTEGER)");
// // populate the db
// let ids = ["AA1234", "352KD3", "35FJJ3", "KD2334"]
// let names = ["PDS", "MLPR", "Sicurezza", "Computational Intelligence"]
// let scores = [29, 27, 30, 28]
// db.run("INSERT INTO exam(id,name,score) VALUES('01KX23','Web Application I', 29 )", err => { if (err) throw err })

// db.close((err) => { if (err) throw err })

const dbName = "exams.sqlite"

const db = new sqlite.Database(dbName, sqlite.OPEN_READWRITE, err => {
    if (err) {
        console.log(err)
    }
    else {
        console.log(`Created db: ${dbName}`);
    }
})

db.run(`create table if not exists exams (id text primary key, name text, score integer)`, err => {
    if (err) {
        console.log(`err : ${err}`)
    }
    else {
        console.log(`created table: exams`)
    }
})

db.run(`insert into exams (id,name,scores) values ('aajs33', 'webapp', 29)`, err => {
    if (err) {
        console.log(`${err}`)
    }
    else {
        console.log("inserted into table exams")
    }
})

// create table inside db
// db.exec(`create table if not exists exams 
//     (   id TEXT primary key,
//         name TEXT,
//         score INTEGER
//         );
//     insert into exams (id, name, scores)
//     values  ('AD1234', 'web app', 29),
//             ('PO1276', 'PDS', 30),
//             ('QK9833', 'ISS' , 27);

// `)
