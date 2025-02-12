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
import "./Scoring.css";
// import "./styles.css";

const SnookerScoringApp: React.FC = () => {
  const [playerOneName, setPlayerOneName] = useState("Player 1");
  const [playerTwoName, setPlayerTwoName] = useState("Player 2");
  const [playerOneScore, setPlayerOneScore] = useState(0);
  const [playerTwoScore, setPlayerTwoScore] = useState(0);
  const [playerOneFouls, setPlayerOneFouls] = useState(0);
  const [playerTwoFouls, setPlayerTwoFouls] = useState(0);
  const [frame, setFrame] = useState(1);
  const [playerOneWins, setPlayerOneWins] = useState(0);
  const [playerTwoWins, setPlayerTwoWins] = useState(0);
  const [history, setHistory] = useState<string[]>([]);
  const [undoStack, setUndoStack] = useState<any[]>([]);

  const scores = [1, 2, 3, 4, 5, 6, 7]; // Snooker ball points
  const foulPoints = [4, 5, 6, 7]; // Foul penalties

  const clearAll = () => {
    setPlayerOneScore(0);
    setPlayerTwoScore(0);
    setPlayerOneFouls(0);
    setPlayerTwoFouls(0);
    setFrame(1);
    setPlayerOneWins(0);
    setPlayerTwoWins(0);
    setHistory([]);
    setUndoStack([]);
  };

  const addScore = (player: string, points: number) => {
    setUndoStack([...undoStack, { playerOneScore, playerTwoScore, history }]);
    if (player === playerOneName) {
      setPlayerOneScore(playerOneScore + points);
    } else {
      setPlayerTwoScore(playerTwoScore + points);
    }
    setHistory([...history, `${player} scored ${points} points`]);
  };

  const addFoul = (foulingPlayer: string, points: number) => {
    setUndoStack([
      ...undoStack,
      {
        playerOneScore,
        playerTwoScore,
        playerOneFouls,
        playerTwoFouls,
        history,
      },
    ]);
    if (foulingPlayer === playerOneName) {
      setPlayerOneFouls(playerOneFouls + 1);
      setPlayerTwoScore(playerTwoScore + points);
    } else {
      setPlayerTwoFouls(playerTwoFouls + 1);
      setPlayerOneScore(playerOneScore + points);
    }
    setHistory([
      ...history,
      `${foulingPlayer} committed a foul, ${points} points awarded to opponent`,
    ]);
  };

  const undoLastAction = () => {
    if (undoStack.length > 0) {
      const lastState = undoStack.pop();
      setPlayerOneScore(lastState.playerOneScore);
      setPlayerTwoScore(lastState.playerTwoScore);
      if (lastState.playerOneFouls !== undefined)
        setPlayerOneFouls(lastState.playerOneFouls);
      if (lastState.playerTwoFouls !== undefined)
        setPlayerTwoFouls(lastState.playerTwoFouls);
      setHistory(lastState.history);
      setUndoStack([...undoStack]);
    }
  };

  const nextFrame = () => {
    setUndoStack([]);
    if (playerOneScore > playerTwoScore) {
      setPlayerOneWins(playerOneWins + 1);
    } else if (playerTwoScore > playerOneScore) {
      setPlayerTwoWins(playerTwoWins + 1);
    }
    setPlayerOneScore(0);
    setPlayerTwoScore(0);
    setPlayerOneFouls(0);
    setPlayerTwoFouls(0);
    setFrame(frame + 1);
    setHistory([]);
  };

  return (
    <>
      <IonCard className="score-card">
        <IonCardContent>
          <div className="frame">Frame: {frame}</div>
          <IonGrid>
            <IonRow>
              <IonCol className="player-col player1">
                <div className="player-name">
                  <IonInput value={playerOneName} onIonChange={(e) => setPlayerOneName(e.detail.value!)} placeholder="Enter Name"/>
                </div>
                <div className="score">Score: {playerOneScore}</div>
                <div className="foul">Fouls: {playerOneFouls}</div>
                <div className="win">Wins: {playerOneWins}</div>
              </IonCol>
              <IonCol className="player-col player2">
                <div className="player-name">
                  <IonInput value={playerTwoName} onIonChange={(e) => setPlayerTwoName(e.detail.value!)} placeholder="Enter Name"/>
                </div>
                <div className="score">Score: {playerTwoScore}</div>
                <div className="foul">Fouls: {playerTwoFouls}</div>
                <div className="win">Wins: {playerTwoWins}</div>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonCardContent>
      </IonCard>

      <IonCard className="ball-card">
        <IonGrid>
          <IonRow>
            <IonCol className="ball-col player1">
              <IonGrid>
                <IonRow class="ion-justify-content-center ball-pot">
                  {scores.map((points) => (
                    <IonCol key={points} size="3" sizeSm="12/7" sizeMd="1.5" sizeXl="1" style={{ padding: "0" }}>
                      <IonButton size="small" shape="round" fill="clear" onClick={() => addScore(playerOneName, points)} className="click-effect" >
                        <IonIcon slot="icon-only" src={"/plus" + points.toString() + ".svg"} size="large"></IonIcon>
                      </IonButton>
                    </IonCol>
                  ))}
                </IonRow>
                <IonRow class="ion-justify-content-center ball-foul">
                  {foulPoints.map((points) => (
                    <IonCol size="3" sizeSm="2" sizeMd="1.5" sizeXl="1" key={points} style={{ padding: "0" }}>
                      <IonButton size="small" shape="round" fill="clear" onClick={() => addFoul(playerOneName, points)} className="click-effect">
                        <IonIcon slot="icon-only" src={"/minus" + points.toString() + ".svg"} size="large"></IonIcon>
                      </IonButton>
                    </IonCol>
                  ))}
                </IonRow>
              </IonGrid>
            </IonCol>

            <IonCol className="ball-col player2">
              <IonGrid>
                <IonRow  className="ion-justify-content-center ball-pot"  >
                  {scores.map((points) => (
                    <IonCol key={points} size="3" sizeSm="12/7" sizeMd="1.5" sizeXl="1" style={{ padding: "0" }}>
                      <IonButton size="small" shape="round" fill="clear" onClick={() => addScore(playerTwoName, points)} className="click-effect">
                        <IonIcon slot="icon-only" src={"/plus" + points.toString() + ".svg"} size="large"></IonIcon>
                      </IonButton>
                    </IonCol>
                  ))}
                </IonRow>
                <IonRow className="ion-justify-content-center ball-foul">
                  {foulPoints.map((points) => (
                    <IonCol size="3" sizeSm="2" sizeMd="1.5" sizeXl="1" key={points} style={{ padding: "0" }}>
                      <IonButton size="small" shape="round" fill="clear" onClick={() => addFoul(playerOneName, points)} className="click-effect">
                        <IonIcon slot="icon-only" src={"/minus" + points.toString() + ".svg"} size="large"></IonIcon>
                      </IonButton>
                    </IonCol>
                  ))}
                </IonRow>
              </IonGrid>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonCard>
      
      <IonButton expand="full" color="medium" onClick={undoLastAction}>
        Undo Last Action
      </IonButton>
      <IonButton expand="full" color="success" onClick={nextFrame}>
        Next Frame
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

export default SnookerScoringApp;
