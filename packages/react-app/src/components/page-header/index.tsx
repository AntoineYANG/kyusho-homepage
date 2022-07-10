/*
 * @Author: Kanata You 
 * @Date: 2022-03-22 19:58:50 
 * @Last Modified by: Kanata You
 * @Last Modified time: 2022-07-10 23:06:35
 */

import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import backgroundImg from '@public/images/aoibara.png';
import { VR } from '@components/common';

import Logo from './logo';
import Navigator from './navigator';
import PreferenceOptions from './preference-options';


const PageHeaderContainer = styled.header({
  flexGrow: 0,
  flexShrink: 0,
  width: '100vw',
  height: '57px',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'flex-start',
  borderBlockEnd: '7px solid #2b2c26aa',

  '> *': {
    height: '100%',
  },
});

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

const PageHeader: React.FC = () => {
  const { t } = useTranslation();

  return (
    <PageHeaderContainer>
      <Logo />
      <VR aria-hidden />
      <PageHeaderContent>
        <Navigator />
        <PreferenceOptions />
      </PageHeaderContent>
    </PageHeaderContainer>
  );
};


export default PageHeader;
