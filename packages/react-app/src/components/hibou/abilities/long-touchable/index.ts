/*
 * @Author: Kanata You 
 * @Date: 2022-06-24 15:00:29 
 * @Last Modified by: Kanata You
 * @Last Modified time: 2022-07-10 23:18:42
 */

import React from 'react';


/**
 * 长按交互事件.
 */
export interface LongTouchEvent<
  T extends (
    | 'longTouchDetermine'
    | 'longTouchStart'
    | 'longTouchEnd'
    | 'longTouchCancel'
  )
> {
  /**
   * 事件类型，有四种有效值：
   * + `"longTouchDetermine"` - 开始计时判定，此时长按并未触发
   * + `"longTouchStart"` - 在判定为长按时触发
   * + `"longTouchEnd"` - 在长按结束时触发
   * + `"longTouchCancel"` - 在长按取消时触发，整个周期内没有判定成功的长按行为
   */
  type: T;
  /** 命中监听的元素 */
  target: HTMLElement | SVGElement | null;
  /** 挂载监听的元素，当长按被打断时，这一字段为 null */
  currentTarget: HTMLElement | SVGElement | null;
  /** 长按约定阈值 */
  threshold: number;
  /** 长按开始时间 */
  beginTime: number;
  /** 长按持续时间 */
  touchTime: number;
  /** 事件广播时间 */
  currentTime: number;
}

/**
 * 实现这个接口的组件将具有长按交互能力.
 */
export default interface LongTouchable {
  /** 标记长按判定的时间阈值（毫秒），默认为 400 */
  longTouchTime?: number;

  /** 监听长按事件判定计时开始（长按事件未触发） */
  onLongTouchDetermine?: (event: LongTouchEvent<'longTouchDetermine'>) => void;
  /** 监听长按事件开始 */
  onLongTouchStart?: (event: LongTouchEvent<'longTouchStart'>) => void;
  /** 监听长按事件结束 */
  onLongTouchEnd?: (event: LongTouchEvent<'longTouchEnd'>) => void;
  /** 监听长按事件判定取消（长按事件未触发） */
  onLongTouchCancel?: (event: LongTouchEvent<'longTouchCancel'>) => void;
}

const MAX_MOVABLE_SQ = 10;

