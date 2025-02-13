import { useState } from "react";
import {
  IonApp,
  IonButton,
  IonContent,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardContent,
  IonGrid,
  IonRow,
  IonCol,
  IonInput,
  IonIcon,
} from "@ionic/react";
import "@ionic/react/css/core.css";
import "./EightBall.css";
import { trophyOutline } from "ionicons/icons";

const EightBallScoringApp: React.FC = () => {
  const [playerOneName, setPlayerOneName] = useState("Player 1");
  const [playerTwoName, setPlayerTwoName] = useState("Player 2");
  const [playerOneWins, setPlayerOneWins] = useState(0);
  const [playerTwoWins, setPlayerTwoWins] = useState(0);
  const [history, setHistory] = useState<string[]>([]);
  const [undoStack, setUndoStack] = useState<any[]>([]);

  const clearAll = () => {
    setPlayerOneWins(0);
    setPlayerTwoWins(0);
    setHistory([]);
    setUndoStack([]);
  };

  const addWin = (player: string) => {
    setUndoStack([...undoStack, { playerOneWins, playerTwoWins, history }]);
    if (player === playerOneName) {
      setPlayerOneWins(playerOneWins + 1);
    } else {
      setPlayerTwoWins(playerTwoWins + 1);
    }
    setHistory([...history, `${player} won the frame`]);
  };

  // const addScore = (player: string, points: number) => {
  //   setUndoStack([...undoStack, { playerOneScore, playerTwoScore, history }]);
  //   if (player === playerOneName) {
  //     setPlayerOneScore(playerOneScore + points);
  //   } else {
  //     setPlayerTwoScore(playerTwoScore + points);
  //   }
  //   setHistory([...history, `${player} scored ${points} points`]);
  // };

  const undoLastAction = () => {
    if (undoStack.length > 0) {
      const lastState = undoStack.pop();
      setPlayerOneWins(lastState.playerOneWins);
      setPlayerTwoWins(lastState.playerTwoWins);
      setHistory(lastState.history);
      setUndoStack([...undoStack]);
    }
  };

  // const undoLastAction = () => {
  //   if (undoStack.length > 0) {
  //     const lastState = undoStack.pop();
  //     setPlayerOneScore(lastState.playerOneScore);
  //     setPlayerTwoScore(lastState.playerTwoScore);
  //     if (lastState.playerOneFouls !== undefined)
  //       setPlayerOneFouls(lastState.playerOneFouls);
  //     if (lastState.playerTwoFouls !== undefined)
  //       setPlayerTwoFouls(lastState.playerTwoFouls);
  //     setHistory(lastState.history);
  //     setUndoStack([...undoStack]);
  //   }
  // };

  return (
    <>
      <IonCard className="score-card">
        <IonCardContent>
          {/* <div className="frame">Frame: {frame}</div> */}
          <IonGrid>
            <IonRow>
              <IonCol className="player-col player1">
                <div className="player-name">
                  <IonInput value={playerOneName} onIonChange={(e) => setPlayerOneName(e.detail.value!)} placeholder="Enter Name"/>
                </div>
                <div className="eightball-win">{playerOneWins}</div>
              </IonCol>
              <IonCol className="player-col player2">
                <div className="player-name">
                  <IonInput value={playerTwoName} onIonChange={(e) => setPlayerTwoName(e.detail.value!)} placeholder="Enter Name"/>
                </div>
                <div className="eightball-win">{playerTwoWins}</div>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonButton color="success" shape="round" onClick={() => addWin(playerOneName)}>
                  {/* {playerOneName} Wins */}
                  <IonIcon slot="start" icon={trophyOutline}></IonIcon>
                  +1 
                </IonButton>
              </IonCol>
              <IonCol>
                <IonButton color="success" shape="round" onClick={() => addWin(playerTwoName)}>
                  {/* {playerTwoName} Wins  */}
                  <IonIcon slot="start" icon={trophyOutline}></IonIcon>
                  +1
                </IonButton>
              </IonCol>
              
            </IonRow>
          </IonGrid>
        </IonCardContent>
      </IonCard>
      
      <IonButton expand="full" color="medium" onClick={undoLastAction}>
        Undo Last Action
      </IonButton>
      <IonCard className="history-card">
        <IonCardContent>
          <h3>Score History</h3>
          <ul>
            {history.toReversed().map((entry, index) => (
              <li key={index}>{entry}</li>
            ))}
          </ul>
        </IonCardContent>
      </IonCard>
      <IonButton expand="full" color="danger" onClick={clearAll}>Clear All</IonButton>
    </>
  );
};

export default EightBallScoringApp;
