import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";
import styled from 'styled-components';
import { CircularProgress } from '@material-ui/core';

import LobbyGames from './LobbyGame';

import blueBG from '../../assets/circle blues/circle-blues.png';
import StyledButton from '../StyledButton';
import CreateLobbyGame from './CreateLobbyGame';

import {
  requestAvailableGames,
  loadAvailableGamesSuccess,
  loadAvailableGamesError,
} from "../../actions";

const Lobby = () => {
  const dispatch = useDispatch();
  const settings = useSelector((state) => state.settings);
  const userInfo = useSelector((state) => state.userInfo);
  const [lobbyGames, setLobbyGames] = useState(null);
  const [mounting, setMounting] = useState(true);
  

  React.useEffect(()=>{
    if (mounting) { 
      dispatch(requestAvailableGames());
      fetch('/be/lobby/view', {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => {
        if (res.status === 200) {
          res.json().then((data) => {
            dispatch(loadAvailableGamesSuccess());
            setLobbyGames(data.lobbyGames);
          });
        } else {
          console.log('res',res);
          dispatch(loadAvailableGamesError());
          setLobbyGames(['The ship has sailed...  Check the dock once more?'])
        }
      })
    }
    return () => {
      setMounting(false);
    }
  }, [])  //use Websockets to listen for changes to the database?

  // if (lobbyGames !== null) {
  //   lobbyGames.forEach((lobby) => {
  //     console.log(lobby);
  //   })
  // }
  // console.log('lobbyGames',lobbyGames)


  return (
    <Wrapper>
      {lobbyGames === null ? (
        <CircularProgress/>
      ) : (
        lobbyGames.map((game) => {
          return (
            <LobbyGames
            setLobbyGames = {setLobbyGames}
            lobbyGames = {lobbyGames}
            key = {game.Player1}
            gameInfo = {game}
            />
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

