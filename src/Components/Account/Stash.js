import React from 'react';
import { useSelector } from "react-redux";
import styled from 'styled-components';

import Item from './Item';

import coin from '../../assets/spinningDubloon.gif';

const Stash = () => {
  const userInfo = useSelector((state) => state.userInfo);
  let inventoryArray = Object.keys(userInfo.user.inventory);

  return (
    <>
      <Styledh3>
        YOUR STASH
      </Styledh3>
      <ColDiv>
        <RowDivEven>
          <RowDiv>
            Carreer : {userInfo.user.accumulatedWealth} <StyledImg src = {coin} alt="A spinning gold coin" height="24" width="24"/>
          </RowDiv>
          <RowDiv>
            Current : {userInfo.user.dubloons} <StyledImg src = {coin} alt="A spinning gold coin" height="24" width="24"/>
          </RowDiv>
        </RowDivEven>
      </ColDiv>
        {inventoryArray.map((item)=>{
          return (
            <ColDiv
            key = {item}
            >
              <Item
              item = {item}
              />
            </ColDiv>
          )
        })}
    </>
  )
}
export default Stash;

const Styledh3 = styled.h3`
  font-weight: bolder;
  @media screen and (max-width: 550px) {
    size: 0.7em;
  }
`

const StyledImg = styled.img`
  align-self: center;
  margin-left: 10px;
  @media screen and (max-width: 550px) {
    margin-left: 0;
  }
`
const RowDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  text-align: center;
  @media screen and (max-width: 550px) {
    size: 0.5em;
  }
`
const ColDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 100%;
`

const RowDivEven = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  text-align: center;
  width: 100%;
`