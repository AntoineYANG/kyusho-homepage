/*
 * @Author: Kanata You 
 * @Date: 2022-01-24 17:59:40 
 * @Last Modified by: Kanata You
 * @Last Modified time: 2022-03-27 18:40:51
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

/**
 * @param {'dev' | 'prod'} buildMode
 */
const loadEnvVars = buildMode => {
  if (fs.existsSync(envVarsFile)) {
    return Object.fromEntries(
      Object.entries(require(envVarsFile)[buildMode] ?? {}).map(([k, v]) => {
        return [k, JSON.stringify(v)];
      })
    );
  }

  return {};
};


module.exports = loadEnvVars;
