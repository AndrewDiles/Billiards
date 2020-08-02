import React from 'react';
import styled from 'styled-components';

const RotatingOrb = ({ visible, buttonInfo }) => {
  
  // Making sure the orb travels at a given speed independant of the perimeter of the button
  const speed = .15;
  const distanceToTravel = 2*(buttonInfo.height+buttonInfo.width);
  const time = parseInt(distanceToTravel/speed);

  if (!visible) {
    return(<></>);
  }

  return (
    <Orb
    visible = {visible}
    height = {buttonInfo.height}
    width = {buttonInfo.width}
    time = {time}
    />
  )
}
export default RotatingOrb;

const Orb = styled.div`
  height: 10px;
  width: 10px;
  position: absolute;
  top: 0;
  left: 0;
  display: ${props => props.visible ? 'block' : 'none'};
  z-index: 15;
  border-radius: 50%;
  /* background: radial-gradient(rgba(255,255,255,.85), rgba(255,255,255,0)); */
  /* background: radial-gradient(rgba(10, 71, 255, 0.8), rgba(115, 112, 255, 0.01)); */
  offset-path: ${props => props.visible ? `path('M0,0 L${props.width-5},0 L${props.width-5},${props.height-5} L0,${props.height-5} Z')` : ''};
  animation: ${props => props.visible ? `rotate ${props.time}ms infinite linear` : ""};
`