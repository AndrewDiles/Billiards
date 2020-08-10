import React from 'react';
import styled from 'styled-components';

import coin from '../../assets/spinningDubloon.gif';

const Name = ({ name, wealth }) => {
  // const userInfo = useSelector((state) => state.userInfo);

  if (name && name.length > 16) {
    name = name.slice(0,15);
    name = name + "-";
  }

  return (
    <Wrapper>
      {name !== null ? (
        <>
          <NameDiv>
            {name}
          </NameDiv>
          <WealthDiv>
            {wealth} <StyledImg src = {coin} alt="A spinning gold coin" height="24" width="24"/>
          </WealthDiv>
        </>
      )  : (
        "EMPTY"
      )}
    </Wrapper>
  )
}
export default Name;

const Wrapper = styled.div`
width: 100%;
height: 100%;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
text-align: center;
padding: 3px;
`

const NameDiv = styled.div`
width: 100%;
height: 70%;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
text-align: center;
padding: 3px;
font-size: 1.5em;
@media screen and (max-width: 700px) {
  font-size: 1em;
}
`
const WealthDiv = styled.div`
width: 100%;
height: 30%;
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
text-align: center;
padding: 3px;
font-size: 1em;
@media screen and (max-width: 700px) {
  font-size: 1em;
}
`

const StyledImg = styled.img`
  align-self: center;
  margin-left: 10px;
`

