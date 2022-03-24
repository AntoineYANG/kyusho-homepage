/*
 * @Author: Kanata You 
 * @Date: 2022-03-22 19:58:50 
 * @Last Modified by: Kanata You
 * @Last Modified time: 2022-03-25 01:22:52
 */

import React from 'react';
import styled from 'styled-components';

import backgroundImg from '@public/images/header-background.png';
import icon from '@public/images/logo.png';


const TOTAL_HEIGHT = 285;
const MINI_HEIGHT = 0;
const ANI_TIME = 1000;

const Header = styled.nav<{ expand: boolean }>(({ expand }) => ({
  position: 'fixed',
  top: expand ? 0 : `${MINI_HEIGHT - TOTAL_HEIGHT}px`,
  flexGrow: 0,
  flexShrink: 0,
  zIndex: 999,
  width: '100vw',
  height: `${TOTAL_HEIGHT}px`,
  overflow: 'hidden',
  fontSize: '24px',
  lineHeight: '1.2em',
  fontFamily: 'Roboto',
  display: 'flex',
  justifyContent: 'baseline',
  backgroundColor: '#15001d',
  backgroundImage: `url(${backgroundImg})`,
  backgroundSize: 'cover',
  boxShadow: 'inset 0px -12px 6px rgba(0, 0, 0, 0.425)',
  transition: `top ${ANI_TIME}ms`
}));

const HeaderContent = styled.div({
  flexGrow: 1,
  flexShrink: 1,
  flexWrap: 'nowrap',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
  justifyContent: 'center',
  height: `${TOTAL_HEIGHT}px`
});

const HeaderMainText = styled.p`
  display: inline-block;
  font-family: SimHei, "Yu Gothic Medium", Roboto, PMingLiU;
  font-size: 1.25rem;
  line-height: 1.2em;
  white-space: pre;
  margin: 2.55vmin 0 4.1vmax;
  color: #E8EEEBF0;
  text-shadow: 1px 2px 8px rgba(0, 0, 0, 0.85);

  @media screen and (min-width: 500px) {
    & {
      max-width: 60vw;
    }
  }
`;

const HeaderMainTextStrong = styled.span({
  fontSize: '3rem',
  fontFamily: 'ヒラギノ, 游ゴシック, "Yu Gothic Medium", Roboto, PMingLiU',
  fontWeight: 550,
  lineHeight: '1.5em',
  color: '#BFE66C'
});

const HeaderMainTextSmall = styled.span({
  fontSize: '1rem',
  lineHeight: '1.2em',
  color: '#E8EEEBE0'
});

const PageSpace = styled.div<{ expand: boolean }>(({ expand }) => ({
  flexGrow: 0,
  flexShrink: 0,
  width: '100vw',
  height: expand ? `${TOTAL_HEIGHT}px` : `${MINI_HEIGHT}px`,
  transition: `height ${ANI_TIME}ms`
}));

const HeaderIcon = styled.img<{ expand: boolean }>`
  position: fixed;
  top: ${({ expand }) => expand ? TOTAL_HEIGHT : MINI_HEIGHT}px;
  z-index: 999;
  opacity: ${({ expand }) => expand ? 1 : 0};
  transform: translateY(-50%);
  transition: opacity ${ANI_TIME}ms, top ${ANI_TIME}ms;
  min-width: 64px;
  max-width: 96px;
  min-height: 64px;
  max-height: 96px;
  width: calc(6vw + 24px);
  height: calc(6vw + 24px);
  border-radius: 25%;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.55),
              inset 2px 3px 4px rgba(255, 255, 255, 0.875);
`;

const HeaderSpace = styled.div`
  flex-grow: 0;
  flex-shrink: 0;
  height: ${TOTAL_HEIGHT};

  @media screen and (max-width: 375px) {
    & {
      width: 3.2rem;
    }
  }

  @media screen and (min-width: 376px) {
    & {
      width: 20vw;
    }
  }
`;

const PageHeader: React.FC = () => {
  const [showFull, setShowFull] = React.useState(() => {
    const scrollPos = document.querySelector('#root > div')?.scrollTop ?? 0;

    return scrollPos < 1;
  });

  React.useEffect(() => {
    const scrollContainer = document.querySelector('#root > div');

    if (scrollContainer) {
      const scrollProxy = (direction: 'up' | 'down'): boolean => {
        if (showFull && direction === 'down') {
          setShowFull(false);
          
          return true;
        } else if (!showFull && direction === 'up') {
          const scrollPos = scrollContainer.scrollTop;

          if (scrollPos === 0) {
            setShowFull(true);
  
            return true;
          }
        }

        return false;
      };

      const wheelHandler = (ev: WheelEvent) => {
        if (ev.deltaY > 0 && scrollProxy('down')) {
          // wheel downward
          return ev.preventDefault();
        } else if (ev.deltaY < 0 && scrollProxy('up')) {
          // wheel upward
          return ev.preventDefault();
        }
      };

      let touchBeginY: number | null = null;

      const touchStartHandler = (ev: TouchEvent) => {
        const touch = ev.changedTouches[0];

        if (touch) {
          touchBeginY = touch.clientY;
        }
      };

      const touchMoveHandler = (ev: TouchEvent) => {
        const touch = ev.changedTouches[0];

        if (touch) {
          const deltaY = touchBeginY === null ? 0 : touchBeginY - touch.clientY;

          if (deltaY > 15 && scrollProxy('down')) {
            // move downward
            touchBeginY = null;

            return;
          } else if (deltaY < -15 && scrollProxy('up')) {
            // move upward
            touchBeginY = null;
            
            return;
          }
        }
      };

      (scrollContainer as HTMLDivElement).addEventListener(
        'wheel',
        wheelHandler
      );
      (scrollContainer as HTMLDivElement).addEventListener(
        'touchstart',
        touchStartHandler
      );
      (scrollContainer as HTMLDivElement).addEventListener(
        'touchmove',
        touchMoveHandler
      );

      return () => {
        scrollContainer.removeEventListener(
          'wheel',
          wheelHandler as EventListener
        );
        scrollContainer.removeEventListener(
          'touchstart',
          touchStartHandler as EventListener
        );
        scrollContainer.removeEventListener(
          'touchmove',
          touchMoveHandler as EventListener
        );
      };
    }

    return undefined;
  }, [showFull, setShowFull]);

  return (
    <>
      <Header
        expand={showFull}
      >
        <HeaderSpace
          role="presentation"
          aria-hidden
        />
        <HeaderContent>
          <HeaderMainText>
            {
              `你好，
我是`
            }
            <HeaderMainTextStrong>
              宮商
            </HeaderMainTextStrong>
            {
              `，\n`
            }
            <HeaderMainTextSmall>
              {`一个学生`}
              <wbr/>
              {` & 软件工程师`}
              <wbr/>
              {` & 喜欢音乐的人。`}
            </HeaderMainTextSmall>
          </HeaderMainText>
        </HeaderContent>
        <HeaderSpace
          role="presentation"
          aria-hidden
        />
      </Header>
      <HeaderIcon
        src={icon}
        alt=""
        role="presentation"
        aria-hidden
        expand={showFull}
      />
      <PageSpace
        role="presentation"
        aria-hidden
        expand={showFull}
      />
    </>
  );
};


export default PageHeader;
