import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import styled from 'styled-components';
import { CircularProgress } from '@material-ui/core';
import { BrowserRouter as Router, Redirect } from "react-router-dom";
import blueBG from '../../assets/circle blues/circle-blues.png';
import StyledButton from '../StyledButton';

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
  const [playerInLobbyGame, setPlayerInLobbyGame] = useState(false);
  
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

    const getLobbyInfo = () => {
      // bailing if on wrong page as failsafe
      if (!window.location.href.includes("view-lobby")) return;
      //bailing if redux is alreadying in process of manipulating state / lobby info (i.e. waiting for backend)
      if (settings.status === "readying" || settings.status === "un-readying" || settings.status === "leaving") return;
      
      dispatch(requestAvailableGames());
      
      fetch('/be/lobby/view', {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => {
        if (res.status === 200) {
          res.json().then((data) => {
            // console.log('lobby info returned:', data);
            dispatch(loadAvailableGamesSuccess());
            let lobbiesToDisplay = data.lobbyGames;
            data.lobbyGames.forEach((game)=>{
              if (game.Player1 === userInfo.user.userName || game.Player2 === userInfo.user.userName) {
                lobbiesToDisplay = [game];
                setPlayerInLobbyGame(true);
              }
            })
            // console.log('lobby info returned:', data.lobbyGames);
            // console.log('lobby info reduced to:', lobbiesToDisplay);
            // setLobbyGames(data.lobbyGames);
            setLobbyGames(lobbiesToDisplay);
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
  }, [])

  if (!userInfo.user) {
    return (
      <Redirect to="/home" />
    )
  }
  
  // React.useEffect(()=>{
  //   // if (mounting) { 
  //     dispatch(requestAvailableGames());
  //     fetch('/be/lobby/view', {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     }).then((res) => {
  //       if (res.status === 200) {
  //         res.json().then((data) => {
  //           dispatch(loadAvailableGamesSuccess());
  //           setLobbyGames(data.lobbyGames);
  //         });
  //       } else {
  //         console.log('res',res);
  //         dispatch(loadAvailableGamesError());
  //         setLobbyGames(['The ship has sailed...  Check the dock once more?'])
  //       }
  //     })
  //   // }
  //   // return () => {
  //   //   setMounting(false);
  //   // }
  // }, [])  //use Websockets to listen for changes to the database?
  
  // if (socket === undefined) {
  //   console.log('socket not established')
  // }
  // else {
  //   console.log('socket connection establish');
  //   // get lobby info
  //   socket.on('connection', function(data){
  //       console.log('data:',data);
  //       if(data.length){
  //           // set data into state...
  //       }
  //       else {
  //         console.log("No lobbies found")
  //       }
  //   });
  // }

  // let lobbyPlayerIsIn = null;
  // if (lobbyGames.length > 0) {
  //   lobbyGames.forEach((game) => {
  //     if (game.playerOne === userInfo.user.userName || game.playerTwo === userInfo.user.userName) {
  //       lobbyPlayerIsIn = game;
  //     }
  //   })
  // }
  const handleCreateMatch = () => {

  }

  return (
    <Wrapper>
      {lobbyGames === null ? (
        <CircularProgress/>
      ) : (
        <>
        {/* lobbyPlayerIsIn === null ? ( */}
        {playerInLobbyGame === false && 
            <StyledButton
          handleClick = {handleCreateMatch}
          disabled = {userInfo.status === 'creating-match'}
          >
            OPEN LOBBY
          </StyledButton>
}
          {lobbyGames.map((game) => {
            // console.log(game);
            return (
              <LobbyGame
              setLobbyGames = {setLobbyGames}
              lobbyGames = {lobbyGames}
              key = {game.Player1}
              gameInfo = {game}
              setPlayerInLobbyGame = {setPlayerInLobbyGame}
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