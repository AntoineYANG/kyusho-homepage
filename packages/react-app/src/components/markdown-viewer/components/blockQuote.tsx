/*
 * @Author: Kanata You 
 * @Date: 2022-03-26 22:54:25 
 * @Last Modified by: Kanata You
 * @Last Modified time: 2022-03-27 15:03:46
 */

import styled from 'styled-components';


const blockQuote = styled.blockquote`
  margin: 0;
  padding-inline-start: 1.55rem;
  border-inline-start: 4px solid #BFE66C;

  & > p {
    background-color: #BFE66C80;
    background-image: none;
    color: #333e;
  }
`;


export default blockQuote;
