/*
 * @Author: Kanata You 
 * @Date: 2022-03-22 19:58:50 
 * @Last Modified by: Kanata You
 * @Last Modified time: 2022-07-11 14:09:33
 */

import React from 'react';
import styled from 'styled-components';

import { VR } from '@components/common';
import { useWindowOrientation } from '@utils/is-mobile';

import Logo from './logo';
import Navigator from './navigator';
import PreferenceOptions from './preference-options';


const PageHeaderContainer = styled.header<{ orientation: 'h' | 'p' }>(({ orientation }) => ({
  flexGrow: 0,
  flexShrink: 0,
  width: orientation === 'h' ? '100vw' : '96vw',
  height: orientation === 'h' ? '57px' : undefined,
  paddingBlockStart: orientation === 'h' ? undefined : '4vh',
  paddingBlockEnd: orientation === 'h' ? undefined : '10px',
  paddingInline: orientation === 'h' ? undefined : '2vw',
  display: 'flex',
  flexDirection: orientation === 'h' ? 'row' : 'column',
  alignItems: orientation === 'h' ? 'center' : 'stretch',
  justifyContent: 'flex-start',
  borderBlockEnd: '7px solid #2b2c26aa',

  '> *': orientation === 'h' ? {
    height: '100%',
  } : {},
}));

const PageHeaderContent = styled.div({
  flexGrow: 1,
  flexShrink: 0,
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',

  '> *': {
    height: '100%',
  },
});

const PageHeader: React.FC = React.memo(function PageHeader () {
  const orientation = useWindowOrientation();

  return (
    <PageHeaderContainer
      orientation={orientation === 'horizontal' ? 'h' : 'p'}
    >
      <Logo />
      {
        orientation === 'horizontal' && (
          <VR aria-hidden />
        )
      }
      <PageHeaderContent>
        <Navigator />
        <PreferenceOptions />
      </PageHeaderContent>
    </PageHeaderContainer>
  );
});


export default PageHeader;
