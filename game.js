// prompt package
const prompt = require('prompt-sync')({sigint: true});

// constant variables 
const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';
const rowNum = 10, colNum = 10;

// Array Field Class
class Field {
    constructor() {
        this._field = Array(rowNum).fill().map(() => Array(colNum));
        this._locationX = 0;
        this._locationY = 0;
    } // end of constructor

    generateField(percentage) {
        // loop to create 10 rows and 10 columns
        for (let y = 0; y < rowNum; y++) {
            for (let x = 0; x < colNum; x++) {
                const prob = Math.random();
                this._field[y][x] = prob > percentage ? fieldCharacter : hole;
            }
        } // end of for loop
    
        // Set the "hat" location : Object
        const hatLocation = {
            x: Math.floor(Math.random() * colNum),
            y: Math.floor(Math.random() * rowNum)
        }; // end of set "hat" location
    
        // Make sure the "hat" is not at the starting point
        while (hatLocation.x == 0 && hatLocation.y == 0) {
            hatLocation.x = Math.floor(Math.random().colNum);
            hatLocation.y = Math.floor(Math.random().rowNum);
        } // end of "hat" not at the starting point
        
        // save hat location
        this._field[hatLocation.y][hatLocation.x] = hat;
    
        // Set the "home" position before the game start
        this._field[0][0] = pathCharacter;
    } // end of generateField

    // Game play
    runGame() {
        let playing = true;
            console.log("Start Game");

        // In the play
        while (playing) {

            // print the field
            this.print();
            
            // get direction input
            this.askQuestion();

            // game play conditions
            if (!this.inBoundary()) {
                console.log('Out of boundry!');
                playing = false;
                break;
            }
            else if (this.metHole()) {
                console.log('You fall into the hole!');
                playing = false;
                break;
            }
            else if (this.metHat()) {
                console.log('You Win!');
                playing = false;
                break;
            }
            else

                // update Character location
                this._field[this._locationY][this._locationX] = pathCharacter;
        } // end of while loop
    }// end of game play

    // print field function
    print() {
        const displayString = this._field.map(row => {
            return row.join('');
        }).join('\n');

        console.log(displayString);
    } // end of print

    // get direction function
    askQuestion() {
        const direction = prompt('Which Way? ').toUpperCase();
        switch (direction) {

            // Check if direction is U, D, L, R
            // set up direction
            case 'U':
                this._locationY -= 1;
                break;
            // set down direction
            case 'D':
                this._locationY += 1;
                break;
            // set left direction
            case 'L':
                this._locationX -= 1;
                break;
            // set right direction
            case 'R':
                this._locationX += 1;
                break;
            // prompt to input correct key
            default:
                console.log('Input (U)p, (D)own, (L)eft or (R)ight to move');
            // loop back to get direction    
            this.askQuestion();
        }
    }

    // Check for boundaries
    inBoundary() {
        return (
        this._locationY >= 0 && 
        this._locationX >= 0 && 
        this._locationY < rowNum && 
        this._locationX < colNum
        );
    }

    // Check if character fall in to a hole - game over
    metHole() {
        return this._field[this._locationY][this._locationX] == hole;
    }

    // Check if character gets the hat - game win
    metHat () {
        return this._field[this._locationY][this._locationX] == hat;
    }

}// end of Field class

// Create an intance of Field Class Object
const myfield = new Field();
myfield.generateField(0.3);
myfield.runGame();


