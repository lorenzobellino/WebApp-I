"use strict";

// create a function that given an array of strings
// for each string compute and print a new string 
// composed by the first 2 and last 2 characters of the original string
// if the string has less than 2 characters print an empty string
// if the string has 2 o 3 character duplicates the characters
// for examples it --> itit , cat --> caat


function compute_new_string(str) {
    switch (str.length) {
        case 0: case 1:
            return "";
        case 2:
            return str + str;
        case 3:
            return str[0] + str[1] + str[1] + str[2];
        default:
            return str[0] + str[1] + str[str.length - 2] + str[str.length - 1];
    }
}

let arrayOfString = ["carlo", "mario", "panzanella", "martangorli", "kahlgiho", "kjgaoo"]

let newArray = arrayOfString.map(compute_new_string);

console.log(newArray);

let edgecase = ["s", "tr", "tra", "polo", "it", "cat", ""]

let newEdgecase = edgecase.map(compute_new_string);

console.log(newEdgecase);