"use strict";

const dayjs = require("dayjs");
// const sqlite = require("sqlite3");

// const db = new sqlite.Database("films.db", (err) => {
//     if (err) {
//         console.log("Error connecting to database");
//     } else {
//         console.log("Connected to database");
//     }
// });

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
            try {
                this.film.push(film);
                resolve(film.id);
            }
            catch (err) {
                reject(err);
            }
        });
    }

    this.deleteFilm = (id) => {
        return new Promise((resolve, reject) => {
            try {
                let index = this.film.findIndex(f => f.id == id);
                if (index != -1) {
                    this.film.splice(index, 1);
                }
                resolve(id);
            }
            catch (err) {
                reject(err);
            }
        });
    }

    this.deleteWatchdate = () => {
        return new Promise((resolve, reject) => {
            try {
                this.film.forEach(f => f.date = null);
                resolve();
            }
            catch (err) {
                reject(err);
            }
        });
    }

    this.getAll = () => {
        return new Promise((resolve, reject) => {
            try {
                resolve(this.film);
            }
            catch (err) {
                reject(err);
            }

        });
    }

    this.getFavorite = () => {
        return new Promise((resolve, reject) => {
            try {
                let films = this.film.filter(f => f.favorite == 1);
                resolve(films);
            }
            catch (err) {
                reject(err);
            }
        });
    }

    this.getWatched = (day) => {
        return new Promise((resolve, reject) => {
            try {
                let watched = this.film.filter(f => f.date != null);
                resolve(watched);
            }
            catch (err) {
                reject(err);
            }
        });
    }

    this.getWatchedAfter = (day) => {
        return new Promise((resolve, reject) => {
            try {
                let watchedAfter = this.film.filter(f => f.date != null && f.date > day);
                resolve(watchedAfter);
            }
            catch (err) {
                reject(err);
            }

        });
    }

    this.getRatingsAbove = (rating) => {
        return new Promise((resolve, reject) => {
            try {
                let ratingsAbove = this.film.filter(f => f.rating > rating);
                resolve(ratingsAbove);
            }
            catch (err) {
                reject(err);
            }
        });
    }

    this.searchWord = (word) => {
        return new Promise((resolve, reject) => {
            try {
                let searchWord = this.film.filter(f => f.title.includes(word));
                resolve(searchWord);
            }
            catch (err) {
                reject(err);
            }

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

// async function createTable() {
//     let sql = 'CREATE TABLE IF NOT EXISTS films (id INTEGER PRIMARY KEY, title TEXT, favorite INTEGER, rating INTEGER, watchdate DATE)';
//     db.run(sql, (err) => {
//         if (err) {
//             console.log(err);
//         } else {
//             console.log("Table created");
//         }
//     });
// }

async function loadLibrary() {
    for (let f of films) {
        // console.log("adding film: " + f.title + " ...")
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

async function part1() {
    // LAB2 PART 1

    await library.getAll().then((films) => {
        console.log("-----------------------All films------------------------------");
        printList(films);
    });

    await library.getAll().then((films) => {
        console.log("-----------------------All films------------------------------");
        printList(films);
    });

    await library.getFavorite().then((films) => {
        console.log("--------------------------Favorite films------------------------");
        printList(films);
    });

    let day = dayjs("2021-12-2", "YYYY-MM-DD");
    await library.getWatched(day).then((films) => {
        console.log(`--------------------------Films watched on ${day.format("DD/MM/YYYY")}------------------------`);
        printList(films);
    });

    await library.getWatchedAfter(day).then((films) => {
        console.log(`--------------------------Films watched after ${day.format("DD/MM/YYYY")}------------------------`);
        printList(films);
    });

    let rating = 4;
    await library.getRatingsAbove(rating).then((films) => {
        console.log(`--------------------------Films with rating above ${rating}------------------------`);
        printList(films);
    });

    let word = "the";
    await library.searchWord(word).then((films) => {
        console.log(`--------------------------Films with title containing : "${word}"------------------------`);
        printList(films);
    });

}

async function part2() {

    // LAB2 PART 2

    console.log("-----------------------------------------PART 2----------------------------------------------");

    let film8 = new film(13, "Everything, everywhere, all at once", 1, 5, dayjs("2023-02-15"));

    await library.addFilm(film8).then((id) => {
        console.log("Added film with id: " + id);
    }).catch((err) => {
        console.log(err);
    });

    await library.getAll().then((films) => {
        console.log("--------------------------- All films Updated ------------------------------");
        printList(films);
    });


    await library.deleteFilm(6).then((id) => {
        console.log("Deleted film with id: " + id);
    }
    ).catch((err) => {
        console.log(err);
    });

    await library.getAll().then((films) => {
        console.log("--------------------------- All films Updated ------------------------------");
        printList(films);
    });

    await library.deleteWatchdate().then(() => {
        console.log("Deleted all watchdates");
    }).catch((err) => {
        console.log(err);
    });

    await library.getAll().then((films) => {
        console.log("--------------------------- All films Updated ------------------------------");
        printList(films);
    });
}

// loadLibrary();

async function main() {
    await loadLibrary();

    await part1();

    await part2();

}

main();


