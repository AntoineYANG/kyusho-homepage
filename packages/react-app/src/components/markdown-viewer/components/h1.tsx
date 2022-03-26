/*
 * @Author: Kanata You 
 * @Date: 2022-03-26 22:54:25 
 * @Last Modified by: Kanata You
 * @Last Modified time: 2022-03-27 00:42:18
 */

import styled from 'styled-components';


const h1 = styled.h1`
  position: relative;
  margin: 0.5em 0 1.2em;
  font-size: 2.2rem;
  color: #400A66;
  line-height: 1.8em;
  font-weight: 600;
  z-index: 1;

  &::before {
    content: "";
    position: absolute;
    z-index: -1;
    top: 100%;
    left: -0.1em;
    right: -0.2em;
    bottom: -8%;
    background-image: linear-gradient(5deg, #400A66 6%, transparent 120%);
    box-shadow: 1px 1px 1px rgba(89,36,126,0.5);
    border-radius: 0.1em 20% 150% 0.1em;
    pointer-events: none;
  }
`;


export default h1;
