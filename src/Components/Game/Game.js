import React, { useContext } from 'react';
import { useDispatch, useSelector } from "react-redux";
import styled from 'styled-components';

import blueBG from '../../assets/circle blues/circle-blues.png';
import squaresBG from '../../assets/repeated-square/repeated-square.png';
import { tableSizes } from '../../Constants/tableSizes';
// import { SettingsContext } from '../../SettingsContext';
import Selections from '../Selections';

import FreeMove from './FreeMove';
import Table from '../Table';
import ShotInput from '../ShotInput/ShotInput';

// z-index guide:
// table: default, 0, as objects will be children of it
// pockets: 2
// balls / rail: 4
// objects on rail: 6
// cue: 8
// GUI elements: 10

const Game = () => {
  const settings = useSelector((state) => state.settings);
  // const { settings } = useContext(SettingsContext);
  

  return (
    <Screen
    tableSizes = {tableSizes}
    settings= {settings}
    >
      {settings.gameStatus === 'free-move' || settings.gameStatus === 'first-shot' && <FreeMove/>}
      <TableContainer
      tableSizes = {tableSizes}
      settings= {settings}
      >
        <Table/>
        {settings.gameType && <ShotInput/>}
      </TableContainer>
      
    </Screen>
  )
}
export default Game;


const TableContainer = styled.div`
top:0;
left: 0;
width: 100vw;
height: 100vh;
min-height: ${props => props.tableSizes[props.settings.tableSize].tableHeight + 
2 * props.tableSizes[props.settings.tableSize].topPadding}px;
min-width: ${props => props.tableSizes[props.settings.tableSize].tableWidth + 
2 * props.tableSizes[props.settings.tableSize].leftPadding}px;
padding-left: ${props => props.tableSizes[props.settings.tableSize].leftPadding}px;
padding-top: ${props => props.tableSizes[props.settings.tableSize].topPadding}px;
/* display: flex;
justify-content: center;
text-align: center;
align-items: center; */
/* position: static; */
& ~ div {
  transform: ${props => props.settings.tableSize === "narrow" && 'rotate(270deg)'};
}
`

const Screen = styled.div`
/* background-color: lightgray; */
background-image: url(${blueBG});
top:0;
left: 0;
width: 100vw;
height: 100vh;
/* position: static; */
min-height: ${props => props.tableSizes[props.settings.tableSize].tableHeight + 
2 * props.tableSizes[props.settings.tableSize].topPadding}px;
min-width: ${props => props.tableSizes[props.settings.tableSize].tableWidth + 
2 * props.tableSizes[props.settings.tableSize].leftPadding}px;
`

