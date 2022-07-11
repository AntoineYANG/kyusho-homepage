/*
 * @Author: Kanata You 
 * @Date: 2022-03-27 22:34:51 
 * @Last Modified by: Kanata You
 * @Last Modified time: 2022-07-11 13:39:03
 */

import React from 'react';


const isMobile = () => {
  try {
    return [
      'Android', 'iPhone','SymbianOS', 'Windows Phone','iPad', 'iPod'
    ].some(tag => navigator.userAgent.includes(tag));
  } catch (error) {
    return true;
  }
};

export const isWindowPortrait = () => window.matchMedia(
  'screen and (orientation: portrait)'
).matches;

export type WindowOrientation = 'portrait' | 'horizontal';

export const useWindowOrientation = (): WindowOrientation => {
  const [orientation, setOrientation] = React.useState<WindowOrientation>(
    isWindowPortrait() ? 'portrait' : 'horizontal'
  );

  React.useEffect(() => {
    const cb = () => {
      const ori = isWindowPortrait() ? 'portrait' : 'horizontal';

      if (ori !== orientation) {
        setOrientation(ori);
      }
    };

    window.addEventListener('orientationchange', cb);

    return () => {
      window.removeEventListener('orientationchange', cb);
    };
  }, [orientation]);

  return orientation;
};


export default isMobile;
