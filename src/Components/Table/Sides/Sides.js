import React, { useContext } from 'react';
import { useDispatch, useSelector } from "react-redux";
import styled from 'styled-components';

import felt from '../../../assets/pool_table/pool_table.png';

import { tableSizes } from '../../../Constants/tableSizes';
// import { SettingsContext } from '../../../SettingsContext';

const Sides = ( {side} ) => {
  const settings = useSelector((state) => state.settings);
  // const { settings } = useContext(SettingsContext);
  
  let topIndexG = `${side}topG`;
  let leftIndexG = `${side}leftG`;
  let topIndexB = `${side}topB`;
  let leftIndexB = `${side}leftB`;
  return (
    <Green
    side = {side}
    size = {settings.tableSize}
    tableSizes = {tableSizes}
    top = {tableSizes[settings.tableSize][topIndexG]}
    left = {tableSizes[settings.tableSize][leftIndexG]}
    >
      <Hole
      side = {side}
      size = {settings.tableSize}
      tableSizes = {tableSizes}
      top = {tableSizes[settings.tableSize][topIndexB]}
      left = {tableSizes[settings.tableSize][leftIndexB]}
      />

    </Green>

  )
}
export default Sides;
const Hole = styled.div`
  position: absolute;
  background: black;
  border-radius: 50%;
  width: ${props => props.tableSizes[props.size].pocketRadius && 1.1*props.tableSizes[props.size].pocketRadius}px;
  height: ${props => props.tableSizes[props.size].pocketRadius && 1.1*props.tableSizes[props.size].pocketRadius}px;
  top: ${props => props.top}px;
  left: ${props => props.left}px;
`
const Green = styled.div`
  position: absolute;
  width: ${props => props.tableSizes[props.size].sideGreenWidth && props.tableSizes[props.size].sideGreenWidth}px;
  height: ${props => props.tableSizes[props.size].sideGreenHeight && props.tableSizes[props.size].sideGreenHeight}px;
  background: green;
  background-image: url(${felt});
  border-radius: 50%;
  top: ${props => props.top}px;
  left: ${props => props.left}px;
`