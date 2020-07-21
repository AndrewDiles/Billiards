import React from 'react';
import styled from 'styled-components';

const PastGame = ({ gameInfo }) => {

  let day = gameInfo.date.slice(4, 10);
  const time = gameInfo.date.slice(16, 24);
  if (!day) {day = "Date"}

  return (
    <RowDivEven>
      <p>
        {gameInfo.type}
      </p>
      {gameInfo.opponent ? (
        <p>
          {gameInfo.opponent}
        </p>
      ) : (
        <p>
          Yourself
        </p>
      )}
        {gameInfo.result}
      <p>
        {day} {time}
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

