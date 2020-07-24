import React from 'react';
import { useSelector } from "react-redux";
import styled from 'styled-components';

import PastGame from './PastGame';

const GameHistory = () => {
  const userInfo = useSelector((state) => state.userInfo);

  return (
    <>
      <Styledh3>
        YOUR PAST GAMES
      </Styledh3>
      <ColDivEven>
        <PastGame
          gameInfo = {{type: "Type", opponent: "Opponent", result: "Result", date: "Date"}}
          bold = 'true'
        />
        {userInfo.user.gameHistory.map((gameInfo)=>{
          return (
            <PastGame
              key = {gameInfo.date}
              gameInfo = {gameInfo}
            />
          )
        })}
      </ColDivEven>
    </>
  )
}
export default GameHistory;
const Styledh3 = styled.h3`
  font-weight: bolder;
`

const ColDivEven = styled.div`
  display: flex;
  flex-direction: column;
  /* justify-content: space-evenly; */
  align-items: center;
  text-align: center;
  width: 100%;
`

