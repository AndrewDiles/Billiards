import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";
import styled from 'styled-components';

import StyledButton from '../StyledButton';

import {
  requestCreate,
  createSuccess,
  createError,
} from "../../actions";


const OpenLobbyButton = ({ setLobbyGames, setPlayerInLobbyGame, disabled }) => {
  const userInfo = useSelector((state) => state.userInfo);
  // const [displayTime, setDisplayTime] = React.useState(null);  May improve appearance of waited time in future
  const dispatch = useDispatch();

  let handleClick = () => {
    dispatch(requestCreate());
    fetch('/be/lobby/create', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ 
        userName: userInfo.user.userName,
        userWealth: userInfo.user.accumulatedWealth,
        currentTime: Date.now(),
      }),
    }).then((res) => {
      if (res.status === 200) {
        res.json().then((data) => {
          // console.log('lobby info returned:', data);
          let newGameInfo = data.lobby;
          dispatch(createSuccess(newGameInfo));
          setPlayerInLobbyGame(true);
          setLobbyGames([newGameInfo]);
        });
      } else {
        console.log('error: res',res);
        dispatch(createError());
      }
    })
  }
  return (
          <StyledButton
          handleClick = {handleClick}
          disabled = {disabled}
          >
            OPEN LOBBY
          </StyledButton>
  )
}
export default OpenLobbyButton;



const Wrapper = styled.div`
width: 40%;
height: 100%;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
text-align: center;
padding: 3px;
`