import React from 'react';
import styled from 'styled-components';

const PastGame = ({ gameInfo, bold }) => {

  let day = gameInfo.date.slice(4, 10);
  const time = gameInfo.date.slice(16, 24);
  if (!day) {day = "Date"}

  return (
    <RowDivEven>
      <StyledP
      width = '10%'
      bold = {bold}
      >
        {gameInfo.type}
      </StyledP>
      {gameInfo.opponent ? (
        <StyledP
        width = '35%'
        bold = {bold}
        >
          {gameInfo.opponent}
        </StyledP>
      ) : (
        <StyledP
      width = '35%'
      bold = {bold}
      >
          Yourself
        </StyledP>
      )}
        <StyledP
        width = '20%'
        bold = {bold}
        >
        {gameInfo.result}
        </StyledP>
        <StyledP
      width = '35%'
      bold = {bold}
      >
        {day} {time}
      </StyledP>
    </RowDivEven>
  )
}
export default PastGame;

const StyledP = styled.p`
  width: ${props => props.width};
  font-weight: ${props => props.bold === 'true' && 'bold'};
`

const RowDivEven = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  width: 100%;
  padding-left: 20px;
  /* border: white 1px solid; */
`

