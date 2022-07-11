/*
 * @Author: Kanata You 
 * @Date: 2022-07-11 16:14:15 
 * @Last Modified by: Kanata You
 * @Last Modified time: 2022-07-11 22:26:30
 */

import { useWindowOrientation } from '@utils/is-mobile';
import React from 'react';
import styled from 'styled-components';

import Drawer from '../drawer';


const Body = styled.div({
  width: '100vw',
  height: '100vh',
  overflow: 'hidden auto',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
});

const Header = styled.header({
  flexGrow: 0,
  flexShrink: 0,
  width: '100vw',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'flex-start',

  '> *': {
    height: '100%',
  },
});

const Container = styled.div({
  flexGrow: 1,
  flexShrink: 0,
  width: '100vw',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'stretch',
});

const Main = styled.main({
  flexGrow: 1,
  flexShrink: 1,

  '@media screen and (orientation: portrait)': {
    padding: '4vh 4% 12vh',

    '> *': {
      maxWidth: '92vw',
    },
  },

  '@media screen and (orientation: landscape)': {
    padding: '5.5vh 4% 30vh',

    '> *': {
      maxWidth: '72w',
    },
  },
});

const _Aside = styled.aside({
  flexGrow: 0,
  flexShrink: 0,
  minWidth: '20vw',
  maxWidth: '30vw',
  paddingBlock: '5.5vh 30vh',
  paddingInline: '1.5vw',

  '@media screen and (orientation: portrait)': {
    display: 'none',
  },
});

const Aside: React.FC<{
  style?: React.CSSProperties;
  children?: any;
  position?: 'left' | 'right';
}> = React.memo(function Aside ({
  style,
  children,
  position = 'right',
}) {
  const orientation = useWindowOrientation();

  if (orientation === 'horizontal') {
    return (
      // eslint-disable-next-line react/jsx-pascal-case
      <_Aside
        style={style}
      >
        {children}
      </_Aside>
    )
  }

  return (
    <Drawer
      position={position}
      forceBottomWhenPortrait={false}
    >
      {children}
    </Drawer>
  );
});

const Footer = styled.footer({

});


export const Layout = {
  Body,
  Header,
  Container,
  Main,
  Aside,
  Footer,
};
