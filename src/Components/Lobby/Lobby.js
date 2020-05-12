import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import styled from 'styled-components';
import { CircularProgress } from '@material-ui/core';
import { BrowserRouter as Router, Redirect } from "react-router-dom";
import blueBG from '../../assets/circle blues/circle-blues.png';

import socketIOClient from "socket.io-client";

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
  
  const socket = socketIOClient.connect('http://localhost:8899', {
    headers: {
      "Access-Control-Allow-Origin": "http://localhost:3000"
    },
    httpNodeCors: {
      origin: "*",
      methods: "GET,PUT,POST,DELETE"
    },
  });
  
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

console.log('re-rendered');

  return (
    <Wrapper>
      {lobbyGames === null ? (
        <CircularProgress/>
      ) : (
        lobbyGames.map((game) => {
          return (
            'hi'
            // <LobbyGames
            // setLobbyGames = {setLobbyGames}
            // lobbyGames = {lobbyGames}
            // key = {game.Player1}
            // gameInfo = {game}
            // />
          )
        })
      )}
    </Wrapper>
  )
}
export default Lobby;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  align-items: center;
`
const RowDiv = styled.div`
  display:flex;
  flex-direction: row;
`
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

