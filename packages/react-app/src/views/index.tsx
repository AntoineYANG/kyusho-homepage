/** ESPOIR TEMPLATE */
      
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import styled from 'styled-components';

import Homepage from './homepage';
import ArticlePage from './article-page';

import LangSwitch from '@components/lang-switch';


const App: React.FC = () => (
  <>
    <Router>
      <Routes>
        <Route path="/" element={ <Homepage /> } />
        <Route path="article/:aid" element={ <ArticlePage /> } />
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
  background-color: #fff;
  box-shadow: inset 8px 10px 8px rgba(255, 255, 255, 0.25),
              inset -8px -10px 8px rgba(0, 0, 0, 0.175);

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
