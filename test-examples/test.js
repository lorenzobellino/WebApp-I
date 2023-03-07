"use strict";

const letters = [... "Hello world"];
let uppercase = "";
letters.forEach(letter => {
    uppercase += letter.toUpperCase();
})
console.log(uppercase);

// stesso risultato ma più efficiente con map
let uppercase2 = "";
uppercase2 = letters.map(letter => letter.toUpperCase()).join("");
console.log(uppercase2);

// reduce

const array = [1, 2, 3, 4, 5];
const arraysum = array.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
const arrayprod = array.reduce((accumulator, currentValue) => accumulator * currentValue, 1);
const maxarray = array.reduce((accumulator, currentvalue) => accumulator > currentvalue ? accumulator : currentvalue);

console.log(`arraysum : ${arraysum}`);
console.log(`arrayprod : ${arrayprod}`);
console.log(`maxarray : ${maxarray}`);

// average price of all SUV

const vehicles = [
    { make: 'Honda', model: 'CR-V', type: 'suv', price: 24045 },
    { make: 'Honda', model: 'Accord', type: 'sedan', price: 22455 },
    { make: 'Mazda', model: 'Mazda 6', type: 'sedan', price: 24195 },
    { make: 'Mazda', model: 'CX-9', type: 'suv', price: 31520 },
    { make: 'Toyota', model: '4Runner', type: 'suv', price: 34210 },
    { make: 'Toyota', model: 'Sequoia', type: 'suv', price: 45560 },
    { make: 'Toyota', model: 'Tacoma', type: 'truck', price: 24320 },
    { make: 'Ford', model: 'F-150', type: 'truck', price: 27110 },
    { make: 'Ford', model: 'Fusion', type: 'sedan', price: 22120 },
    { make: 'Ford', model: 'Explorer', type: 'suv', price: 31660 }
];
const suv = vehicles.filter(vehicle => vehicle.type === "suv");
const suvprice = suv.map(vehicle => vehicle.price);
const suvpriceavg = suvprice.reduce((accumulator, currentvalue) => accumulator + currentvalue, 0) / suvprice.length;

const avgSUVprice = vehicles.filter(v => v.type === "suv").map(v => v.price).reduce((sum, price) => sum + price, 0) / vehicles.filter(v => v.type === "suv").length;
const avgSUVpriceV2 = vehicles.filter(v => v.type === "suv").map(v => v.price).reduce((sum, price, i, v) => sum + price / v.length, 0)

console.log(`suv price average multiple map:    ${suvpriceavg}`);
console.log(`suv price average oneliner:        ${avgSUVprice}`);
console.log(`suv price average V2:              ${avgSUVpriceV2}`);

// posso ridurre una tupla