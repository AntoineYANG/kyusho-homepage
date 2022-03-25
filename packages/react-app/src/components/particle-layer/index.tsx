/*
 * @Author: Kanata You 
 * @Date: 2022-03-22 00:38:39 
 * @Last Modified by: Kanata You
 * @Last Modified time: 2022-03-25 16:21:17
 */

import React from 'react';
import styled from 'styled-components';

import './index.scss';


const ParticleBody = styled.div({
  zIndex: 999,
  position: 'absolute',
  left: 0,
  top: 0,
  width: '100vw',
  height: '100vh',
  overflow: 'hidden',
  filter: 'drop-shadow(0 0 10px white)',
  pointerEvents: 'none',
  WebkitMaskBoxImage: '-webkit-linear-gradient(transparent 24%,#0008 80%,#000c 88%,#000 92%)'
});

const ParticleAmbience = styled.div({
  position: 'absolute',
  left: 0,
  top: 0,
  width: '100vw',
  height: '100vh',
  background: 'linear-gradient(to top, #C879FF42, #C879FF10 8%, transparent 14%)'
  // background: 'linear-gradient(to top, #ffd6df18, #f3e2e602 36%)'
});

export interface ParticleLayerProps {
  /** 粒子数量，默认 200，最大支持 512 */
  amount?: number;
}

/**
 * 组件：粒子效果图层.
 */
const ParticleLayer: React.FC<ParticleLayerProps> = ({
  amount = 200
}) => {
  let realAmount = Math.floor(Math.max(Math.min(512, amount), 1));

  return (
    <ParticleBody
      role="presentation"
      aria-hidden
    >
      <ParticleAmbience
        role="presentation"
        aria-hidden
      />
      <div
        role="presentation"
        aria-hidden
      >
        {
          new Array<0>(realAmount).fill(
            0, 0, realAmount
          ).map((_, i) => (
            <div
              key={i}
              className="particle"
              role="presentation"
              aria-hidden
            />
          ))
        }
      </div>
    </ParticleBody>
  );
}


export default ParticleLayer;
