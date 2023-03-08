"use strict";

const dayjs = require("dayjs");

const required = () => {
    throw new Error("Missing parameter");
}

function film(id = required(), title = required(), favourite = false, rating = "<not defined>", watchdate = "<not assigned>") {
    this.id = id;
    this.title = title;
    this.favourite = favourite;
    this.rating = rating;
    this.date = watchdate;

    this.toString = function () {
        let date = "";
        (this.date != "<not assigned>") ? date = this.date.format("YYYY-MM-DD") : date = this.date;
        return `ID: ${this.id}\tTitle: ${this.title}\tFavourite: ${this.favourite}\tRating: ${this.rating}\tDate: ${date}\n`;
    }

}

function film_library() {
    this.film = [];

    this.addFilm = function (film) {
        this.film.push(film);
    }
    this.toString = function () {
        let str = "";
        for (let f of this.film) {
            str += f.toString() + "\n";
        }
        return str;
    }
    this.sortByDate = function () {
        return this.film.sort((a, b) => {
            if (a.date == "<not assigned>") {
                return 1;
            }
            if (b.date == "<not assigned>") {
                return -1;
            }
            return a.date.diff(b.date);
        });
    }

    this.deleteFilm = function (id) {
        let index = this.film.findIndex(f => f.id == id);
        if (index != -1) {
            this.film.splice(index, 1);
        }
    }

    this.resetWatchDate = function () {
        this.film = this.film.map(f => {
            f.date = "<not assigned>";
            return f;
        });
    }

    this.getRated = function () {
        return this.film.filter(f => f.rating != "<not defined>").sort((a, b) => b.rating - a.rating);
    }
}

let film1 = new film(1, "The Shawshank Redemption");
let film2 = new film(2, "The Godfather", true, 5, dayjs("2021-12-1"));
let film3 = new film(3, "The Dark Knight", false, 4, dayjs("2021-12-2"));
let film4 = new film(4, "Pulp Fiction", true, 5, dayjs("2019-03-14"));
let film5 = new film(5, "The Lord of the Rings: The Return of the King");
let film6 = new film(6, "The Good, the Bad and the Ugly");
let film7 = new film(7, "Green Lantern", true, 2, dayjs("2022-07-23"))

console.log("Creating a new film library:\n-------------------------------------------");
let myLibrary = new film_library();
myLibrary.addFilm(film1);
myLibrary.addFilm(film2);
myLibrary.addFilm(film3);
myLibrary.addFilm(film4);
myLibrary.addFilm(film5);
myLibrary.addFilm(film6);
myLibrary.addFilm(film7);
console.log(`Movie library:\n${myLibrary.toString()}`);

console.log("Sorting by date:\n-------------------------------------------");
// let sortedByDate = myLibrary.sortByDate();
let sortedByDate = myLibrary.sortByDate();
console.log(`Sorted by Date:\n${sortedByDate.toString()}`);

console.log("Deleting film with id 1:\n-------------------------------------------");
myLibrary.deleteFilm(1);
console.log(myLibrary.toString());

// console.log("Resetting Watch date for all films:\n-------------------------------------------");
// myLibrary.resetWatchDate();
// console.log(`After resetting watch date:\n${myLibrary.toString()}`);

console.log("Get film with a defined score, sort them by descendig order:\n-------------------------------------------");
let ratedFilm = myLibrary.getRated();
console.log(`Rated film:\n${ratedFilm.toString()} `);

// this comment was added in the wsl branch