/*
 * @Author: Kanata You 
 * @Date: 2022-01-24 15:46:57 
 * @Last Modified by: Kanata You
 * @Last Modified time: 2022-01-26 02:25:25
 */
'use strict';

// initialize
const init = require('./utils/init');
init('prod');

const path = require('path');
const fs = require('fs-extra');
const webpack = require('webpack');
const chalk = import('chalk').then(mod => mod.default);
const env = require('espoir-cli/env').default;

const copyPublicDir = require('./utils/copy-public-dir');
const useWebpackConfig = require('./utils/use-webpack-config');
const printWebpackErrors = require('./utils/print-webpack-errors');
const {
  analyzeProduct,
  differStats
} = require('./utils/analyze-product');
const formatTime = require('./utils/format-time');


const { name: appName } = require('../package.json');
const paths = require('../configs/path.json');

const dir = env.resolvePathInPackage(appName, paths.rootDir);
const outputPath = env.resolvePathInPackage(appName, paths.rootDir, paths.output);

const prepareOutputDir = async () => {
  const prevStats = analyzeProduct(outputPath);
  
  // clear output directory
  fs.emptyDirSync(outputPath);

  // merge public dir
  const publicPath = path.resolve(dir, paths.publicPath);
  copyPublicDir(publicPath, path.join(outputPath, paths.referencePath), path.join(dir, paths.template));

  return prevStats;
};

const runBuild = async prevStats => {
  const config = useWebpackConfig('production');
  
  await chalk.then(async _chalk => {
    console.log(
      _chalk.blue('Start building...')
    );

    const compiler = webpack(config);

    await new Promise((resolve, reject) => {
      compiler.run(async (err, result) => {
        if (err) {
          console.log(
            _chalk.redBright(err.message ?? 'Uncaught Error')
          );

          return reject(err);
        } else if (result.hasErrors()) {
          await printWebpackErrors(result.compilation.errors);

          const _err = new Error(
            `${
              result.compilation.errors.length
            } error${
              result.compilation.errors.length > 1 ? 's' : ''
            } occurred when running compilation.`
          );

          console.log(
            _chalk.redBright(_err.message)
          );

          return reject(_err);
        } else if (result.hasWarnings()) {
          console.log(
            _chalk.yellow('Completed with warnings.')
          );

          await printWebpackErrors(result.compilation.warnings, 'warning');
        } else {
          console.log(
            _chalk.green('Completed.')
          );
        }

        console.log(
          `${
            _chalk.yellowBright('Total cost: ')
          }${
            _chalk.green(
              formatTime(result.endTime - result.startTime)
            )
          }`
        );

        const curStats = analyzeProduct(outputPath);

        await differStats(prevStats, curStats);

        console.log(
          `\nRun \`${
            _chalk.blueBright(`serve ${outputPath}`)
          }\` to start server.`
        );

        resolve();
      });
    });
  });

  console.log();
};


const webpackBuild = async () => {
  const prevStats = await prepareOutputDir();

  await runBuild(prevStats);

  return 0;
};


if (require.main === module) {
  webpackBuild().then(process.exit);
}


module.exports = webpackBuild;
