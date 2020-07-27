import React from 'react';
import styled from 'styled-components';

const RotatingOrb = ({ visible, buttonInfo }) => {
  
  // const [currentTime, setCurrentTime] = React.useState(Date.now());

  // React.useEffect(()=>{
  //   if (!visible) {
  //     return(<></>);
  //   }
  //   const updateTime = setInterval(()=>{
  //     setCurrentTime(Date.now())
  //   },500)
  //   return () => {
  //     // console.log('Timeout removed');
  //     clearInterval(updateTime);
  //   }
  // },[])

  if (!visible) {
    return(<></>);
  }

  return (
    <Orb
    visible = {visible}
    height = {buttonInfo.height}
    width = {buttonInfo.width}
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
  animation: ${props => props.visible ? "rotate 2000ms infinite linear" : ""}
`