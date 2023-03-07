// hadling of JS strings

// define the names of users as comma separated list

let users = "Marco Rossi, Giorgio Di Forse, Simona Ajmone Morelli, Marta Lupica, Luca Ghitti, Valeria Ro"
console.log(`users : ${users}`);

//parse the string and crate an array of names
// trim white spaces
let users_array = users.split(",");
users_array = users_array.map((value) => { return value.trim(); });
console.log(`users_array : ${users_array}`);


// create a new array by computing the acronym of each name

let acronyms = users_array.map((value) => {
    let words = value.split(" ");
    let acronym = words.map((word) => { return word[0]; });
    return acronym.join("");
});

console.log(`acronyms : ${acronyms}`);

// sort and print the array of acronyms in alphabetical order
// with the names of the users


let acronyms2 = users_array.map((value) => {
    let words = value.split(" ");
    let acronym = words.map((word) => { return word[0]; });
    acronym = acronym.join("");
    return { acronym: acronym, name: value };
});

acronyms2.sort((a, b) => { return a.acronym.localeCompare(b.acronym); });

for (u of acronyms2) {
    console.log(`${u.acronym} : ${u.name}`);
}