
import { useState } from "preact/hooks";
import "./Board.less";
import { Keyboard } from "./Keyboard";
import { GameActions, Words } from "./logic";
import { Popup } from "./Popup";

export function WordleCell({ value, color }: { value: string , color: string}){
    return (
        <div className={"wordle-cell "+color+"-cell"}>
            <p>{value}</p>
        </div>
    );
}



export function WordleGrid({words, refresh}:{words: Words, refresh: () => void}) {
    let keys = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", 
    "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "á", "é", "í", "ó", "ö", "ő", 
    "ú", "ü", "ű"];
    let [guess, setGuess] = useState(Array.from({length:6},()=> Array(5).fill("")));
    let [currentRow, setCurrentRow] = useState(0);
    let [comparisons, setComparisons] = useState(Array.from({length:6},()=> Array(5).fill("white")));
    let [letters, setLetters] = useState(Object.fromEntries(keys.map(key => [key, "white"])));

    const reset = () => {
        setGuess(Array.from({length:6},()=> Array(5).fill("")));
        setCurrentRow(0);
        setComparisons(Array.from({length:6},()=> Array(5).fill("white")));
        setLetters({"a":"white", "b":"white", "c":"white", "d":"white", "e":"white", "f":"white", "g":"white", "h":"white", "i":"white", "j":"white", "k":"white", "l":"white", "m":"white", "n":"white", "o":"white", "p":"white", "q":"white", "r":"white", "s":"white", "t":"white", "u":"white", "v":"white", "w":"white", "x":"white", "y":"white", "z":"white","ö":"white","ü":"white","ó":"white","ő":"white","ú":"white","ű":"white","é":"white","á":"white","í":"white"});
    };

    function wonGame() : boolean {
        for (let comparison of comparisons ){
            if (comparison.every((color)=> color==="green")) return true;
        }
        return false;
    }

    function lostGame() : boolean {
        return currentRow === 6;
    }

    const newGame = () => {
        reset();
        refresh();
    }

    const handleKeyPress = (key: string) => {
        let gameActions = new GameActions(words);
        if (key === "ENTER") {
            const guessWord = guess[currentRow].join("");
            gameActions.wordSubmitted(guessWord, setComparisons, setCurrentRow, currentRow, setLetters);
            return;
        }
        
        if (key === "BACKSPACE") {
            gameActions.deleteLetter(setGuess, currentRow);
            return;
        }

        if (key === "REFRESH") {
            newGame();
            return;
        }
        
        gameActions.typedLetter(key, setGuess, currentRow);
    };

    return (
        <div class="wordle-grid">
            <Popup className={(wonGame()||lostGame())?"visible":"invisible"} title={wonGame()?"YOU WIN!":"YOU LOSE!"} message={wonGame()?"Nice Game!":("The word was: "+words.getSolution()) + ". Play again?"} onClick={newGame} buttonText="OK"/>
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