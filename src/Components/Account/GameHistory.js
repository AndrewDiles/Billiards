import React from 'react';
import { useSelector } from "react-redux";
import styled from 'styled-components';

import PastGame from './PastGame';

import coin from '../../assets/spinningDubloon.gif';

const GameHistory = () => {
  const settings = useSelector((state) => state.settings);
  const userInfo = useSelector((state) => state.userInfo);

  return (
    <>
      <h3>
        YOUR PAST GAMES
      </h3>
      <ColDivEven>
        {userInfo.user.gameHistory.map((gameInfo)=>{
          return (
            <PastGame
              key = {gameInfo}
              gameInfo = {gameInfo}
            />
          )
        })}
      </ColDivEven>
    </>
  )
}
export default GameHistory;
const StyledImg = styled.img`
  align-self: center;
  margin-left: 10px;
`
const RowDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  text-align: center;
`

const ColDivEven = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  text-align: center;
  width: 100%;
`

