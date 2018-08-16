// start with strings, numbers and booleans
let age = 100;
let age2 = age;

// console.log(age);

age = 300;

// console.log(age, age2);

// Let's say we have an array
// const players = ["Wes", "Sarah", "Ryan", "Poppy"];

// and we want to make a copy of it.
// const team = players;

// You might think we can just do something like this:
// team[3] = "lux";

// however what happens when we update that array?
console.log(players, team);

// now here is the problem!

// oh no - we have edited the original array too!

// Why? It's because that is an array reference, not an array copy. They both point to the same array!

// So, how do we fix this? We take a copy instead!

// one way
const team2 = players.slice();

// or create a new array and concat the old one in
const team3 = [].concat(players);

// or use the new ES6 Spread
const team4 = [...players];

const team5 = Array.from(players);

// now when we update it, the original one isn't changed

// The same thing goes for objects, let's say we have a person object

// with Objects
const person = {
  name: "Wes Bos",
  age: 80
};

// and think we make a copy:
const captain = person;
captain.number = 99;

// how do we take a copy instead?
const cap2 = Object.assign({}, person, { age: 99 });

// We will hopefully soon see the object ...spread
const cap3 = { ...person };

// Things to note - this is only 1 level deep - both for Arrays and Objects. lodash has a cloneDeep method, but you should think twice before using it.
const wes = {
  name: "wes",
  age: 100,
  social: {
    twitter: "@wesbos",
    facebook: "wesbos.developer"
  }
};

const dev = Object.assign({}, wes);

// Poor man's deep clone function:
const dev2 = JSON.parse(JSON.stringify(wes));
