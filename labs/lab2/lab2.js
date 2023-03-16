"use strict";

const dayjs = require("dayjs");
const sqlite = require("sqlite3");

const db = new sqlite.Database("films.db", (err) => {
    if (err) {
        console.log("Error connecting to database");
    } else {
        console.log("Connected to database");
    }
});

const required = () => {
    throw new Error("Missing parameter");
}

function film(id = required(), title = required(), favorite = 0, rating = null, watchdate = null) {
    this.id = id;
    this.title = title;
    this.favorite = favorite;
    this.rating = rating;
    this.date = watchdate;

    this.toString = () => {
        let date = "";
        if (this.date == null) date = "<not assigned>";
        else date = this.date;
        let rating = "";
        (this.rating != null) ? rating = this.rating : rating = "<not defined>";
        return `ID: ${this.id}\tTitle: ${this.title}\tfavorite: ${this.favorite}\tRating: ${rating}\tDate: ${date}\n`;
    }

}

function film_library() {
    this.film = [];

    this.addFilm = (film) => {
        return new Promise((resolve, reject) => {
            let sql = 'INSERT INTO films (id, title, favorite, watchdate, rating) VALUES (?, ?, ?, ?, ?)';
            let date = null;
            if (film.date != null) date = film.date.format("YYYY-MM-DD");
            db.run(sql, [film.id, film.title, film.favorite, date, film.rating], (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(film.id);
                }
            });
        });
    }

    this.deleteFilm = (id) => {
        return new Promise((resolve, reject) => {
            let sql = 'DELETE FROM films WHERE id = ?';
            db.all(sql, [id], (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(id);
                }
            });
        });
    }

    this.deleteWatchdate = () => {
        return new Promise((resolve, reject) => {
            let sql = 'UPDATE films SET watchdate = NULL';
            db.all(sql, [], (err) => {
                if (err) {
                    console.log(err);
                }
            });
        });
    }

    this.getAll = () => {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT * FROM films';
            db.all(sql, [], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    let films = [];
                    for (let row of rows) {
                        let f = new film(row.id, row.title, row.favorite, row.rating, row.watchdate);
                        films.push(f);
                    }
                    resolve(films);
                }
            });
        });
    }

    this.getFavorite = () => {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT * FROM films WHERE favorite = 1';
            db.all(sql, [], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    let films = [];
                    for (let row of rows) {
                        let f = new film(row.id, row.title, row.favorite, row.rating, row.watchdate);
                        films.push(f);
                    }
                    resolve(films);
                }
            });
        });
    }

    this.getWatched = (day) => {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT * FROM films WHERE watchdate = ?';
            db.all(sql, [day.format("YYYY-MM-DD")], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    let films = [];
                    for (let row of rows) {
                        let f = new film(row.id, row.title, row.favorite, row.rating, row.watchdate);
                        films.push(f);
                    }
                    resolve(films);
                }
            });
        });
    }

    this.getWatchedAfter = (day) => {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT * FROM films WHERE watchdate > ?';
            db.all(sql, [day.format("YYYY-MM-DD")], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    let films = [];
                    for (let row of rows) {
                        let f = new film(row.id, row.title, row.favorite, row.rating, row.watchdate);
                        films.push(f);
                    }
                    resolve(films);
                }
            });
        });
    }

    this.getRatingsAbove = (rating) => {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT * FROM films WHERE rating > ?';
            db.all(sql, [rating], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    let films = [];
                    for (let row of rows) {
                        let f = new film(row.id, row.title, row.favorite, row.rating, row.watchdate);
                        films.push(f);
                    }
                    resolve(films);
                }
            });
        });
    }

    this.searchWord = (word) => {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT * FROM films WHERE title LIKE ?';
            db.all(sql, [`%${word}%`], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    let films = [];
                    for (let row of rows) {
                        let f = new film(row.id, row.title, row.favorite, row.rating, row.watchdate);
                        films.push(f);
                    }
                    resolve(films);
                }
            });
        });
    }

}

let film1 = new film(6, "The Shawshank Redemption");
let film2 = new film(7, "The Godfather", 1, 5, dayjs("2021-12-1", "YYYY-MM-DD"));
let film3 = new film(8, "The Dark Knight", 0, 4, dayjs("2021-12-2", "YYYY-MM-DD"));
let film4 = new film(9, "Pulp Fiction", 1, 5, dayjs("2019-03-14", "YYYY-MM-DD"));
let film5 = new film(10, "The Lord of the Rings: The Return of the King");
let film6 = new film(11, "The Good, the Bad and the Ugly");
let film7 = new film(12, "Green Lantern", 1, 2, dayjs("2022-07-23", "YYYY-MM-DD"))

let films = [film1, film2, film3, film4, film5, film6, film7];

async function createTable() {
    let sql = 'CREATE TABLE IF NOT EXISTS films (id INTEGER PRIMARY KEY, title TEXT, favorite INTEGER, rating INTEGER, watchdate DATE)';
    db.run(sql, (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log("Table created");
        }
    });
}

async function loadLibrary() {
    for (let f of films) {
        await library.addFilm(f).then((id) => {
            console.log("Added film with id: " + id);
        }).catch((err) => {
            console.log(err);
        });
    }
}

function printList(films) {
    for (let f of films) {
        console.log(f.toString());
    }
}

let library = new film_library();

/*
// LAB2 PART 1

library.getAll().then((films) => {
    console.log("-----------------------All films------------------------------");
    printList(films);
});

library.getFavorite().then((films) => {
    console.log("--------------------------Favorite films------------------------");
    printList(films);
});

let day = dayjs("2021-12-2", "YYYY-MM-DD");
library.getWatched(day).then((films) => {
    console.log(`--------------------------Films watched on ${day.format("DD/MM/YYYY")}------------------------`);
    printList(films);
});

library.getWatchedAfter(day).then((films) => {
    console.log(`--------------------------Films watched after ${day.format("DD/MM/YYYY")}------------------------`);
    printList(films);
});

let rating = 4;
library.getRatingsAbove(rating).then((films) => {
    console.log(`--------------------------Films with rating above ${rating}------------------------`);
    printList(films);
});

let word = "the";
library.searchWord(word).then((films) => {
    console.log(`--------------------------Films with title containing : "${word}"------------------------`);
    printList(films);
});

*/
// LAB2 PART 2

let film8 = new film(13, "Everything, everywhere, all at once", 1, 5, dayjs("2023-02-15"));

library.addFilm(film8).then((id) => {
    console.log("Added film with id: " + id);
}).catch((err) => {
    console.log(err);
});


library.deleteFilm(6).then((id) => {
    console.log("Deleted film with id: " + id);
}
).catch((err) => {
    console.log(err);
});

library.deleteWatchdate().then(() => {
    console.log("Deleted all watchdates");
}).catch((err) => {
    console.log(err);
});

