/*
 * @Author: Kanata You 
 * @Date: 2022-01-24 17:18:06 
 * @Last Modified by: Kanata You
 * @Last Modified time: 2022-01-24 17:33:48
 */
'use strict';

const fs = require('fs');
const env = require('espoir-cli/env').default;

const {
  name: appName,
  _moduleAliases = {}
} = require('../../package.json');


const loadAliases = () => {
  const tsConfigFile = env.resolvePathInPackage(appName, 'tsconfig.json');

  const aliases = {};

  if (fs.existsSync(tsConfigFile)) {
    const tsConfig = require(tsConfigFile);

    const data = tsConfig.compilerOptions && tsConfig.compilerOptions.paths;

    if (data) {
      Object.entries(data).forEach(([k, v]) => {
        const prefix = k.replace(/\/\*?$/, '');
        const target = env.resolvePathInPackage(
          appName,
          tsConfig.compilerOptions.baseUrl ?? '.',
          v[0].replace(/\/\*?$/, '')
        );

        aliases[prefix] = target;
      });
    }
  } else {
    Object.entries(_moduleAliases).forEach(([k, v]) => {
      const target = env.resolvePathInPackage(
        appName,
        v
      );

      aliases[k] = target;
    });
  }

  return aliases;
};


module.exports = loadAliases;
