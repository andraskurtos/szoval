
import { useState } from "preact/hooks";
import "./Board.less";
import { Keyboard } from "./Keyboard";
import { GameActions, Words } from "./logic";
import { Popup } from "./Popup";
import { Settings } from "./Settings";


// a cell in the board, representing one letter of the word
// value - the letter
// color - the color of the cell
export function WordleCell({ value, color }: { value: string , color: string}){
    return (
        <div className={"wordle-cell "+color+"-cell"}>
            <p>{value}</p>
        </div>
    );
}



// the dictionary of words
let words = new Words()

// the keys of the keyboard
let keys = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", 
    "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "á", "é", "í", "ó", "ö", "ő", 
    "ú", "ü", "ű"];


// the grid of cells representing the board, where
// each row is a guess of the word
// tries - the number of tries
// wordLength - the length of the words
export function WordleGrid({tries, wordLength}:{tries:number, wordLength:number}) {
    
    // useState for the guesses of words
    // two-dimensional array of strings
    // each row represents a guess
    // each cell represents a letter
    let [guess, setGuess] = useState(Array.from({length:tries},()=> Array(wordLength).fill("")));

    // useState for the current row
    let [currentRow, setCurrentRow] = useState(0);

    // useState for the comparisons
    // two-dimensional array of strings
    // each row represents a guess
    // each cell represents the color of the cell
    let [comparisons, setComparisons] = useState(Array.from({length:tries},()=> Array(wordLength).fill("white")));

    // useState for the letters
    // object of strings
    // each key represents a letter
    // each value represents the color of the key
    let [letters, setLetters] = useState(Object.fromEntries(keys.map(key => [key, "white"])));

    // resets the board
    const newGame = () => {
        setGuess(Array.from({length:tries},()=> Array(wordLength).fill("")));
        setCurrentRow(0);
        setComparisons(Array.from({length:tries},()=> Array(wordLength).fill("white")));
        setLetters(Object.fromEntries(keys.map(key => [key, "white"])));
        words = new Words();
    };


    function wonGame() : boolean {
        for (let comparison of comparisons ){
            if (comparison.every((color)=> color==="green")) return true;
        }
        return false;
    }

    function lostGame() : boolean {
        return currentRow === tries;
    }

    // handles keypresses
    const handleKeyPress = (key: string) => {
        let gameActions = new GameActions(words);

        
        if (key === "ENTER") {
            const guessWord = guess[currentRow].join("");

            // submit current guessword
            gameActions.wordSubmitted(guessWord, setComparisons, setCurrentRow, currentRow, setLetters);
            return;
        }
        
        if (key === "BACKSPACE") {
            // delete last letter
            gameActions.deleteLetter(setGuess, currentRow);
            return;
        }

        if (key === "REFRESH") {
            // refresh the game
            newGame();
            return;
        }

        
        if (key === "SETTINGS") {

            // open settings menu
            // TODO - refactor with use state, this is disgusting
            let settings = document.querySelector(".settings");
            settings.classList.toggle("invisible");
            return;
        }
        
        // type letter into guess
        gameActions.typedLetter(key, setGuess, currentRow);
    };

    // render the board
    return (
        <div class="wordle-grid">
            <Popup className={(wonGame()||lostGame())?"visible":"invisible"} title={wonGame()?"NYERTÉL!":"VESZTETTÉL!"} message={wonGame()?"Szép játék!":("A szó \""+words.getSolution()) + "\" volt."} onClick={newGame} buttonText="Újra!"/>
            <Settings />
            {guess.map((row,rowIndex) => (
                <div class="wordle-row" key={rowIndex}>
                    {row.map((cell,cellIndex) =>(
                        <WordleCell value={cell} key={cellIndex} color={comparisons[rowIndex][cellIndex]}/>
                    ))}
                </div>
            ))}
        <Keyboard onKeyPress={handleKeyPress} letters={letters}/>
        </div>
    );

}