import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import styled from 'styled-components';

import {
  requestPurchaseItem,
  purchaseItemSuccess,
  purchaseItemError,
} from "../../actions";

import crookedStick from '../../assets/crookedStick.png';
import plainOlCue   from '../../assets/plainOlCue.png';
import magicWand    from '../../assets/magicWand.png';
import boomStick    from '../../assets/boomStick.png';
import wirtsLeg     from '../../assets/wirtsLeg.png';
import chalk         from '../../assets/blueChalk.png';
import purpleChalk  from '../../assets/purpleChalk.png';
import rainbowChalk from '../../assets/rainbowChalk.png';

import StyledButton from '../StyledButton';

import coin from '../../assets/spinningDubloon.gif';

const Item = ({ item }) => {
  const userInfo = useSelector((state) => state.userInfo);
  const dispatch = useDispatch();
  // let inventoryArray = Object.keys(userInfo.user.inventory);

  let url = ''
  let isChalk = false;
  if (item === "crookedStick") url = crookedStick;
  else if (item === "plainOlCue") url = plainOlCue;
  else if (item === "magicWand") url = magicWand;
  else if (item === "boomStick") url = boomStick;
  else if (item === "wirtsLeg") url = wirtsLeg;
  else if (item === "chalk") {url = chalk; isChalk = true;}
  else if (item === "purpleChalk") {url = purpleChalk; isChalk = true;}
  else if (item === "rainbowChalk") {url = rainbowChalk; isChalk = true;}

  let owned = userInfo.user.inventory[item];
  let cost = 0;

  if (item === 'plainOlCue') cost = 100;
  else if (item === 'magicWand') cost = 500;
  else if (item === 'boomStick') cost = 5000;
  else if (item === 'wirtsLeg') cost = 30000;
  else if (item === 'chalk') cost = 250;
  else if (item === 'purpleChalk') cost = 2000;
  else if (item === 'rainbowChalk') cost = 10000;

  const handleClickPurchase = () => {

    dispatch(requestPurchaseItem());
    fetch('/be/purchase', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ 
        userName: userInfo.user.userName,
        item: item, 
      }),
    }).then((res) => {
      if (res.status === 200) {
        res.json().then((data) => {
          dispatch(purchaseItemSuccess(data.userInfo));
        });
      } else {
        console.log('error: res',res);
        dispatch(purchaseItemError());
      }
    })
  }

  return (
    <RowItem>
      <StyledImg
        src = {url}
        chalk = {isChalk}
        alt = "An item from inside the inventory"
      />
      <StyledP
      marginRight = '0'
      >
        {item}
      </StyledP>
      {owned ? (
        <StyledP 
        marginRight = '5px'
        >
        In Possession
        </StyledP>
      ) : (
        <StyledButton
          handleClick = {handleClickPurchase}
          disabled = {cost > userInfo.user.dubloons}
        >
          {cost} <img src = {coin} alt="A spinning gold coin" height="10" width="10"/>
        </StyledButton>
      )}
    </RowItem>
  )
}
export default Item;

const StyledImg = styled.img`
  align-self: center;
  margin-left: 10px;
  width: ${props => props.chalk ? '40px' : '100px'};
  height: auto;
  margin-right: ${props => props.chalk && '60px'};
  @media screen and (max-width: 550px) {
    width: ${props => props.chalk ? '20px' : '50px'};
    margin-right: ${props => props.chalk && '30px'};
  }
`
const RowItem = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  width: 100%;
`
const StyledP = styled.p`
  margin-right: ${props => props.marginRight && props.marginRight};
  @media screen and (max-width: 550px) {
    size: 0.5em;
  }
`