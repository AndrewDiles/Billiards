import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";
import styled from 'styled-components';

import StyledButton from '../StyledButton';

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
`

const StyledImg = styled.img`
  align-self: center;
  margin-left: 10px;
`

