/*
 * @Author: Kanata You 
 * @Date: 2022-01-25 19:57:58 
 * @Last Modified by: Kanata You
 * @Last Modified time: 2022-03-17 18:02:17
 */
'use strict';

const fs = require('fs');
const path = require('path');
const chalk = import('chalk').then(mod => mod.default);
const formatSize = require('./format-size');


/**
 * @returns {{name: string; stat: fs.StatSyncFn;}[]}
 */
const readDirAll = _path => {
  return fs.readdirSync(_path).reduce(
    (list, name) => {
      const fn = path.join(_path, name);
      const stat = fs.statSync(fn);

      if (stat.isFile()) {
        return [
          ...list, {
            name: fn.replace(/\\/g, '/'),
            stat
          }
        ];
      } else if (stat.isDirectory()) {
        return [
          ...list,
          ...readDirAll(fn)
        ];
      }

      return list;
    }, []
  );
};

const groupList = [{
  tag: 'JS',
  pattern: /^static\/js\/.+\.js$/
}, {
  tag: 'CSS',
  pattern: /^static\/css\/.+\.css$/
}, ];

/**
 * @returns {{name: string; size: number; tag: string;}[]}
 */
const analyzeProduct = outputPath => {
  let total = 0;

  if (!fs.existsSync(outputPath)) {
    return [];
  }
  
  const data = readDirAll(outputPath).reduce(
    (list, file) => {
      const name = path.relative(outputPath, file.name).replace(/\\/g, '/');

      total += file.stat.size;
      
      const group = groupList.find(({ pattern }) => pattern.test(name));

      if (group) {
        return [
          ...list,
          {
            name,
            tag: group.tag,
            size: file.stat.size
          }
        ];
      }

      return list;
    }, []
  );

  return [
    ...data, {
      name: '<product>',
      tag: 'TOTAL',
      size: total
    }
  ];
};

const MAX_LEN = 32;

const differStats = async (prevStats, curStats) => {
  const groups = [];

  prevStats.forEach(({ size, tag }) => {
    const which = groups.find(g => g.tag === tag) ?? (
      groups[groups.push({
        tag,
        before: 0,
        after: 0
      }) - 1]
    );

    which.before += size;
  });

  const names = [];
  const sizes = [];

  curStats.forEach(({ name, size, tag }, i) => {
    const which = groups.find(g => g.tag === tag) ?? (
      groups[groups.push({
        tag,
        before: 0,
        after: 0
      }) - 1]
    );

    which.after += size;

    if (i < curStats.length - 1) {
      // not TOTAL tag
      names.push(name);
      sizes.push(formatSize(size));
    }
  });
  
  await chalk.then(_chalk => {
    const nameMaxLen = Math.min(
      Math.max(...names.map(n => n.length)),
      MAX_LEN
    );
    
    const fName = name => {
      if (name.length > nameMaxLen) {
        const left = name.slice(0, 8);
        const right = name.slice(name.length - (nameMaxLen - (MAX_LEN - 9)));

        return `${left}...${right}`;
      }

      return name.padStart(nameMaxLen, ' ');
    };

    console.log(_chalk.yellowBright('gzipped sizes:'));

    for (let i = 0; i < curStats.length - 1; i += 1) {
      console.log(
        `  ${_chalk.cyan(fName(names[i]))}  ${_chalk.green(sizes[i])}`
      );
    }

    console.log();

    groups.forEach(({ tag, before, after }) => {
      console.log(` : ${
        _chalk.bold.magenta(tag.padEnd(5))
      }  ${
        before ? _chalk.gray(formatSize(before).padEnd(10)) : ' '.repeat(10)
      } -> ${
        after ? formatSize(after) : '0'
      } ${
        after === before ? _chalk.green('(+0B)') : after < before ? (
          _chalk.greenBright(`(-${formatSize(before - after)} ${
            after === 0 ? '100' : (
              (before - after) / before * 100
            ).toFixed(0)
          }%)`)
        ) : (
          _chalk.yellow(`(+${formatSize(after - before)}${
            before === 0 ? '' : ` ${
              ((after - before) / before * 100).toFixed(0)
            }%`
          })`)
        )
      }`)
    });
  });

  console.log();
};


module.exports = {
  analyzeProduct,
  differStats
};
