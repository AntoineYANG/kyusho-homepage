/** ESPOIR TEMPLATE */
      
import React from 'react';
import {
  HashRouter as Router,
  Routes,
  Route,
  useNavigate
} from 'react-router-dom';
import styled from 'styled-components';

import Homepage from './homepage';
// import ArticlePage from './article-page';
import Contact from './contact';

import PageHeader from '@components/page-header';
import colors from '@components/hibou/colors';
import { usePreferColorScheme } from '@components/hibou/toggle/dark-mode-toggle';
import { Layout } from '@components/hibou/layout';
import { useTOC } from '@components/hibou/toc';
import Sticky from '@components/hibou/sticky';
import isMobile, { useWindowOrientation } from '@utils/is-mobile';
import BackToTop from '@components/hibou/button/back-to-top';
import Drawer from '@components/hibou/drawer';


type PageRouter = {
  name: string;
  path: string;
  element: JSX.Element;
};

const routers: PageRouter[] = [
  {
    name: 'home',
    path: '/',
    element: <Homepage />,
  },
  {
    name: 'contact',
    path: '/contact',
    element: <Contact />,
  }
];

const NavElement = styled.nav({
  flexGrow: 1,
  width: '100%',
  fontSize: '1rem',
  lineHeight: '1.3em',
  marginBlock: '20px',
  paddingBlockStart: '1.2em',
  paddingBlockEnd: '1.6em',
  paddingInline: 0,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
});

const NavItem = styled.span({
  textDecoration: 'none',
  cursor: 'pointer',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'baseline',
  outline: 'none',
  marginBlock: '0.2em',
  paddingBlock: '0.3em',
  paddingInline: '2em',
  minWidth: '2em',

  ':focus, :hover': {
    fontWeight: 'bolder',
  },
});

const Nav: React.FC<{ routers: PageRouter[] }> = React.memo(function Nav ({ routers }) {
  const navigate = useNavigate();

  return (
    <NavElement>
      {
        routers.map((d, i) => (
          <NavItem
            key={i}
            tabIndex={0}
            onClick={() => {
              navigate(d.path);
            }}
          >
            {d.name}
          </NavItem>
        ))
      }
    </NavElement>
  );
});

const App: React.FC = React.memo(function App () {
  const colorScheme = usePreferColorScheme();
  const orientation = useWindowOrientation();

  document.body.className = `hibou-color-scheme-${colorScheme}`;

  const TOC = useTOC();

  return (
    <Page>
      <Router>
        <PageHeader />
        <Layout.Container>
          {
            isMobile() || (
              <Layout.Aside
                style={{
                  width: '20vw',
                }}
              />
            )
          }
          <Drawer
            position={isMobile() ? 'top' : 'left'}
            forceBottomWhenPortrait={false}
          >
            <Nav
              routers={routers}
            />
          </Drawer>
          <Layout.Main>
            <TOC.WATCH>
              <Routes>
                {
                  routers.map((d, i) => (
                    <Route
                      key={i}
                      path={d.path}
                      element={d.element}
                    />
                  ))
                }
              </Routes>
            </TOC.WATCH>
            <BackToTop />
          </Layout.Main>
          <Layout.Aside
            style={{
              width: '22vw',
              paddingInlineEnd: '2vw',
            }}
            position="right"
          >
            {
              orientation === 'horizontal' ? (
                <Sticky
                  style={{
                    width: '22vw',
                  }}
                  top={0}
                >
                  <TOC.ELEMENT />
                </Sticky>
              ) : (
                <TOC.ELEMENT />
              )
            }
          </Layout.Aside>
        </Layout.Container>
      </Router>
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

export default App;
