import { useState } from "preact/hooks";
import { WordleGrid } from "./Board";
import { Words } from "./logic";
import { Popup } from "./Popup";




export function Game() {
    let words = new Words();
    const Refresh = () => {
        this.forceUpdate();
    }
    return (
        <div>
            <h1>SZÓVAL</h1>
            <WordleGrid words={words} refresh={Refresh}/>
        </div>
    );
}