/*
 * @Author: Kanata You 
 * @Date: 2022-01-24 21:42:16 
 * @Last Modified by: Kanata You
 * @Last Modified time: 2022-01-24 23:08:39
 */
'use strict';


/**
 * @param {import('webpack').WebpackError[]} errs
 */
const printWebpackErrors = async (errs, level = 'error') => {
  const chalk = (await import('chalk')).default;

  errs.forEach(err => {
    console.log(`${
      level === 'error' ? chalk.bgRed.white('Webpack') : chalk.bgYellow.black('Webpack')
    } ${
      level === 'error' ? chalk.red(err.name) : chalk.yellow(err.name)
    }: ${err.message}\n`);
  });
};


module.exports = printWebpackErrors;
