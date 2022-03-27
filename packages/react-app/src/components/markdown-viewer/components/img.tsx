/*
 * @Author: Kanata You 
 * @Date: 2022-03-26 22:54:25 
 * @Last Modified by: Kanata You
 * @Last Modified time: 2022-03-28 00:42:25
 */

import React from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';


const _imgContainer = styled.figure({
  display: 'flex',
  margin: '1em 1em'
});

const _img = styled.img({
  maxWidth: '100%',
  maxHeight: '67vh',
  fontSize: '0.8em',
  fontStyle: 'italic',
  color: '#000b',
  boxShadow: '2px 2px 1px #0004',
  backgroundColor: '#ccce',
  cursor: 'zoom-in'
});

const _imgSkeleton = styled.div`

  @media screen and (orientation: landscape) {
    & {
      width: 40vw;
      height: 30vh;
    }
  }

  @media screen and (orientation: portrait) {
    & {
      width: 100%;
      height: 48vw;
    }
  }

  box-shadow: 2px 2px 1px #0004;
  cursor: progress;

  background-color: #aaa;
  background-image: linear-gradient(85deg, #ddd 25%, #eee 37%, #ddd 63%);
  background-size: 200% 100%;
  animation: loading 1.6s linear infinite;

  @keyframes loading {
    from {
      background-position: 100% 50%;
    }
    to {
      background-position: -100% 50%;
    }
  }
`;

const _imgPopup = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99999;
  width: 100vw;
  height: 100vh;
  background-color: #fffa;
  backdrop-filter: blur(0.3vmax);
  cursor: zoom-out;
  animation: fade-in 300ms forwards;

  @keyframes fade-in {
    from {
      opacity: 0;
      backdrop-filter: blur(0.1vmax);
    }
    to {
      opacity: 1;
      backdrop-filter: blur(0.3vmax);
    }
  }
`;

const _fullscreenImg = styled.img`
  position: fixed;
  max-width: 96vw;
  max-height: 96vh;
  box-shadow: 0px 0px 8px #0009;
  background-color: #ccce;
  animation: resize-in 300ms forwards;

  @keyframes resize-in {
    to {
      top: 50vh;
      left: 50%;
      transform: translate(-50%, -50%) scale(1);
    }
  }
