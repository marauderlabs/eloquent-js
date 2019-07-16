let rabbit = {};
function speak(line) {
    console.log(`The rabbit says '${line}'`);
};

rabbit.speak = speak;
rabbit.speak("I'm alive.");
// → The rabbit says 'I'm alive.'

// Also,
speak.call(rabbit, "I'm alive.");

function speak(line) {
    console.log(`The ${this.type} rabbit says '${line}'`);
}
let whiteRabbit = { type: "white", speak };
let hungryRabbit = { type: "hungry", speak };

whiteRabbit.speak("Oh my ears and whiskers, " +
    "how late it's getting!");
// → The white rabbit says 'Oh my ears and whiskers, how
//   late it's getting!'
hungryRabbit.speak("I could use a carrot right now.");
// → The hungry rabbit says 'I could use a carrot right now.'

let protoRabbit = {
    speak(line) {
        console.log(`The ${this.type} rabbit says '${line}'`);
    }
};
let killerRabbit = Object.create(protoRabbit);
killerRabbit.type = "killer";
killerRabbit.speak("SKREEEE!");
// → The killer rabbit says 'SKREEEE!'

protoRabbit.speak("i'm just a prototype");


// constructor 
function Rabbit(type) {
    this.type = type;
}
console.log("Prototype of Rabbit:", Object.getPrototypeOf(Rabbit))
console.log(Object.getPrototypeOf(Rabbit) == Function.prototype)
console.log("Rabbit.prototype:", Rabbit.prototype)
Rabbit.prototype.speak = function (line) {
    console.log(`The ${this.type} rabbit says '${line}'`);
};
console.log(Rabbit.prototype)
let weirdRabbit = new Rabbit("weird");

weirdRabbit.speak("Squeak!");


class Rabbit1 {
    constructor(type) {
        this.type = type;
    }
    speak(line) {
        console.log(`The ${this.type} rabbit says '${line}'`);
    }
}

let killerRabbit1 = new Rabbit1("killer");
let blackRabbit1 = new Rabbit1("black");

console.log(Object.getPrototypeOf(killerRabbit1))
console.log(Object.getPrototypeOf(Rabbit1) == Function.prototype)

Rabbit1.prototype.teeth = "small";
console.log(killerRabbit1.teeth);
// → small
killerRabbit1.teeth = "long, sharp, and bloody";
console.log(killerRabbit1.teeth);
// → long, sharp, and bloody
console.log(blackRabbit1.teeth);
// → small
console.log(Rabbit1.prototype.teeth);
// → small

Rabbit1.prototype.toString = function () {
    return `a ${this.type} rabbit`;
};

console.log(String(blackRabbit1));
// → a black rabbit


let sym = Symbol("name");
console.log(sym);
console.log(Symbol("name") == Symbol("name"));
// → false
Rabbit1.prototype[sym] = 55;
console.log(blackRabbit1[sym]);
console.log("string another")
// → 55


let okIterator = "OK"[Symbol.iterator]();
console.log(okIterator.next());
// → {value: "O", done: false}
console.log(okIterator.next());
// → {value: "K", done: false}
console.log(okIterator.next());
// → {value: undefined, done: true}


class Matrix {
    constructor(w, h, elementGenerator) {
        this.width = w;
        this.height = h;
        this.size = w * h;
        this.matrix = [];
        for (let y = 0; y < h; y++) {
            for (let x = 0; x < w; x++) {
                this.matrix[(y * w) + x] = elementGenerator(x, y);
            }
        }
    }

    get(x, y) {
        return this.matrix[y * this.width + x]
    }

    set(x, y, value) {
        this.matrix[y * this.width + x] = value
    }
}

let matrix = new Matrix(2, 2, (x, y) => `value [${x}, ${y}]`);

console.log(matrix);

class MatrixIterator {
    constructor(matrix) {
        this.x = 0;
        this.y = 0;
        this.matrix = matrix;
    }

    next() {
        let done = true;
        if (this.y == this.matrix.width) {
            return { done }
        }

        done = false;
        let value = {
            x: this.x,
            y: this.y,
            value: this.matrix.get(this.x, this.y)
        };

        this.x++;
        if (this.x == this.matrix.width) {
            this.x = 0;
            this.y++;
        }

        return { done, value }
    }
}


Matrix.prototype[Symbol.iterator] = function () {
    return new MatrixIterator(this);
}

let matrix1 = new Matrix(2, 2, (x, y) => `value ${x},${y}`);
for (let { x, y, value } of matrix1) {
    console.log(x, y, value);
}