import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { CircularProgress } from '@material-ui/core';

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
            {userInfo.status === "creating" ? (
              <CircularProgress
              size = '12px'
              />
            ) : (
              "OPEN LOBBY"
            )}
            {/* OPEN LOBBY */}
          </StyledButton>
  )
}
export default OpenLobbyButton;