import React, { useState } from "react";
import { IonButton, IonIcon } from "@ionic/react";
import { heart } from 'ionicons/icons';
import Player from "./Player";
import "../theme/utilities.css";
import "./Scene.css";


const Scene = () => {
    const [totalScore1, setTotalScore1] = useState(0);
    const [breakScore1, setBreakScore1] = useState(0);
    const [totalScore2, setTotalScore2] = useState(0);
    const [breakScore2, setBreakScore2] = useState(0);
    const [round, setRound] = useState(1);

    const addToTotal = () => {
        round == 1 ? setTotalScore1(totalScore1 + breakScore1) : setTotalScore2(totalScore2 + breakScore2);
    };

    const clearTotal = () => {
        setTotalScore1(0);
        setTotalScore2(0);
    }

    const clearBreak = () => {
        round == 1 ? setBreakScore1(0) : setBreakScore2(0);
    };

    const addToBreak = (score) => {
        round == 1 ? setBreakScore1(breakScore1 + score) : setBreakScore2(breakScore2 + score);
    };

    return (
        <>
            <div className="u-flex">
                <div className="Player-container u-textCenter">
                    <div className="effect3" onClick={() => setRound(1)}>
                        <Player totalScore={totalScore1} breakScore={breakScore1} round={round == 1} />
                    </div>
                </div>
                <div className="Player-container u-textCenter">
                    <div className="effect3" onClick={() => setRound(2)}>
                        <Player totalScore={totalScore2} breakScore={breakScore2} round={round != 1} />
                    </div>
                </div>
            </div>
            <div className="Player-ball-container">
                <div className="Player-all-balls">
                    <IonButton shape="round" fill="outline" onClick={() => { addToBreak(1); }}>
                        <IonIcon slot="icon-only" src="/plus1.svg"></IonIcon>
                    </IonButton>
                    <IonButton shape="round" fill="outline" onClick={() => { addToBreak(2); }}>
                        <IonIcon slot="icon-only" src="/plus2.svg"></IonIcon>
                    </IonButton>
                    <IonButton shape="round" fill="outline" onClick={() => { addToBreak(3); }}>
                        <IonIcon slot="icon-only" src="/plus3.svg"></IonIcon>
                    </IonButton>
                    <IonButton shape="round" fill="outline" onClick={() => { addToBreak(4); }}>
                        <IonIcon slot="icon-only" src="/plus4.svg"></IonIcon>
                    </IonButton>
                    <IonButton shape="round" fill="outline" onClick={() => { addToBreak(5); }}>
                        <IonIcon slot="icon-only" src="/plus5.svg"></IonIcon>
                    </IonButton>
                    <IonButton shape="round" fill="outline" onClick={() => { addToBreak(6); }}>
                        <IonIcon slot="icon-only" src="/plus6.svg"></IonIcon>
                    </IonButton>
                    <IonButton shape="round" fill="outline" onClick={() => { addToBreak(7); }}>
                        <IonIcon slot="icon-only" src="/plus7.svg"></IonIcon>
                    </IonButton>
                    <IonButton shape="round" fill="outline">
                        <IonIcon slot="icon-only" src="/minus.svg"></IonIcon>
                    </IonButton>
                </div>
            </div>
            <div className="Player-general-container">
                <button className="Player-general effect1" onClick={() => { addToTotal(); clearBreak(); }}>
                    <h4>Submit</h4>
                </button>
                <button className="Player-general effect2" onClick={() => { clearBreak(); }}>
                    <h4>Reset Break</h4>
                </button>
                <button className="Player-general effect2" onClick={() => { clearBreak(); clearTotal(); }}>
                    <h4>Clear All</h4>
                </button>
            </div>
        </>
    );


};

export default Scene;