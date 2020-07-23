import React from 'react';
import styled from 'styled-components';

import Player from './Player';

const LobbyGame = ({gameInfo, lobbyGames, setLobbyGames, setPlayerInLobbyGame, currentTime}) => {
  if (!gameInfo) {
    console.log("gameInfo not available - bailing")
    return (
      <></>
    )
  }

// sample gameInfo:
// Player1: "Scubba Joe"
// Player1Ready: false
// Player1Wealth: 2500
// Player2: null
// Player2Ready: false
// Player2Wealth: null
// gameOngoing: false
// timeOpened: 1588487347739
// console.log('gameInfo', gameInfo)
// console.log('gameInfo.Player1', gameInfo.Player1)
// console.log(gameInfo && gameInfo.Player1)
  return (
    <Wrapper>
      {gameInfo &&
        <Player
        playerNumber = "Player1"
        gameInfo = {gameInfo}
        name = {gameInfo.Player1}
        wealth = {gameInfo.Player1Wealth}
        ready = {gameInfo.Player1Ready}
        lobbyGames = {lobbyGames}
        setLobbyGames = {setLobbyGames}
        setPlayerInLobbyGame = {setPlayerInLobbyGame}
        currentTime = {currentTime}
        />
      }
      <Versus
      gameInfo = {gameInfo}
      >
        {(gameInfo.Player1Ready && gameInfo.Player2Ready) ? (
          "multi-player not yet ready"
        ) : (
          'vs'
        ) }
      </Versus>
      {gameInfo && 
        <Player
        playerNumber = "Player2"
        gameInfo = {gameInfo}
        name = {gameInfo.Player2}
        wealth = {gameInfo.Player2Wealth}
        ready = {gameInfo.Player2Ready}
        lobbyGames = {lobbyGames}
        setLobbyGames = {setLobbyGames}
        setPlayerInLobbyGame = {setPlayerInLobbyGame}
        currentTime = {currentTime}
        />
      }
    </Wrapper>
  )
}
export default LobbyGame;

const Versus = styled.div`
height: 100%;
width: 20%;
font-size: 1.5em;
color: white;
display: flex;
justify-content: center;
align-items: center;
background-color: ${props => props.gameInfo.Player1Ready && props.gameInfo.Player2Ready && 'rgba(0,255,0,0.25)'};
`

const Wrapper = styled.div`
width: 600px;
height: 200px;
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
text-align: center;
margin: 3px;
border: white 1px solid;
background-color: rgba(255,255,255,0.05);
border-radius: 25px;
`

