/*
 * @Author: Kanata You 
 * @Date: 2022-07-10 15:40:12 
 * @Last Modified by: Kanata You
 * @Last Modified time: 2022-07-11 23:24:21
 */

import React from 'react';
import {
  useNavigate,
} from 'react-router-dom';
import styled from 'styled-components';

import icon from '@public/images/logo.png';
import colors from '@components/hibou/colors';


const PageLogo = styled.h1({
  flexGrow: 0,
  flexShrink: 0,
  marginBlock: 0,
  marginInline: 0,
  paddingBlock: 0,
  paddingInline: 0,
  height: '100%',
  width: '12.2em',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '1.2rem',
  fontWeight: 500,
  outline: 'none',
  
  '> *': {
    userSelect: 'none',
  },
});

const Icon = styled.img({
  flexGrow: 0,
  flexShrink: 0,
  width: '35px',
  height: '35px',
  marginInlineStart: '0.8em',
  marginInlineEnd: '0.4em',
});

const IconSplitter = styled.span({
  color: colors.primary,
  marginInline: '0.7em',
  backgroundImage: `
    linear-gradient(45deg, transparent 48%, ${colors.iconColor}dd, transparent 52%),
    linear-gradient(-45deg, transparent 48%, ${colors.iconColor}dd, transparent 52%)
  `,
});

const IconText = styled.label({
  flexGrow: 0,
  flexShrink: 0,
  marginInlineEnd: '2.4em',
  textDecoration: 'none',
  cursor: 'pointer',
});

const Logo: React.FC = React.memo(function Logo () {
  const navigate = useNavigate();

  return (
    <div
      role="link"
      onClick={e => {
        e.preventDefault();

        navigate('/');
      }}
      style={{
        outline: 'none',
      }}
    >
      <PageLogo
        title="homepage"
      >
        <Icon
          src={icon}
          alt="logo:kyusho"
        />
        <IconSplitter
          role="presentation"
          aria-hidden
        >
          {'\u2756'}
        </IconSplitter>
        <IconText>
          宮商
        </IconText>
      </PageLogo>
    </div>
  );
});


export default Logo;
