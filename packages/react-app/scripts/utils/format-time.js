/*
 * @Author: Kanata You 
 * @Date: 2022-01-26 00:27:40 
 * @Last Modified by: Kanata You
 * @Last Modified time: 2022-01-26 02:25:43
 */
'use strict';

const units = [
  'ms', 's', 'min', 'h'
];

const times = [
  1000, 60, 60
]

const formatTime = (time, _, idx = 0) => {
  if (idx < times.length && time >= times[idx]) {
    return formatTime(time / times[idx], _, idx + 1);
  }

  return `${time.toFixed(2).replace(/\.?0+$/, '')}${units[idx]}`;
};


module.exports = formatTime;
