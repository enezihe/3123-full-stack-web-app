// #Q1
const greeter = (names, counter =1 ) => {
    const greetText = 'Hello';
    for( let i = 0; i < counter; i++) {
        for (const name of names) {
            console.log(`${greetText} ${name}`)
        }
    }
};
greeter(['Randy Savage', 'Ric Flair', 'Hulk Hogan'], 3);
console.log('----------------');

// #Q2

const capitalize = (str = '') => {
  const [first = '', ...rest] = [...str];   
  return `${first.toUpperCase()}${rest.join('').toLowerCase()}`;
};

console.log(capitalize('fooBar')); 
console.log(capitalize('nodeJs')); 
console.log('----------------');

// #Q3


const colors = ['red', 'green', 'blue'];
const capitalizedColors = colors.map(capitalize);
console.log(capitalizedColors);

console.log('----------------');

// #Q4

const filterLessThan20 = arr => arr.filter(n => n < 20);

const values = [1, 60, 34, 30, 20, 5];
console.log(filterLessThan20(values));

console.log('----------------');

// #Q5

const sum = arr => arr.reduce((acc, n) => acc + n, 0);
const product = arr => arr.reduce((acc, n) => acc * n, 1);

const array = [1, 2, 3, 4];
console.log(sum(array));
console.log(product(array));

console.log('----------------');

// #Q6

class Car {
  constructor(model, year) {
    this.model = model; 
    this.year = year;
  }


  details() {
    return `Model: ${this.model} Engine ${this.year}`;
  }
}

class Sedan extends Car {
  constructor(model, year, balance) {
    super(model, year);  
    this.balance = balance;
  }

  info() {
    return `${this.model} has a balance of $${this.balance.toFixed(2)}`;
  }
}

const car2 = new Car('Pontiac Firebird', 1976);
console.log(car2.details());   

const sedan = new Sedan('Volvo SD', 2018, 30000);
console.log(sedan.info());
