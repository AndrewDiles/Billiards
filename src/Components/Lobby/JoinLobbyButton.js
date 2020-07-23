import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";
import styled from 'styled-components';

import StyledButton from '../StyledButton';

import {
  requestJoinGame,
  joinGameSuccess,
  joinGameError,
} from "../../actions";


const JoinLobbyButton = ({ gameInfo, setLobbyGames, lobbyGames, currentTime }) => {
  const userInfo = useSelector((state) => state.userInfo);
  const [joinLobbyMessage, setJoinLobbyMessage] = React.useState(null);
  const dispatch = useDispatch();

  let handleClick = () => {
    dispatch(requestJoinGame());
    let player2Name = userInfo.user.userName;
    let player2Wealth = userInfo.user.accumulatedWealth;
    fetch('/be/lobby/join', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ 
        player1: gameInfo.Player1,
        player2: player2Name,
        player2Wealth: player2Wealth,
      }),
    }).then((res) => {
      if (res.status === 200) {
        let newGameInfo = {...gameInfo};
        newGameInfo.Player2 = userInfo.user.userName;
        newGameInfo.Player2Wealth = userInfo.user.accumulatedWealth;
        dispatch(joinGameSuccess({
          newGameInfo : newGameInfo,
        }));
        let replacementLobbyGames = [...lobbyGames];
        replacementLobbyGames.Player2 = newGameInfo.Player2;
        replacementLobbyGames.Player2Wealth = newGameInfo.Player2Wealth;
        setLobbyGames(replacementLobbyGames);
      } else {
        console.log('res from join lobby game',res);
        dispatch(joinGameError());
        setJoinLobbyMessage(res.error);
        setTimeout(()=> {setJoinLobbyMessage(null)}, 3000);
      }
    })
  }

  let disabled = userInfo.currentGame || joinLobbyMessage !== null;

  return (
    <Wrapper>
      <h4>
        Wait: {Math.floor((currentTime - gameInfo.timeOpened)/1000)}s
      </h4>
      {joinLobbyMessage !== null ? (
        <h5>
        {joinLobbyMessage}
        </h5>
      ): (
        userInfo.user && gameInfo.Player1 === userInfo.user.userName ? (
          'WAITING FOR OPPONENT'
        ) : (
          <StyledButton
          handleClick = {handleClick}
          disabled = {disabled}
          >
            JOIN
          </StyledButton>
        )
      )}
      
    </Wrapper>
  )
}
export default JoinLobbyButton;



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