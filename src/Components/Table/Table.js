import React, { useEffect, useContext } from 'react';
import { useDispatch, useSelector } from "react-redux";
import styled from 'styled-components';

import {
  beginBallMotion,
  updateBalls,
  endBallMotion
} from "../../actions";
import useTimeout from '../../Hooks/use-timeout';


import { tableSizes, sizeRatios } from '../../Constants/tableSizes';

// import { SettingsContext } from '../../SettingsContext';

import { TableMemo } from './TableMemo/TableMemo';
import Ball from './Balls';

// z-index guide:
// table: default, 0, as objects will be children of it
// pockets: 2
// balls / rail: 4
// objects on rail: 6
// cue: 8
// GUI elements: 10

const Table = () => {
  const dispatch = useDispatch();
  const settings = useSelector((state) => state.settings);
  const billiards = useSelector((state) => state.billiards);

  useEffect (()=> {
    if (billiards.status === 'just-struck') {
      // console.log('DISPATCHING BEGIN BALL MOTION. THIS BETTER ONLY HAPPEN ONCE >.<')
      dispatch(beginBallMotion());
      // send shot data to other player if not single player
      // update(dispatch, settings, billiards);

      useTimeout(update, settings.refreshRate);
      
      // debugger;


    }
  }, [billiards.status] )

  // console.log('refreshRaterefreshRaterefreshRaterefreshRate',settings.refreshRate);

  const update = () => {
    console.log('performing an update at rate of: ', settings.refreshRate);
    let stillMotion = false;
    // console.log('billiardsbilliardsbilliardsbilliardsbilliards',billiards);
    billiards.billiards.forEach((billiard)=>{
      console.log('billiardbilliardbilliardbilliardbilliardbilliardbilliardbilliard',billiard)
      console.log('billiard.inMotionbilliard.inMotionbilliard.inMotionbilliard.inMotion,billiard.inMotion',billiard.inMotion)
      if (billiard.inMotion) stillMotion = true;
      console.log('stillMotionstillMotionstillMotionstillMotionstillMotionstillMotion',stillMotion)
    })
    if (!stillMotion) {
      dispatch(endBallMotion());
      return
    }
    else {
    console.log('-----------GOT THIS FAR IN FUNCTION----------')
    dispatch(updateBalls(settings));
    useTimeout(update, settings.refreshRate);
    // send info to other user(s) about final locations of balls
    // test game conditions (whose turn, game over, who won?  etc)
    }
  }

  // const { settings } = useContext(SettingsContext);

  //  switch to react memo for holes, and table drawing

  return (
    <TableWrapper
    settings = {settings}
    tableSizes = {tableSizes}
    >
    <TableMemo
    settings = {settings}
    />
    {billiards.billiards.map((billiard)=>{
      return (
        <Ball
        key = {billiard.id}
        billiard = {billiard}
        />
      )
    })}
    <TestPoint
    settings = {settings}
    top = {6.5}
    left = {144.5}
    >

    </TestPoint>
    </TableWrapper>
  )
}

// test results (following are true before application of scaling ratios): 
// right wall impact when left >= 276.5, top>= 23 && top <=140
// left wall impact when left <= 13.5, top>= 23 && top <=140
// bottom wall impact when top >= 149.5 and left >=24 && 137 or left >= 151.5 && 265.5
// top wall impact when top <= 13 and left >=24 && 137 or left >= 151.5 && 265.5
// Corner radius: 7
// TL center: top: 9, left: 9
// TR: top 9, left: 280
// BL: top: 152.5, left: 10
// BR: top: 152.5, left 279
// Side radius: 5.5
// B: top: 155.5 left: 144
// T: top: 6.5 left: 144.5


export default Table;
const TestPoint = styled.div`
top: ${props => props.top * sizeRatios[props.settings.tableSize]}px;
left: ${props => props.left * sizeRatios[props.settings.tableSize]}px;
height:5px;
width:5px;
position: absolute;
background-color: blue;
z-index: 25;
`

const TableWrapper = styled.div`
  width: ${props => props.tableSizes[props.settings.tableSize].tableWidth && props.tableSizes[props.settings.tableSize].tableWidth}px;
  height: ${props => props.tableSizes[props.settings.tableSize].tableHeight && props.tableSizes[props.settings.tableSize].tableHeight}px;
  border-radius: ${props => props.tableSizes[props.settings.tableSize].tableBorderRadius && props.tableSizes[props.settings.tableSize].tableBorderRadius}px;
  background: green;
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
  position: fixed;
  transform: ${props => props.settings.tableSize === "narrow" && 'rotate(90deg)'};
`