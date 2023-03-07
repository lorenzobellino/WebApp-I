"use strict"

// esercizio 1
// definisci un array

let voti = [22, 12, 14, -12, 4, -5, -10, 22, 19, -24, -3, 0, 10];
console.log(`voti iniziali : ${voti}`);

// duplicate the array

let voti_copy = [...voti];
console.log(`voti copia : ${voti_copy}`);
// eliminate all negative scores

let NN = voti_copy.length;
voti_copy = voti_copy.filter(function (value) { return value >= 0; });
NN -= voti_copy.length;

console.log(`voti copia senza negativi : ${voti_copy}`);
console.log(`numero voti negativi : ${NN}`);

// eliminate the 2 lowest scores
voti_copy.sort((a, b) => { return a - b; });
voti_copy = voti_copy.slice(2);

console.log(`voti copia senza i due minori : ${voti_copy}`)

// calculate the average
let avg = voti_copy.reduce((a, b) => { return a + b; }) / voti_copy.length;
console.log(`average : ${avg}`);

// add NN+2 element of value average to the array 
for (let i = 0; i < NN + 2; i++) {
    voti_copy.push(avg);
}
console.log(`voti copia con voti aggiunti : ${voti_copy}`);

// print both arrays comparing the scores and showing the averages
console.log(`voti iniziali : ${voti}`);
console.log(`voti finali : ${voti_copy}`);
let avg_init = voti.reduce((a, b) => { return a + b; }) / voti.length;
let avg_final = voti_copy.reduce((a, b) => { return a + b; }) / voti_copy.length;
console.log(`average iniziale : ${avg_init}`);
console.log(`average finale : ${avg_final}`);



