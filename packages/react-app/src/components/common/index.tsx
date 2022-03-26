/*
 * @Author: Kanata You 
 * @Date: 2022-03-24 20:45:26 
 * @Last Modified by: Kanata You
 * @Last Modified time: 2022-03-27 00:25:35
 */

import React from 'react';
import styled from 'styled-components';
import Lottie from 'react-lottie';

import articleBefore from '@public/images/p-before.png';
import lottieFile from './a-after-lottie.json';
import { Link } from 'react-router-dom';

import './index.scss';


const ArticleContainer = styled.article`
  margin: 2em 0 3.3em;
  padding: 1.3em 1em;
  font-family: inherit;
  font-size: 1rem;
  line-height: 1.6em;
  color: #4D4D4D;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.25);
  white-space: pre-wrap;
  position: relative;
  z-index: 1;
`;

const ArticleBefore = styled.img({
  width: '1.75em',
  height: '1.75em',
  position: 'absolute',
  left: 0,
  top: '0.65em',
  transform: 'translate(-1.2em, 0.45em)'
});

export const ArticleHeader = styled.header({
  margin: '0 0 0.7em',
  fontSize: '1.6rem',
  color: '#400A66',
  lineHeight: '1.6em',
  fontWeight: 600,
  transform: 'translateY(-0.4rem)'
});

export const Article: React.FC = ({ children }) => (
  <ArticleContainer>
    <ArticleBefore
      alt=""
      role="presentation"
      aria-hidden
      src={articleBefore}
    />
    {children}
  </ArticleContainer>
);

export const List = styled.div`
  counter-reset: list-index;
`;

export const ListItem = styled.div<{ mode?: 'ol' | 'ref' }>`
  padding: 0.5em 0 1em;
  min-height: 1.8em;
  counter-increment: list-index;
  display: flex;
  flex-direction: column;
  z-index: 1;

  &::before {
    content: ${
      ({ mode = 'ol' }) => ({
        ol: '',
        ref: '"[" '
      }[mode])
    }counter(list-index)${
      ({ mode = 'ol' }) => ({
        ol: ' "."',
        ref: ' "]"'
      }[mode])
    };
    position: absolute;
    width: 1.5em;
    left: -1.2em;
    display: inline-block;
    text-align: end;
  }
`;

const _A = styled.a<{ active: boolean; zIndexBase?: number }>`
  z-index: ${({ zIndexBase = 0 }) => zIndexBase};
  margin: 0 0.25em;
  padding: 0 0.1em;
  color: ${({ active }) => active ? '#fcfcfc' : '#570E89'};
  position: relative;
  text-decoration: none;
  outline: none;
  transition: color 80ms;
  transition-delay: 20ms;
  text-shadow: ${({ active }) => active ? '0.5px 0.5px 2.5px rgba(0,0,0,0.75)' : 'none'};

  &::before {
    content: "";
    position: absolute;
    z-index: ${({ zIndexBase = 0 }) => zIndexBase - 1};
    top: ${({ active }) => active ? '12%' : '68%'};
    left: -0.1em;
    right: -0.2em;
    bottom: 0;
    transition: top 200ms cubic-bezier(0, 0.8, 0.13, 1), border-radius 40ms;
    background-color: #C879FF;
    border-radius: ${({ active }) => active ? '0.2em' : '0.5em 100% 130% 0.5em'};
    pointer-events: none;
  }
`;

const _AAfter: React.FC = () => (
  <Lottie
    options={{
      animationData: lottieFile
    }}
    width={64}
    height={64}
    style={{
      position: 'absolute',
      zIndex: 2,
      bottom: '0.8em',
      left: '50%',
      margin: 0,
      transform: 'translateX(-50%)',
      borderRadius: '50%',
      pointerEvents: 'none',
      backgroundImage: 'radial-gradient(37% 37% at 50% 61%, #fffc 40%, transparent)'
    }}
  />
);

export const Anchor: React.FC<{
  href: string;
  style?: React.CSSProperties;
  children: string;
  internal?: boolean;
  zIndexBase?: number;
}> = ({ href, children: text, style, internal = false, zIndexBase }) => {
  const [focused, setFocused] = React.useState(false);
  const Parent = internal ? Link : _A;

  return (
    <Parent
      active={(internal ? undefined : focused) as boolean}
      className={internal ? `internal-link${focused ? ' active' : ''}` : undefined}
      href={internal ? undefined : href}
      to={(internal ? href : undefined) as string}
      role="link"
      target={
        internal ? undefined : (
          href.match(/^(\/|#).*$/) ? '_self' : '_blank'
        )
      }
      zIndexBase={(internal ? undefined : zIndexBase) as number}
      title={href.startsWith('mailto:') ? href.replace(/^mailto:/, '') : undefined}
      onFocus={() => !focused && setFocused(true)}
      onBlur={() => focused && setFocused(false)}
      onMouseOver={() => !focused && setFocused(true)}
      onMouseOut={() => focused && setFocused(false)}
      onTouchStart={() => !focused && setFocused(true)}
      onTouchEnd={() => focused && setFocused(false)}
      onMouseUp={() => focused && setFocused(false)}
      style={style}
      onClick={() => {
        if (href.startsWith('#')) {
          const target = document.getElementById(href.replace(/^#/, ''));

          target?.scrollIntoView();
        }
      }}
    >
      {text}
      {focused && (<_AAfter />)}
    </Parent>
  );
};

export const Strong = styled.strong<{ weight?: 500 | 550 | 600 }>`
  position: relative;
  font-weight: ${({ weight = 550 }) => weight};

  &::before {
    content: "";
    position: absolute;
    z-index: -1;
    top: 72%;
    left: -0.05em;
    right: -0.1em;
    bottom: 0;
    background-color: #BFE66C;
    border-radius: 0.5em 100% 130% 0.5em;
    pointer-events: none;
  }

  &::after {
    content: "";
    position: absolute;
    z-index: 2;
    top: 72%;
    left: -0.05em;
    right: -0.1em;
    bottom: 0;
    background-color: #BFE66C90;
    border-radius: 0.5em 100% 130% 0.5em;
    backdrop-filter: contrast(150%);
    pointer-events: none;
  }
`;

export const HR = styled.hr`
  margin: 2.6rem 1em;
  height: 6px;
  background-image: linear-gradient(270deg, #C879FF 0%, #BFE66C 100%);
  border: none;
`;
