/** ESPOIR TEMPLATE */
      
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import styled from 'styled-components';

import Homepage from './homepage';
import LangSwitch from '@components/lang-switch';


const App: React.FC = () => (
  <>
    <Router>
      <Routes>
        <Route path="/" element={ <Homepage /> } />
      </Routes>
    </Router>
    <LangSwitch />
  </>
);

export const Page = styled.div({
  width: '100vw',
  height: '100vh',
  overflow: 'hidden auto',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

export const Main = styled.main`
  flex-grow: 1;
  flex-shrink: 0;
  background-color: rgb(249,246,251);
  background-image: linear-gradient(180deg,
                      rgba(87, 14, 137, 0.04) 0%,
                      rgba(87, 14, 137, 0.036) 60.42%,
                      rgba(87, 14, 137, 0) 100%
                    );
  box-shadow: inset 8px 10px 8px rgba(255, 255, 255, 0.25),
              inset -8px -10px 8px rgba(0, 0, 0, 0.2);

  @media screen and (orientation: portrait) {
    & {
      padding: 8vh 3.2rem 8vh;
      width: calc(100vw - 3.2rem);
    }
  }

  @media screen and (orientation: landscape) {
    & {
      padding: 11.5vh 20vw 12vh;
      width: 60vw;
    }
  }
`;

export default App;
