/** ESPOIR TEMPLATE */
      
import React from 'react';
import {
  HashRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import styled from 'styled-components';

import Homepage from './homepage';
import ArticlePage from './article-page';

import PageHeader from '@components/page-header';
import colors from '@components/hibou/colors';
import { usePreferColorScheme } from '@components/hibou/toggle/dark-mode-toggle';


const App: React.FC = React.memo(function App () {
  const colorScheme = usePreferColorScheme();

  document.body.className = `hibou-color-scheme-${colorScheme}`;

  return (
    <Page>
      <PageHeader />
      <Main>
        <Router>
          <Routes>
            <Route path="/" element={ <Homepage /> } />
            <Route path="article/:aid" element={ <ArticlePage /> } />
          </Routes>
        </Router>
      </Main>
    </Page>
  );
});

export const Page = styled.div({
  width: '100vw',
  height: '100vh',
  overflow: 'hidden auto',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',

  '& *:focus': {
    boxShadow: `
      0 0 4px 2px ${colors.primary}aa,
      inset 0 0 8px 2px ${colors.primary}80
    `,
  },
});

export const Main = styled.main({
  flexGrow: 1,
  flexShrink: 0,

  '@media screen and (orientation: portrait)': {
    padding: '4vh 3.2rem 12vh',
    width: 'calc(100vw - 4rem)',
  },

  '@media screen and (orientation: landscape)': {
    padding: '5.5vh 24vw 30vh',
    width: '52vw',
  },
});

export default App;
