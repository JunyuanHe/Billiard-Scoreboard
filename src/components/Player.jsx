// import { useSimple } from "core-js/fn/symbol";
import React, { useState } from "react";
import "../theme/utilities.css";
import "./Player.css";

import redBall from "../../public/red.png";

class ClickMe extends React.Component {
    constructor(props) {
      super(props)
      this.state = { fade: false }
    }
    render(props) {
      const fade = this.state.fade
  
      return (
        <button
          ref='button'
          onClick={() => this.setState({ fade: true })}
          onAnimationEnd={() => this.setState({ fade: false })}
          className={fade ? 'fade' : ''}>
          {props.name}
        </button>
      )
    }
  }


const Player = (props) => {
    // const [totalScore, setTotalScore] = useState(0);
    // const [breakScore, setBreakScore] = useState(0);

    // const addToTotal = () => {
    //     setTotalScore(totalScore + breakScore);
    // };

    // const clearTotal = () => {
    //     setTotalScore(0);
    // }

    // const clearBreak = () => {
    //     setBreakScore(0);
    // };

    // const addToBreak = (score) => {
    //     setBreakScore(breakScore + score);
    // };

    return (
        <div>
            <div className="Player-score-container">
                <div className={props.round==true? "Player-score-selected": "Player-score"}>
                    {/* <h3>Score</h3> */}
                    <h1>{props.totalScore}</h1>
                </div>
            </div>
            <div className="Player-score-container">
                <div className={props.round==true? "Player-score-selected": "Player-score"}>
                    {/* <h3>Break</h3> */}
                    <h2>Break: {props.breakScore}</h2>
                </div>
            </div>
        </div>
    );
};

export default Player;