`;

const _resizeInfo = styled.div({
  position: 'fixed',
  top: '80vh',
  left: '50%',
  transform: 'translateX(-50%)',
  backgroundColor: '#fff',
  fontSize: '0.85rem',
  width: '3em',
  height: '1.5em',
  textAlign: 'center',
  paddingInlineEnd: '0.3em',
  paddingBlockStart: '0.1em',
  color: '#222',
  border: '1px solid',
  borderRadius: '5px',
  opacity: 0.8
});

const scaleList = [
  0.5, 0.6, 0.7, 0.8, 0.9,
  1,
  1.1, 1.2, 1.3, 1.5, 1.8, 2, 2.5, 3, 4, 5
];

const zoomIn = (currentSize: number): number | null => {
  for (const size of [...scaleList]) {
    if (size > currentSize) {
      return size;
    }
  }

  return null;
};

const zoomOut = (currentSize: number): number | null => {
  for (const size of [...scaleList].reverse()) {
    if (size < currentSize) {
      return size;
    }
  }

  return null;
};

const ResizableImg: React.FC<{
  src: string;
  alt: string;
  cx: number;
  cy: number;
  scale: number;
}> = ({ src, alt, cx, cy, scale: os }) => {
  const [scale, setScale] = React.useState(1);
  const translateRef = React.useRef({
    x: 0,
    y: 0
  });
  const cursorRef = React.useRef({
    x: NaN,
    y: NaN
  });
  const mouseDownPosRef = React.useRef({
    x: NaN,
    y: NaN
  });
  const touchDistRef = React.useRef(NaN);

  const startDragging = React.useCallback((x: number, y: number) => {
    mouseDownPosRef.current.x = x;
    mouseDownPosRef.current.y = y;
    cursorRef.current.x = x;
    cursorRef.current.y = y;
  }, [mouseDownPosRef, cursorRef]);

  const handleClick = React.useCallback((x: number, y: number, stop: () => void) => {
    if (!Number.isNaN(mouseDownPosRef.current.x)) {
      if (
        Math.abs(x - mouseDownPosRef.current.x)
        + Math.abs(y - mouseDownPosRef.current.y)
        >= 10
      ) {
        stop();
      }
        
      mouseDownPosRef.current.x = NaN;
      mouseDownPosRef.current.y = NaN;
    }
  }, [mouseDownPosRef, cursorRef]);

  const endDragging = React.useCallback(() => {
    cursorRef.current.x = NaN;
    cursorRef.current.y = NaN;
    touchDistRef.current = NaN;
  }, [cursorRef, touchDistRef]);

  const handleDragging = React.useCallback(
    (x: number, y: number, setter: (val: string) => void
  ) => {
    if (Number.isNaN(cursorRef.current.x)) {
      return;
    }

    const dx = x - cursorRef.current.x;
    const dy = y - cursorRef.current.y;
    translateRef.current.x += dx;
    translateRef.current.y += dy;
    cursorRef.current.x = x;
    cursorRef.current.y = y;
    setter(
      `translate(${
        translateRef.current.x
      }px, ${
        translateRef.current.y
      }px) scale(${scale})`
    );
  }, [mouseDownPosRef, cursorRef, scale]);

  return (
    <React.Fragment>
      <figure
        style={{
          transform: `translate(${
            translateRef.current.x
          }px, ${
            translateRef.current.y
          }px) scale(${scale})`,
          transformOrigin: '50vw 50vh',
          transition: 'transform 100ms'
        }}
        onWheel={e => {
          if (e.deltaY < 0) {
            // zoom-in
            const nextSize = zoomIn(scale);
            
            if (nextSize) {
              setScale(nextSize);
            }
          } else if (e.deltaY > 0) {
            // zoom-out
            const nextSize = zoomOut(scale);

            if (nextSize) {
              setScale(nextSize);
            }
          }
        }}
        onClick={e => handleClick(e.clientX, e.clientY, e.stopPropagation.bind(e))}
        onMouseDown={e => startDragging(e.clientX, e.clientY)}
        onMouseMove={e => handleDragging(
          e.clientX, e.clientY, val => e.currentTarget.style.transform = val
        )}
        onMouseUp={endDragging}
        onTouchStart={e => {
          if (e.touches.length === 1) {
            startDragging(e.touches[0]!.clientX, e.touches[0]!.clientY);
          } else if (e.touches.length === 2) {
            touchDistRef.current = Math.pow(
              e.touches[0]!.clientX - e.touches[1]!.clientX, 2
            ) + Math.pow(
              e.touches[0]!.clientY - e.touches[1]!.clientY, 2
            );
          }
        }}
        // Use element addEventListener to bind touchmove listener
        // because touchmove event is a passive event by default
        // thus cannot be stopped (`e.preventDefault()`) by React.
        ref={el => {
          if (el) {
            el.addEventListener(
              'touchmove',
              e => {
                e.stopPropagation();
                e.preventDefault();
                if (e.touches.length === 1) {
                  handleDragging(
                    e.touches[0]!.clientX,
                    e.touches[0]!.clientY,
                    val => el.style.transform = val
                  );
                } else if (e.touches.length === 2) {
                  const curDist = Math.pow(
                    e.touches[0]!.clientX - e.touches[1]!.clientX, 2
                  ) + Math.pow(
                    e.touches[0]!.clientY - e.touches[1]!.clientY, 2
                  );

                  if (!Number.isNaN(touchDistRef.current)) {
                    if (curDist > touchDistRef.current) {
                      // zoom-in
                      const nextSize = zoomIn(scale);
                      
                      if (nextSize) {
                        setScale(nextSize);
                      }
                    } else if (curDist < touchDistRef.current) {
                      // zoom-out
                      const nextSize = zoomOut(scale);

                      if (nextSize) {
                        setScale(nextSize);
                      }
                    }

                  }

                  touchDistRef.current = curDist;

                  e.stopPropagation();
                  e.preventDefault();
                }
              }, {
                passive: false
              }
            );
          }
        }}
        onTouchEnd={endDragging}
      >
        <_fullscreenImg
          src={src}
          aria-label={alt}
          alt=""
          onDragStart={e => e.preventDefault()}
          onLoad={e => e.currentTarget.focus()}
          style={{
            left: `${cx}px`,
            top: `${cy}px`,
            transform: `translate(-50%, -50%) scale(${os})`
          }}
        />
      </figure>
      {scale !== 1 && (
        <_resizeInfo
          title="??"
          onClick={
            e => {
              e.stopPropagation();
              setScale(1);
              translateRef.current = {
                x: 0,
                y: 0
              };
              cursorRef.current = {
                x: NaN,
                y: NaN
              };
              mouseDownPosRef.current = {
                x: NaN,
                y: NaN
              };
              touchDistRef.current = NaN;
            }
          }
        >
          {scale}x
        </_resizeInfo>
      )}
    </React.Fragment>
  );
};

const img: React.FC<{ src: string; alt: string }> = React.memo(({ src, alt }) => {
  const [isVisible, setVisible] = React.useState(false);
  const [isLoaded, setLoaded] = React.useState(false);

  React.useLayoutEffect(() => {
    setLoaded(false);
  }, [src, setLoaded]);

  const [isPopup, setPopup] = React.useState(false);
  const popupContainer = document.querySelector('#root') as HTMLDivElement | null;
  const [geometry, setGeometry] = React.useState({
    cx: 0,
    cy: 0,
    scale: 0
  });

  const imgRef = React.useRef<HTMLImageElement | null>(null);

  // 懒加载
  React.useLayoutEffect(() => {
    if (isVisible) {
      return;
    }

    if (imgRef.current) {
      const observer = new IntersectionObserver(
        entries => {
          const target = entries[0] as IntersectionObserverEntry;

          if (target.intersectionRatio > 0) {
            setVisible(true);
          }
        }
      );

      observer.observe(imgRef.current);

      return () => observer.disconnect();
    }

    return;
  }, [imgRef.current, setVisible, isVisible]);

  return (
    <_imgContainer>
      <_img
        src={isVisible ? src : '(lazy)'}
        alt={isVisible ? alt : ''}
        ref={e => imgRef.current = e}
        aria-haspopup
        aria-expanded={isPopup}
        onLoad={() => isVisible && setLoaded(true)}
        onDragStart={e => e.preventDefault()}
        onClick={e => {
          e.preventDefault();
          
          if (!isPopup) {
            setPopup(true);
            const {
              left: x,
              top: y,
              width: w,
              height: h
            } = e.currentTarget.getClientRects()[0] as DOMRect;
            const maxW = window.innerWidth * 0.96;
            const maxH = window.innerHeight * 0.96;
            const [targetW] = ((): [number, number] => {
              if (w / maxW >= h / maxH) {
                // use maxW
                return [maxW, h * maxW / w];
              } else {
                // use maxH
                return [w * maxH / h, w];
              }
            })();
            setGeometry({
              cx: x + w / 2,
              cy: y + h / 2,
              scale: w / targetW
            });
          }
        }}
        style={{
          opacity: isVisible && isLoaded ? 1 : 0,
          maxHeight: isVisible && isLoaded ? undefined : '0.1px'
        }}
      />
      {
        (!isVisible || !isLoaded) && (
          <_imgSkeleton />
        )
      }
      {
        isLoaded && isPopup && popupContainer && createPortal(
          <_imgPopup
            onClick={e => {
              e.preventDefault();
              
              setPopup(false);
            }}
          >
            <ResizableImg
              src={src}
              alt={alt}
              cx={geometry.cx}
              cy={geometry.cy}
              scale={geometry.scale}
            />
          </_imgPopup>,
          popupContainer
        )
      }
    </_imgContainer>
  );
});


export default img;
