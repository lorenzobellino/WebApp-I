"use strict";

const sqlite = require("sqlite3");
const db = new sqlite.Database("films.db");

//log the first 2 lines of the film table
db.each("SELECT * FROM films LIMIT 2", (err, row) => {
    if (err) {
        throw err;
    }
    else {
        console.log(row);
    }
});