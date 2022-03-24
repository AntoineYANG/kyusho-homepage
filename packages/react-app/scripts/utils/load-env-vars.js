/*
 * @Author: Kanata You 
 * @Date: 2022-01-24 17:59:40 
 * @Last Modified by: Kanata You
 * @Last Modified time: 2022-01-24 18:03:43
 */
'use strict';

const fs = require('fs');
const env = require('espoir-cli/env').default;

const { name: appName } = require('../../package.json');

const envVarsFile = env.resolvePathInPackage(
  appName,
  'configs',
  'env.json'
);

const loadEnvVars = () => {
  if (fs.existsSync(envVarsFile)) {
    return Object.fromEntries(
      Object.entries(require(envVarsFile)).map(([k, v]) => {
        return [k, JSON.stringify(v)];
      })
    );
  }

  return {};
};


module.exports = loadEnvVars;
