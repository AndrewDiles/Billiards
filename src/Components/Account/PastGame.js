import React from 'react';
import styled from 'styled-components';

const PastGame = ({ gameInfo }) => {

  const day = gameInfo.date.slice(4, 10);
  const time = gameInfo.date.slice(16, 24);

  return (
    <RowDivEven>
      <p>
        Type: {gameInfo.type}
      </p>
      {gameInfo.opponent ? (
        <p>
          Opponent:  {gameInfo.opponent}
        </p>
      ) : (
        <p>
          Opponent: Yourself
        </p>
      )}
        Result: {gameInfo.result}
      <p>
        Date: {day} {time}
      </p>
    </RowDivEven>
  )
}
export default PastGame;

const RowDivEven = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  text-align: center;
  width: 100%;
  border: white 1px solid;
`

