/*
 * @Author: Kanata You 
 * @Date: 2022-01-26 00:27:40 
 * @Last Modified by: Kanata You
 * @Last Modified time: 2022-01-26 00:43:39
 */
'use strict';

const units = [
  'B', 'K', 'M', 'G'
];

const formatSize = (bytes, _, idx = 0) => {
  if (bytes >= 1024 * 0.9 && idx < units.length - 1) {
    return formatSize(bytes / 1024, _, idx + 1);
  }

  return `${bytes.toFixed(2).replace(/\.?0+$/, '')}${units[idx]}`;
};


module.exports = formatSize;
