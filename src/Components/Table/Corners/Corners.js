import React from 'react';
import { useSelector } from "react-redux";
import styled from 'styled-components';

import felt from '../../../assets/pool_table/pool_table.png';

import { tableSizes } from '../../../Constants/tableSizes';
// import { SettingsContext } from '../../../SettingsContext';

const Corners = ( {corner} ) => {
  const settings = useSelector((state) => state.settings);
  // const { settings } = React.useContext(SettingsContext);
  
  let topIndexG = `${corner}topG`;
  let leftIndexG = `${corner}leftG`;
  let topIndexB = `${corner}topB`;
  let leftIndexB = `${corner}leftB`;
  return (
    <Green
    className = {"Hole-Green"}
    corner = {corner}
    size = {settings.tableSize}
    tableSizes = {tableSizes}
    top = {tableSizes[settings.tableSize][topIndexG]}
    left = {tableSizes[settings.tableSize][leftIndexG]}
    >
      <Hole
      corner = {corner}
      size = {settings.tableSize}
      tableSizes = {tableSizes}
      top = {tableSizes[settings.tableSize][topIndexB]}
      left = {tableSizes[settings.tableSize][leftIndexB]}
      />

    </Green>

  )
}
export default Corners;
const Hole = styled.div`
  position: absolute;
  background: black;
  border-radius: 50%;
  width: ${props => props.tableSizes[props.size].pocketRadius && 1.5*props.tableSizes[props.size].pocketRadius}px;
  height: ${props => props.tableSizes[props.size].pocketRadius && 1.5*props.tableSizes[props.size].pocketRadius}px;
  ${props => props.corner === 'TL' && {
    left: `${props.left}px`,
    top: `${props.top}px`
  }}
  ${props => props.corner === 'BL' && {
    left: `${props.left}px`,
    top: `${props.top}px`
  }}
  ${props => props.corner === 'TR' && {
    left: `${props.left}px`,
    top: `${props.top}px`
  }}
  ${props => props.corner === 'BR' && {
    left: `${props.left}px`,
    top: `${props.top}px`
  }}
`
const Green = styled.div`
  position: absolute;
  width: ${props => props.tableSizes[props.size].cornerGreenWidth && props.tableSizes[props.size].cornerGreenWidth}px;
  height: ${props => props.tableSizes[props.size].cornerGreenHeight && props.tableSizes[props.size].cornerGreenHeight}px;
  background: green;
  background-image: url(${felt});
  border-radius: 50%;
  top: ${props => props.top}px;
  left: ${props => props.left}px;
  
  ${props => props.corner === 'TL' && {
    transform: 'rotate(45deg)',
  }}
  ${props => props.corner === 'BL' && {
    transform: 'rotate(-45deg)',
  }}
  ${props => props.corner === 'TR' && {
    transform: 'rotate(-45deg)',
  }}
  ${props => props.corner === 'BR' && {
    transform: 'rotate(45deg)',
  }}
`