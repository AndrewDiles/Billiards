import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import styled from 'styled-components';
import { CircularProgress } from '@material-ui/core';
import { Redirect } from "react-router-dom";
import blueBG from '../../assets/circle blues/circle-blues.png';

import OpenLobbyButton from './OpenLobbyButton';
import LobbyGame from "./LobbyGame";

// import socketIOClient from "socket.io-client";

import {
  requestAvailableGames,
  loadAvailableGamesSuccess,
  loadAvailableGamesError,
} from "../../actions";

const Lobby = () => {
  const dispatch = useDispatch();
  const settings = useSelector((state) => state.settings);
  const userInfo = useSelector((state) => state.userInfo);
  const [lobbyGames, setLobbyGames] = useState([]);
  const [fetchedLobbyData, setFetchedLobbyData] = useState(false);
  const [playerInLobbyGame, setPlayerInLobbyGame] = useState(false);
  const [currentTime, setCurrentTime] = React.useState(Date.now());
  
  // const socket = socketIOClient.connect('http://localhost:8899', {
  //   headers: {
  //     "Access-Control-Allow-Origin": "http://localhost:3000"
  //   },
  //   httpNodeCors: {
  //     origin: "*",
  //     methods: "GET,PUT,POST,DELETE"
  //   },
  // });
  
  React.useEffect(()=>{
    const updateTime = setInterval(()=>{
      setCurrentTime(Date.now())
    },500)
    return () => {
      // console.log('Timeout removed');
      clearInterval(updateTime);
    }
  },[])

  React.useEffect(()=>{

    const getLobbyInfo = () => {
      // bailing if on wrong page as failsafe
      if (!window.location.href.includes("view-lobby")) return;
      //bailing if redux is alreadying in process of manipulating state / lobby info (i.e. waiting for backend)
      if (settings.status === "readying" || 
      settings.status === "un-readying" || 
      settings.status === "leaving" ||
      settings.status === "creating"
      ) return;
      
      dispatch(requestAvailableGames());
      // fetch('/be/lobby/view', {
      fetch('/be/lobby/poll', {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => {
        if (res.status === 200) {
          res.json().then((data) => {
            if (settings.status === "readying" || 
            settings.status === "un-readying" || 
            settings.status === "leaving" ||
            settings.status === "creating" ||
            !window.location.href.includes("view-lobby")
            ) return;
            else if (!window.location.href.includes("view-lobby")) {
              dispatch(loadAvailableGamesError());
              return;
            }
            setFetchedLobbyData(true);
            let lobbiesToDisplay = data.lobbyGames;
            data.lobbyGames.forEach((game)=>{
              if (game.Player1 === userInfo.user.userName || game.Player2 === userInfo.user.userName) {
                lobbiesToDisplay = [game];
                setPlayerInLobbyGame(true);
              }
            })
            setLobbyGames(lobbiesToDisplay);
            dispatch(loadAvailableGamesSuccess());
          });
        } else {
          console.log('error: res',res);
          dispatch(loadAvailableGamesError());
        }
      })
    }
    let interval = setInterval(getLobbyInfo,1000);
    // setTimeout(getLobbyInfo, 1000);
    return () => {
      clearInterval(interval);
    }
  }, [dispatch,settings.status,userInfo.user.userName])

  if (!userInfo.user) {
    return (
      <Redirect to="/home" />
    )
  }

  return (
    <Wrapper>
      {lobbyGames === null ? (
        <CircularProgress/>
      ) : (
        <>
        {!playerInLobbyGame && fetchedLobbyData &&
          <OpenLobbyButton
          setPlayerInLobbyGame = {setPlayerInLobbyGame}
          setLobbyGames = {setLobbyGames}
          disabled = {userInfo.status === 'creating'}
          />
        }
          {lobbyGames.map((game) => {
            return (
              <LobbyGame
              setLobbyGames = {setLobbyGames}
              lobbyGames = {lobbyGames}
              key = {game.Player1}
              gameInfo = {game}
              setPlayerInLobbyGame = {setPlayerInLobbyGame}
              currentTime = {currentTime}
              />
            )
          })}
        </>
      )
      }
    </Wrapper>
  )
}
export default Lobby;

// const Column = styled.div`
//   display: flex;
//   flex-direction: column;
//   width: 50%;
//   align-items: center;
// `
// const RowDiv = styled.div`
//   display:flex;
//   flex-direction: row;
// `
const Wrapper = styled.div`
color: linen;
/* background-color: lightgray; */
background-image: url(${blueBG});
/* top:0;
left: 0; */
min-width: 100vw;
min-height: 100vh;
/* position: static; */
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
text-align: center;
`