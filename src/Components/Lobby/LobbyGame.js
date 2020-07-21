import React from 'react';
import { useSelector } from "react-redux";
import styled from 'styled-components';

import Player from './Player';

const LobbyGame = ({gameInfo, lobbyGames, setLobbyGames, setPlayerInLobbyGame}) => {
  const userInfo = useSelector((state) => state.userInfo);
  
  // console.log('gameInfo',gameInfo)

  if (!gameInfo) {
    console.log("gameInfo not available - bailing")
    return (
      <></>
    )
  }

// console.log('gameInfo',gameInfo)

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
        />
      }
      <Versus>
        vs
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
        />
      }
    </Wrapper>
  )
}

// {gameInfo && gameInfo.Player2 && userInfo && userInfo.currentGame ? (
//   <Player
//   playerNumber = "Player2"
//   gameInfo = {gameInfo}
//   name = {gameInfo.Player2}
//   wealth = {gameInfo.Player1Wealth2}
//   />
// ) : (
//   userInfo.currentGame && userInfo.currentGame.Player1 === gameInfo.Player1 ? (
//     <Player
//     playerNumber = "Player2"
//     gameInfo = {gameInfo}
//     name = {userInfo.user ? userInfo.user.userName : "no-account"}
//     wealth = {userInfo.user ? userInfo.user.accumulatedWealth : 0}
//     />
//   ) : (
//     <JoinLobbyGame
//     gameInfo = {gameInfo}
//     />
//   )
// )}



export default LobbyGame;

const Versus = styled.div`
height: 100%;
width: 20%;
font-size: 1.5em;
color: white;
display: flex;
justify-content: center;
align-items: center;
`

const Wrapper = styled.div`
width: 600px;
height: 200px;
border: 5px solid purple;
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
text-align: center;
margin: 3px;
`

