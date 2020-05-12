import React from 'react';
import { useSelector } from "react-redux";
import styled from 'styled-components';

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
  const settings = useSelector((state) => state.settings);
  const userInfo = useSelector((state) => state.userInfo);

  let inventoryArray = Object.keys(userInfo.user.inventory);

  let url = ''
  let width = '100px'
  if (item === "crookedStick") url = crookedStick;
  else if (item === "plainOlCue") url = plainOlCue;
  else if (item === "magicWand") url = magicWand;
  else if (item === "boomStick") url = boomStick;
  else if (item === "wirtsLeg") url = wirtsLeg;
  else if (item === "chalk") {url = chalk; width = '40px';}
  else if (item === "purpleChalk") {url = purpleChalk; width = '40px';}
  else if (item === "rainbowChalk") {url = rainbowChalk; width = '40px';}

  let owned = userInfo.user.inventory[item];
  let cost = 0;

  if (item === 'plainOlCue') cost = 100;
  else if (item === 'magicWand') cost = 500;
  else if (item === 'boomStick') cost = 5000;
  else if (item === 'wirtsLeg') cost = 30000;
  else if (item === 'purpleChalk') cost = 2000;
  else if (item === 'rainbowChalk') cost = 10000;

  return (
    <RowItem>
      <StyledImg
        src = {url} 
        alt = "An item from inside the inventory"
        width = {width}
      />
      <p>
        {item}
      </p>
      {owned ? (
        <p>
        In Possession
        </p>
      ) : (
        <StyledButton>
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
  width: ${props => props.width};
  height: auto;
  margin-right: ${props => props.width === '40px' && '60px'};
`
const RowItem = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
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

