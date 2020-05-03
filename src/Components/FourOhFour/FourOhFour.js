import React from 'react';
import styled from 'styled-components';

import blueBG from '../../assets/circle blues/circle-blues.png';

const FourOhFour = () => {

  return (
    <Wrapper>
      <h1>
        The bounty ye seek be someplace else.
      </h1>
    </Wrapper>
  )
}
export default FourOhFour;

const Wrapper = styled.div`
color: linen;
/* background-color: lightgray; */
background-image: url(${blueBG});
/* top:0;
left: 0; */
min-width: 100vw;
min-height: 100vh;
/* position: static; */
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
text-align: center;
`