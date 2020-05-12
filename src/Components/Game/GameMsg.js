import React from 'react';
import { useSelector } from "react-redux";
import styled from 'styled-components';

const GameMsg = () => {
  const settings = useSelector((state) => state.settings);
  const userInfo = useSelector((state) => state.userInfo);
  const billiardsInfo = useSelector((state) => state.billiards);

  let width = '950px';
  if (settings.tableSize === "full") width = '1550px';
  else if (settings.tableSize === "narrow") width = '750px';
  let activePlayer = '';
  let status = settings.gameStatus;
  let sinkObjective = '';
  if (billiardsInfo.gameType === 'eight') {
    // console.log('userInfo.currentGame',userInfo.currentGame)
    // console.log('userInfo.currentGame.activePlayer',userInfo.currentGame.activePlayer)
    // console.log('userInfo.currentGame[userInfo.currentGame.activePlayer]',userInfo.currentGame[userInfo.currentGame.activePlayer])
    activePlayer = `${userInfo.currentGame[userInfo.currentGame.activePlayer].name}'s turn `;
    if (userInfo.currentGame.player1.ballType) {
      sinkObjective = ` - sinks ${userInfo.currentGame[userInfo.currentGame.activePlayer].ballType}`;
    }
  }
  else if (billiardsInfo.gameType === 'test') {
    activePlayer = 'Have fun testing '
  }
  let gameOver = null;
  let winnerText = null;
  if (userInfo.status === "game-over") {
    gameOver = 'GAME OVER - - ';
    if (billiardsInfo.gameType === 'eight') {
      winnerText = `${userInfo.currentGame[userInfo.currentGame.gameWinner].name} wins!`;
    }
    else if (billiardsInfo.gameType === 'nine') {
      winnerText = `you won in ${userInfo.currentGame.player1GameInfo.numberOfShots} shot`;
      if (userInfo.currentGame.player1GameInfo.numberOfShots === 1) {
        winnerText += '!';
      }
      else {
        winnerText += 's!';
      }
    }
  }

  return (
    <StyledSpan
    width = {width}
    >
      {gameOver ? (
        <>
        {gameOver} {winnerText}
        </>
      ): (
        <>
        {activePlayer} {sinkObjective} {status !== "idle" && status}
        </>
      )}
      
    </StyledSpan>
  )
}
export default GameMsg;

const StyledSpan = styled.span`
  z-index: 8;
  position: absolute;
  top: 0;
  width: ${props=> props.width && props.width};
  text-align: center;
  color: white;
  font-size: 1.5em;
`
// z-index 8