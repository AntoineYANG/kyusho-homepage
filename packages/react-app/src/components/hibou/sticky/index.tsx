/*
 * @Author: Kanata You 
 * @Date: 2022-07-11 17:29:57 
 * @Last Modified by: Kanata You
 * @Last Modified time: 2022-07-11 23:06:19
 */

import React from 'react';
import styled from 'styled-components';


const Observed = styled.div({
  display: 'block',
  width: '1px',
  height: '1px',
  margin: '-0.5px !important',
  padding: '0 !important',
  border: 'none !important',
});

const StickyBox = styled.div<{ sticky: boolean }>(({ sticky }) => ({
  position: sticky ? 'fixed' : undefined,
  margin: '0 !important',
  padding: '0 !important',
  border: 'none !important',
  top: '-1vh',
  bottom: '-1vh',
  right: '-1vw',
  left: '-1vw',
  transition: 'top 600ms, left 600ms, right 600ms, bottom 600ms',
}));

export type StickyProps = {
  children: any;
  style?: React.CSSProperties;
} & Partial<{
  top: string | number;
  right: string | number;
  bottom: string | number;
  left: string | number;
}> & (
  | {
    top: string | number;
  }
  | {
    right: string | number;
  }
  | {
    bottom: string | number;
  }
  | {
    left: string | number;
  }
);

const Sticky: React.FC<StickyProps> = React.memo(function Sticky ({
  children,
  style,
  top,
  right,
  bottom,
  left,
}) {
  const ref = React.useRef<HTMLDivElement>();
  const [sticky, setSticky] = React.useState(false);

  React.useEffect(() => {
    if (ref.current) {
      const cb: IntersectionObserverCallback = ([e]) => {
        if (e) {
          const _sticky = e.intersectionRatio < 1;

          setSticky(_sticky);
        }
      };

      const observer = new IntersectionObserver(cb, {
        threshold: [0, 1],
      });

      observer.observe(ref.current);

      return () => observer.disconnect();
    }

    return;
  }, []);

  return (
    <React.Fragment>
      <Observed
        ref={e => e && [ref.current = e]}
      />
      <StickyBox
        sticky={sticky}
        style={{
          ...style,
          top: sticky ? top ?? 'unset' : undefined,
          right: sticky ? right ?? 'unset' : undefined,
          bottom: sticky ? bottom ?? 'unset' : undefined,
          left: sticky ? left ?? 'unset' : undefined,
        }}
      >
        {children}
      </StickyBox>
    </React.Fragment>
  );
});


export default Sticky;
