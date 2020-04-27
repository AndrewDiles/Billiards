import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import {
  updateBalls,
  endBallMotion
} from "../actions";
// const dispatch = useDispatch();
// const settings = useSelector((state) => state.settings);
// const billiards = useSelector((state) => state.billiards);

const update = async (dispatch, settings, billiards) => {

  
  console.log('performing an update at rate of: ', settings.refreshRate);
  let stillMotion = false;
  // console.log('billiardsbilliardsbilliardsbilliardsbilliards',billiards);
  billiards.billiards.forEach((billiard)=>{
    if (billiard.inMotion) stillMotion = true;
  })
  // debugger;
  if (stillMotion) {
    await dispatch(updateBalls(settings));
    await setTimeout(update(dispatch, settings, billiards), settings.refreshRate);
  }
  else {
    dispatch(endBallMotion());
    // send info to other user(s) about final locations of balls
    // test game conditions (whose turn, game over, who won?  etc)
  }
  return
}

export default update;