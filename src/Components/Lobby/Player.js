import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import styled from 'styled-components';
import { CircularProgress } from '@material-ui/core';

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

const Player = ({ gameInfo, name, wealth, playerNumber, ready, lobbyGames, setLobbyGames, setPlayerInLobbyGame, currentTime }) => {
  const userInfo = useSelector((state) => state.userInfo);
  const dispatch = useDispatch();

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
            if (replacementLobbyGame.Player2 === null) {
              replacementLobbyGame = [];
            }
            setLobbyGames(replacementLobbyGame);
          }
          else if (playerNumber === "Player2") {
            replacementLobbyGame[0].Player2Ready = false;
            replacementLobbyGame[0].Player2 = null;
            replacementLobbyGame[0].Player1Wealth = null;
            if (replacementLobbyGame.Player1 === null) {
              replacementLobbyGame = [];
            }
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
      }
    })
  }

  if (gameInfo === undefined) {
    return (
      <></>
    )
  }

  let playerIsLoggedInPlayer = false;
  if (userInfo.user.userName === name) playerIsLoggedInPlayer = true;

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
    <Wrapper
    ready = {ready}
    playerNumber = {playerNumber}
    >
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
            {userInfo.status === "un-readying" ? (
              <CircularProgress
              size = '12px'
              />
            ) : (
              "NOT READY"
            )}
            {/* NOT READY */}
          </StyledButton>
        ) : (
          <StyledButton
          handleClick = {handleClickReady}
          disabled = {userInfo.status === 'readying'}
          >
            {userInfo.status === "readying" ? (
              <CircularProgress
              size = '12px'
              />
            ) : (
              "READY"
            )}
            {/* READY */}

          </StyledButton>
        )
        }
        <StyledButton
          handleClick = {handleClickLeave}
          disabled = {userInfo.status === 'leaving'}
        >
          {userInfo.status === "leaving" ? (
              <CircularProgress
              size = '12px'
              />
            ) : (
              "LEAVE"
            )}
        {/* LEAVE */}
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
            gameInfo.Player1 !== userInfo.user.userName && gameInfo.Player2 !== userInfo.user.userName &&
            <JoinLobbyButton
            gameInfo = {gameInfo}
            setLobbyGames = {setLobbyGames}
            lobbyGames = {lobbyGames}
            currentTime = {currentTime}
            playerNumber = {playerNumber}
            />
          )}
        </>
      )}
    </Wrapper>
  )
}
export default Player;

const Wrapper = styled.div`
width: 40%;
height: 100%;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
text-align: center;
padding: 3px;
background-color: ${props => props.ready && 'rgba(0,255,0,0.25)'};
border-radius: ${props => props.playerNumber === 'Player1' && '25px 0 0 25px'};
border-radius: ${props => props.playerNumber === 'Player2' && '0 25px 25px 0'};
`

