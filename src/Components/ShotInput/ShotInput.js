import React from 'react';
import { useSelector } from "react-redux";
import styled from 'styled-components';

import CueAngleSetter from './CueAngleSetter';
import ShootButton from './ShootButton';
import PowerBar from './PowerBar';

const ShotInput = ( ) => {
  const settings = useSelector((state) => state.settings);
  let maximumHeight = null;
  if (settings.tableSize === 'medium') maximumHeight =410;
  else maximumHeight =655;

  // height: ${props => props.size === 'full' ? '655px' : props.size === 'medium' ? '410px' : '655px'};
  return (
    <Wrapper size = {settings.tableSize} height = {maximumHeight}>
      <CueAngleSetter />
      <PowerBar maximumHeight = {0.8*maximumHeight} />
      <ShootButton />
    </Wrapper>
  )
}
export default ShotInput;

const Wrapper = styled.div`
  position: fixed;
  top: ${props => props.size === 'full' ? '100px' : props.size === 'medium' ? '50px' : '73px'};
  right: ${props => props.size !== 'narrow' && '15px'};
  left: ${props => props.size === 'narrow' && '45px'};
  height: ${props => props.height && `${props.height}px`};
  width: 100px;
  z-index: 10;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`