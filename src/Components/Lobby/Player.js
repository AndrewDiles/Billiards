import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";
import styled from 'styled-components';
// import { CircularProgress } from '@material-ui/core';

import Name from './Name';
import JoinLobbyButton from './JoinLobbyButton';
import StyledButton from '../StyledButton';
import {
  requestSetReady,
  setReadySuccess,
  setReadyError,
  requestSetNotReady,
  setNotReadySuccess,
  setNotReadyError,
  requestLeave,
  leaveSuccess,
  leaveError
} from "../../actions";

const Player = ({ gameInfo, name, wealth, playerNumber, ready, lobbyGames, setLobbyGames, setPlayerInLobbyGame }) => {
  const userInfo = useSelector((state) => state.userInfo);
  const dispatch = useDispatch();
  // const [currentPlayerName, setCurrentPlayerName] = React.useState("no-account");

  // if (userInfo.user) {
  //   setCurrentPlayerName(userInfo.user.userName);
  // }

  // console.log(gameInfo, 'gameInfo from <Player> component');
  // console.log(userInfo.status, 'user.status');
  // console.log('playerNumber',playerNumber, 'name',name,'wealth', wealth)
  // console.log('playerNumber',playerNumber, 'gameInfo',gameInfo)
  // console.log(userInfo.user.userName, 'userName');
  // console.log(lobbyGames,'lobbyGames');

  const handleClickReady = () => {
    dispatch(requestSetReady());
    fetch('/be/lobby/ready', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ 
        player1: gameInfo.Player1,
        player2: gameInfo.Player2,
        readyingPlayerNumber: playerNumber,
      }),
    }).then((res) => {
      if (res.status === 200) {
        res.json().then((data) => {
          // console.log(lobbyGames, 'lobbyGames');
          let replacementLobbyGame = lobbyGames;
          if (playerNumber === "Player1") {
            replacementLobbyGame[0].Player1Ready = true;
            setLobbyGames(replacementLobbyGame);
          }
          else if (playerNumber === "Player2") {
            replacementLobbyGame[0].Player2Ready = true;
            setLobbyGames(replacementLobbyGame);
          }
          else {
            console.log("No playerNumber has been identified...")
          }
          dispatch(setReadySuccess());
        });
      } else {
        console.log('res',res);
        dispatch(setReadyError());
        setLobbyGames(['What be wrong?'])
      }
    })
  }

  const handleClickNotReady = () => {
    dispatch(requestSetNotReady());
    fetch('/be/lobby/not-ready', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ 
        player1: gameInfo.Player1,
        player2: gameInfo.Player2,
        readyingPlayerNumber: playerNumber,
      }),
    }).then((res) => {
      if (res.status === 200) {
        res.json().then((data) => {
          let replacementLobbyGame = lobbyGames;
          if (playerNumber === "Player1") {
            replacementLobbyGame[0].Player1Ready = false;
            setLobbyGames(replacementLobbyGame);
          }
          else if (playerNumber === "Player2") {
            replacementLobbyGame[0].Player2Ready = false;
            setLobbyGames(replacementLobbyGame);
          }
          else {
            console.log("No playerNumber has been identified...")
          }
          dispatch(setNotReadySuccess());
        });
      } else {
        console.log('res',res);
        dispatch(setNotReadyError());
        setLobbyGames(['What be wrong?'])
      }
    })
  }

  const handleClickLeave = () => {
    dispatch(requestLeave());
    fetch('/be/lobby/leave', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ 
        player1: gameInfo.Player1,
        player2: gameInfo.Player2,
        readyingPlayerNumber: playerNumber,
      }),
    }).then((res) => {
      if (res.status === 200) {
        res.json().then((data) => {
          let replacementLobbyGame = lobbyGames;
          if (playerNumber === "Player1") {
            replacementLobbyGame[0].Player1Ready = false;
            replacementLobbyGame[0].Player1 = null;
            replacementLobbyGame[0].Player1Wealth = null;
            setLobbyGames(replacementLobbyGame);
          }
          else if (playerNumber === "Player2") {
            replacementLobbyGame[0].Player2Ready = false;
            replacementLobbyGame[0].Player2 = null;
            replacementLobbyGame[0].Player1Wealth = null;
            setLobbyGames(replacementLobbyGame);
          }
          else {
            console.log("No playerNumber has been identified...")
          }
          setPlayerInLobbyGame(false);
          dispatch(leaveSuccess());
        });
      } else {
        console.log('res',res);
        dispatch(leaveError());
        // setLobbyGames(['What be wrong?'])
      }
    })
  }

  if (gameInfo === undefined) {
    return (
      <></>
    )
  }

// Player1: "Scubba Joe"
// Player1Ready: false
// Player1Wealth: 2500
// Player2: null
// Player2Ready: false
// Player2Wealth: null
// gameOngoing: false
// timeOpened: 1588487347739

  let playerIsLoggedInPlayer = false;
  if (userInfo.user.userName === name) playerIsLoggedInPlayer = true;

  // console.log(gameInfo,'gameInfo');
  // console.log(playerNumber,'playerNumber');

//   gameInfo:
// CurrentTurn: null
// LastGameState: null
// Player1: "Daavy Jones"
// Player1Ready: false
// Player1Wealth: 66666666
// Player2: "a"
// Player2Ready: false
// Player2Wealth: 1035
// gameOngoing: false
// timeOpened: 1587487347739
  let playerNumberReady = `${playerNumber}Ready`;
  return (
    <Wrapper>
      <Name
      name = {name}
      wealth = {wealth}
      />
      {playerIsLoggedInPlayer ? (
        <>
        {gameInfo[playerNumberReady] ? (
          <StyledButton
          handleClick = {handleClickNotReady}
          disabled = {userInfo.status === 'un-readying'}
          >
            {/* 
            
            WAS GOING TO ADD LOADING INDICATOR BUT IT HAPPENS SO FAST IT IS A DISTRACTION

            {userInfo.status === "un-readying" ? (
              <CircularProgress/>
            ) : (
              "NOT READY"
            )
            } */}
            NOT READY
          </StyledButton>
        ) : (
          <StyledButton
          handleClick = {handleClickReady}
          disabled = {userInfo.status === 'readying'}
          >
            READY
          </StyledButton>
        )
        }
        <StyledButton
          handleClick = {handleClickLeave}
          disabled = {userInfo.status === 'leaving'}
        >
        LEAVE
        </StyledButton>
        </>
      ) : (
        <>
          {name ? (
            <>
              {ready ? (
                "READY"
              ) : (
                "NOT-READY"
                // THIS SHOULD ALSO TEST IF THEY HAVE AN OPPONENT AND BE "WAITING FOR MATE" IF THEY DON'T
              )}
            </>
          ) : (
            <JoinLobbyButton
            gameInfo = {gameInfo}
            setLobbyGames = {setLobbyGames}
            lobbyGames = {lobbyGames}
            />
            // "JOIN MATCH"
          )
          }
        </>
      )}
      {/* <RowDiv>
        {gameInfo && gameInfo.Player1 && gameInfo.Player2 && userInfo.user && name === currentPlayerName ? (
          <InLobbyOptions
          gameInfo = {gameInfo}
          />
        ) : (
          <>
          <img src = {coin} alt="A spinning gold coin" height="42" width="42"/>
          {name === "no-account" ? (
            "-"
          ) : ( 
            wealth
          )}
          </>
        )}
        </RowDiv> */}
    </Wrapper>
  )
}
export default Player;

const RowDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  text-align: center;
`

const Wrapper = styled.div`
width: 40%;
height: 100%;
border: 1px solid blue;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
text-align: center;
padding: 3px;
`