/** 获取标准化长按交互监听器 */
export const useLongTouchHandlers = ({
  longTouchTime = 400,
  onLongTouchDetermine,
  onLongTouchStart,
  onLongTouchEnd,
  onLongTouchCancel,
}: LongTouchable) => {
  /** 标记为数字时表示按下的开始时间，标记为 null 时表示没有被按下 */
  const touchingFlagRef = React.useRef<number | null>(null);

  /** 记录已触发的长按事件的监听元素 */
  const targetRef = React.useRef<HTMLElement | SVGElement | null>(null);

  /** 记录已触发的长按事件的命中元素 */
  const currentTargetRef = React.useRef<HTMLElement | SVGElement | null>(null);

  /** 记录按下的坐标 */
  const touchPositionRef = React.useRef<[number, number] | null>(null);

  /** 存储计时器 */
  const timerRef = React.useRef<NodeJS.Timer | null>(null);

  /** 主动取消长按交互 */
  const cancel = React.useCallback(() => {
    // 取消计时器
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    if (touchingFlagRef.current !== null) {
      const ct = Date.now();
      
      // 广播 longTouchCancel 事件
      onLongTouchCancel?.({
        type: 'longTouchCancel',
        target: targetRef.current,
        currentTarget: null,
        threshold: longTouchTime,
        beginTime: touchingFlagRef.current,
        touchTime: ct - touchingFlagRef.current,
        currentTime: ct,
      });

      // 清空标记
      touchingFlagRef.current = null;
      targetRef.current = null;
      currentTargetRef.current = null;
      touchPositionRef.current = null;
    }
  }, [longTouchTime, onLongTouchCancel]);

  /** 监听按下，开始计时 */
  const handleTouchDetermine = React.useCallback((ev: React.MouseEvent | React.TouchEvent) => {
    // 清空记录
    cancel();

    const ct = Date.now();

    // 设置标记
    touchingFlagRef.current = ct;
    targetRef.current = (
      ev.target instanceof HTMLElement || ev.target instanceof SVGElement
    ) ? ev.target : null;
    currentTargetRef.current = (
      ev.currentTarget instanceof HTMLElement || ev.currentTarget instanceof SVGElement
    ) ? ev.currentTarget : null;
    touchPositionRef.current = ev.type === 'mousedown' ? [
      (ev as React.MouseEvent).clientX,
      (ev as React.MouseEvent).clientY,
    ] : [
      (ev as React.TouchEvent).changedTouches[0]?.clientX ?? NaN,
      (ev as React.TouchEvent).changedTouches[0]?.clientY ?? NaN,
    ];

    // 广播 longTouchDetermine 事件
    onLongTouchDetermine?.({
      type: 'longTouchDetermine',
      target: targetRef.current,
      currentTarget: currentTargetRef.current,
      threshold: longTouchTime,
      beginTime: ct,
      touchTime: 0,
      currentTime: ct,
    });

    // 设置定时
    timerRef.current = setTimeout(() => {
      const _ct = Date.now();

      // 广播 longTouchStart 事件
      onLongTouchStart?.({
        type: 'longTouchStart',
        target: targetRef.current,
        currentTarget: currentTargetRef.current,
        threshold: longTouchTime,
        beginTime: ct,
        touchTime: _ct - ct,
        currentTime: _ct,
      });

      // 清除计时器
      timerRef.current = null;
    }, longTouchTime);
  }, [cancel, longTouchTime, onLongTouchDetermine, onLongTouchStart]);

  /** 监听按下时是否移动 */
  const handleMove = React.useCallback((ev: React.MouseEvent<Element, MouseEvent> | React.TouchEvent) => {
    if (touchingFlagRef.current !== null && touchPositionRef.current !== null) {
      const pos: [number, number] = ev.type === 'mousemove' ? [
        (ev as React.MouseEvent).clientX,
        (ev as React.MouseEvent).clientY,
      ] : [
        (ev as React.TouchEvent).changedTouches[0]?.clientX ?? NaN,
        (ev as React.TouchEvent).changedTouches[0]?.clientY ?? NaN,
      ];

      const distanceSq = (
        pos[0] - touchPositionRef.current[0]
      ) ** 2 + (
        pos[1] - touchPositionRef.current[1]
      ) ** 2;

      if (distanceSq >= MAX_MOVABLE_SQ) {
        // 达到或超过最大可移动距离，长按取消
        if (timerRef.current !== null) {
          // 正在判定：结束判定计时
          clearTimeout(timerRef.current);
          timerRef.current = null;
          
          const ct = Date.now();

          // 广播 longTouchCancel 事件
          onLongTouchCancel?.({
            type: 'longTouchCancel',
            target: targetRef.current,
            currentTarget: (
              ev.currentTarget instanceof HTMLElement || ev.currentTarget instanceof SVGElement
            ) ? ev.currentTarget : null,
            threshold: longTouchTime,
            beginTime: touchingFlagRef.current,
            touchTime: ct - touchingFlagRef.current,
            currentTime: ct,
          });
        } else {
          // 长按事件已触发：广播长按事件结束
          const ct = Date.now();

          // 广播 longTouchEnd 事件
          onLongTouchEnd?.({
            type: 'longTouchEnd',
            target: targetRef.current,
            currentTarget: currentTargetRef.current,
            threshold: longTouchTime,
            beginTime: touchingFlagRef.current,
            touchTime: ct - touchingFlagRef.current,
            currentTime: ct,
          });
        }

        // 清空标记
        touchingFlagRef.current = null;
        targetRef.current = null;
        currentTargetRef.current = null;
        touchPositionRef.current = null;
      }
    }
  }, [longTouchTime, onLongTouchCancel, onLongTouchEnd]);

  /** 监听抬起，结束长按事件或终止长按判定计时 */
  const handleTouchEnd = React.useCallback((ev: Event) => {
    if (timerRef.current !== null) {
      // 正在判定：结束判定计时
      clearTimeout(timerRef.current);
      timerRef.current = null;

      if (touchingFlagRef.current !== null) {
        const ct = Date.now();

        // 广播 longTouchCancel 事件
        onLongTouchCancel?.({
          type: 'longTouchCancel',
          target: targetRef.current,
          currentTarget: (
            ev.currentTarget instanceof HTMLElement || ev.currentTarget instanceof SVGElement
          ) ? ev.currentTarget : null,
          threshold: longTouchTime,
          beginTime: touchingFlagRef.current,
          touchTime: ct - touchingFlagRef.current,
          currentTime: ct,
        });
      }
    } else if (touchingFlagRef.current !== null) {
      // 长按事件已触发：广播长按事件结束
      const ct = Date.now();

      // 广播 longTouchEnd 事件
      onLongTouchEnd?.({
        type: 'longTouchEnd',
        target: targetRef.current,
        currentTarget: currentTargetRef.current,
        threshold: longTouchTime,
        beginTime: touchingFlagRef.current,
        touchTime: ct - touchingFlagRef.current,
        currentTime: ct,
      });
    }

    // 清空标记
    touchingFlagRef.current = null;
    targetRef.current = null;
    currentTargetRef.current = null;
    touchPositionRef.current = null;
  }, [longTouchTime, onLongTouchCancel, onLongTouchEnd]);

  // 挂载抬起监听到全局
  React.useEffect(() => {
    document.body.addEventListener('mouseup', handleTouchEnd);
    document.body.addEventListener('touchend', handleTouchEnd);
    document.body.addEventListener('touchcancel', handleTouchEnd);
    document.addEventListener('visibilitychange', handleTouchEnd);

    return () => {
      document.body.removeEventListener('mouseup', handleTouchEnd);
      document.body.removeEventListener('touchend', handleTouchEnd);
      document.body.removeEventListener('touchcancel', handleTouchEnd);
      document.removeEventListener('visibilitychange', handleTouchEnd);
    };
  }, [handleTouchEnd]);

  return {
    handleMouseDown: handleTouchDetermine,
    handleTouchStart: handleTouchDetermine,
    handleMouseMove: handleMove,
    handleTouchMove: handleMove,
    style: {
      cursor: onLongTouchStart ? 'pointer' : undefined,
    } as React.CSSProperties,
  };
};
