import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";
import styled from 'styled-components';

import InLobbyOptions from './InLobbyOptions';

import StyledButton from '../StyledButton';

import coin from '../../assets/spinningDubloon.gif';

const Player = ({ gameInfo, name, wealth, playerNumber }) => {
  const userInfo = useSelector((state) => state.userInfo);
  const [currentPlayerName, setCurrentPlayerName] = React.useState("no-account");

  if (userInfo.user) {
    setCurrentPlayerName(userInfo.user.userName);
  }

console.log('playerNumber',playerNumber, 'name',name,'wealth', wealth)
console.log('playerNumber',playerNumber, 'gameInfo',gameInfo)

  if (!name || wealth === null || gameInfo === undefined) {
    return (
      <></>
    )
  }

//   Player1: "Scubba Joe"
// Player1Ready: false
// Player1Wealth: 2500
// Player2: null
// Player2Ready: false
// Player2Wealth: null
// gameOngoing: false
// timeOpened: 1588487347739

console.log(playerNumber, 'playerNumber test to see which Players are loading');

  return (
    <Wrapper>
      <h2>
        {name}
      </h2>
      <RowDiv>
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
        </RowDiv>
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

