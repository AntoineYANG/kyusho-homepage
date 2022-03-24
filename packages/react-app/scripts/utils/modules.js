/* eslint-disable max-lines */
/* eslint-disable camelcase */
/* eslint-disable no-magic-numbers */
/* eslint-disable array-element-newline */
/* eslint-disable id-length */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable complexity */
'use strict';

const fs = require('fs');
const path = require('path');
const paths = require('../../configs/path.json');
const chalk = require('react-dev-utils/chalk');
const resolve = require('resolve');

/**
 * Get additional module paths based on the baseUrl of a compilerOptions object.
 *
 * @param {Object} options
 */
const getAdditionalModulePaths = options => {
  const baseUrl = options?.baseUrl;

  if (!baseUrl) {
    return '';
  }

  const { rootDir, src } = paths;

  const baseUrlResolved = path.resolve(
    fs.realpathSync(process.cwd()),
    rootDir,
    baseUrl
  );

  // We don't need to do anything if `baseUrl` is set to `node_modules`. This is
  // the default behavior.
  if (path.relative(path.resolve(fs.realpathSync(process.cwd()), 'node_modules'), baseUrlResolved) === '') {
    return null;
  }

  // Allow the user set the `baseUrl` to `appSrc`.
  if (path.relative(path.resolve(fs.realpathSync(process.cwd()), rootDir, src), baseUrlResolved) === '') {
    return [path.resolve(fs.realpathSync(process.cwd()), rootDir, src)];
  }

  // If the path is equal to the root directory we ignore it here.
  // We don't want to allow importing from the root directly as source files are
  // not transpiled outside of `src`. We do allow importing them with the
  // absolute path (e.g. `src/Components/Button.js`) but we set that up with
  // an alias.
  if (path.relative(path.resolve(fs.realpathSync(process.cwd()), rootDir), baseUrlResolved) === '') {
    return null;
  }

  // Otherwise, throw an error.
  throw new Error(
    chalk.red.bold(
      "Your project's `baseUrl` can only be set to `src` or `node_modules`."
        + ' Create React App does not support other values at this time.'
    )
  );
};

/**
 * Get webpack aliases based on the baseUrl of a compilerOptions object.
 *
 * @param {*} options
 */
const getWebpackAliases = options => {
  const baseUrl = options?.baseUrl;

  if (!baseUrl) {
    return {};
  }

  const baseUrlResolved = path.resolve(fs.realpathSync(process.cwd()), paths.rootDir, baseUrl);

  if (path.relative(path.resolve(fs.realpathSync(process.cwd()), paths.rootDir), baseUrlResolved) === '') {
    return {
      src: path.resolve(fs.realpathSync(process.cwd()), paths.rootDir, paths.src),
    };
  }

  return {};
};

/**
 * Get jest aliases based on the baseUrl of a compilerOptions object.
 *
 * @param {*} options
 */
const getJestAliases = options => {
  const baseUrl = options?.baseUrl;

  if (!baseUrl) {
    return {};
  }

  const baseUrlResolved = path.resolve(
    fs.realpathSync(process.cwd()),
    paths.rootDir,
    baseUrl
  );

  if (path.relative(path.resolve(fs.realpathSync(process.cwd()), paths.rootDir), baseUrlResolved) === '') {
    return {
      '^src/(.*)$': '<rootDir>/src/$1',
    };
  }

  return {};
};

const getModules = () => {
  const ts = require(resolve.sync('typescript', {
    basedir: path.resolve(fs.realpathSync(process.cwd()), 'node_modules'),
  }));
  const { config } = ts.readConfigFile(path.resolve(fs.realpathSync(process.cwd()), 'tsconfig.json'), ts.sys.readFile);

  const options = config.compilerOptions || {};

  const additionalModulePaths = getAdditionalModulePaths(options);

  return {
    additionalModulePaths,
    webpackAliases:        getWebpackAliases(options),
    jestAliases:           getJestAliases(options),
    hasTsConfig:           true,
  };
};

module.exports = getModules();
