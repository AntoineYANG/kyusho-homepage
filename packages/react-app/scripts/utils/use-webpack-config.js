/*
 * @Author: Kanata You 
 * @Date: 2022-01-24 16:09:18 
 * @Last Modified by: Kanata You
 * @Last Modified time: 2022-03-27 23:51:03
 */
'use strict';

const fs = require('fs');
const path = require('path');
const env = require('espoir-cli/env').default;
const getCSSModuleLocalIdent = require('react-dev-utils/getCSSModuleLocalIdent');
/** @type {import('chalk') | null} */
let chalk = null;
import('chalk').then(mod => chalk = mod.default);

const loadAliases = require('./load-aliases');
const loadEnvVars = require('./load-env-vars');
const useStyleLoaders = require('./use-style-loaders');
const useProxyConfig = require('./use-proxy-config');

const { name: appName } = require('../../package.json');
const paths = require('../../configs/path.json');

const dir = env.resolvePathInPackage(appName, paths.rootDir);
const entry = env.resolvePathInPackage(appName, paths.rootDir, paths.src, paths.entry);
const outputPath = env.resolvePathInPackage(appName, paths.rootDir, paths.output);

const enableTS = fs.existsSync(
  env.resolvePathInPackage(appName, 'tsconfig.json')
);

const ESLintConfigFile = [
  ...fs.readdirSync(env.resolvePathInPackage(
    appName
  )),
  ...(
    fs.existsSync(
      env.resolvePathInPackage(
        appName,
        'configs'
      )
    ) ? fs.readdirSync(env.resolvePathInPackage(
      appName, 'configs'
    )).map(n => path.join('configs', n)) : []
  ),
].find(fn => /^\.eslintrc\.(js|json)$/.test(fn));

const enableESLint = Boolean(ESLintConfigFile);

const moduleFileExtensions = [
  'web.mjs',
  'mjs',
  'web.js',
  'js',
  enableTS && 'web.ts',
  enableTS && 'ts',
  enableTS && 'web.tsx',
  enableTS && 'tsx',
  'json',
  'web.jsx',
  'jsx',
].filter(Boolean).map(
  ext => `.${ext}`
);

const imageInlineSizeLimit = 10 * 1_000;

const hasJsxRuntime = (() => {
  try {
    require.resolve('react/jsx-runtime');
  } catch (error) {
    return false;
  }
})();

// style files regexes
const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;
const sassRegex = /\.(scss|sass)$/;
const sassModuleRegex = /\.module\.(scss|sass)$/;

// plugins
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
const ModuleNotFoundPlugin = require('react-dev-utils/ModuleNotFoundPlugin');
const { DefinePlugin } = require('webpack');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ForkTsCheckerWebpackPlugin = require('react-dev-utils/ForkTsCheckerWebpackPlugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const InlineChunkHtmlPlugin = require('react-dev-utils/InlineChunkHtmlPlugin');
const { WebpackManifestPlugin: ManifestPlugin } = require('webpack-manifest-plugin');


/**
 * @param {'development' | 'production'} mode
 * @returns {import('webpack').Configuration}
 */
const useWebpackConfig = mode => {
  if (!['development', 'production'].includes(mode)) {
    throw new Error(
      `'mode' must be 'development' or 'production', '${mode}' received.`
    );
  }

  const isDev = mode === 'development';
  const isProd = mode === 'production';

  const enableSourceMap = true;
  
  return {
    // 'development' | 'production'
    mode,
    // reject when error occurred
    bail: isProd,
    // devtool
    devtool: {
      production: enableSourceMap ? 'source-map' : false,
      development: 'cheap-module-source-map'
    }[mode] ?? false,
    // dev server
    devServer: isDev ? {
      proxy: useProxyConfig()
    } : undefined,
    // app entry
    entry,
    // output
    output: {
      // output directory (absolute path)
      path: isProd ? outputPath : undefined,
      // module information
      pathinfo: isDev,
      // output bundle (relative path)
      filename: `static/js/${
        isProd ? '[name].[contenthash:8]' : 'bundle'
      }.js`,
      // output chunk (relative path)
      chunkFilename: `static/js/[name]${
        isProd ? '.[contenthash:8]' : ''
      }.chunk.js`,
      // Filename template string of function for the sources array in a generated SourceMap
      devtoolModuleFilenameTemplate: {
        production: info => path.relative(
          dir,
          info.absoluteResourcePath
        ).replace(/\\/g, '/'),
        development: info => path.resolve(
          info.absoluteResourcePath
        ).replace(/\\/g, '/')
      }[mode] ?? false,
      // 'window' | 'this'
      globalObject: 'this',
    },
    // resolve
    resolve: {
      modules: [
        'node_modules',
        env.resolvePath('node_modules')
      ],
      extensions: moduleFileExtensions,
      fallback: {
        // webpack < 5 used to include polyfills for node.js core modules by default.
        // This is no longer the case.
        url: false,
        zlib: false,
        stream: false,
        string_decoder: false,
        crypto: false,
        querystring: false,
        util: false,
        path: false,
        http: false,
        buffer: false,
      },
      // module aliases
      alias: loadAliases(),
      plugins: [
        // Block importing from unsafe directories
        new ModuleScopePlugin([
          dir,
          env.resolvePath('.espoir', '.modules')
        ], [
          'package.json'
        ])
      ],
    },
    // module
    module: {
      strictExportPresence: true,
      rules: [
        {
          oneOf: [
            // TODO: Merge this config once `image/avif` is in the mime-db
            // https://github.com/jshttp/mime-db
            {
              test:    [/\.avif$/],
              loader:  require.resolve('url-loader'),
              options: {
                limit:    imageInlineSizeLimit,
                mimetype: 'image/avif',
                name:     'static/media/[name].[hash:8].[ext]',
              },
            },
            // "url" loader works like "file" loader except that it embeds assets
            // smaller than specified limit in bytes as data URLs to avoid requests.
            // A missing `test` is equivalent to a match.
            {
              test:    [
                /\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/
              ],
              loader:  require.resolve('url-loader'),
              options: {
                limit: imageInlineSizeLimit,
                name:  'static/media/[name].[hash:8].[ext]',
              },
            },
            // Process application JS with Babel.
            // The preset includes JSX, Flow, TypeScript, and some ESnext features.
            {
              test:    /\.(js|mjs|jsx|ts|tsx)$/,
              include: env.resolvePathInPackage(
                appName, paths.rootDir, paths.src
              ),
              exclude: [env.resolvePath('node_modules'), env.resolvePath('.espoir')],
              loader:  require.resolve('babel-loader'),
              options: {
                customize: require.resolve(
                  'babel-preset-react-app/webpack-overrides'
                ),
                presets: [
                  [
                    require.resolve('babel-preset-react-app'),
                    {
                      runtime: hasJsxRuntime ? 'automatic' : 'classic',
                    },
                  ],
                ],
                plugins: [
                  [
                    require.resolve('babel-plugin-named-asset-import'),
                    {
                      loaderMap: {
                        svg: {
                          ReactComponent:
                            '@svgr/webpack?-svgo,+titleProp,+ref![path]',
                        },
                      },
                    },
                    require.resolve('babel-plugin-react-anonymous-display-name'),
                  ]
                ].filter(Boolean),
                // This is a feature of `babel-loader` for webpack (not Babel itself).
                // It enables caching results in ./node_modules/.cache/babel-loader/
                // directory for faster rebuilds.
                cacheDirectory:   true,
                // See #6846 for context on why cacheCompression is disabled
                cacheCompression: false,
                compact:          isProd,
              },
            },
            // Process any JS outside of the app with Babel.
            // Unlike the application JS, we only compile the standard ES features.
            {
              test:    /\.(js|mjs)$/,
              exclude: /@babel(?:\/|\\{1,2})runtime/,
              loader:  require.resolve('babel-loader'),
              options: {
                babelrc:    false,
                configFile: false,
                compact:    false,
                presets:    [
                  [
                    require.resolve('babel-preset-react-app/dependencies'),
                    { helpers: true },
                  ],
                ],
                cacheDirectory:   true,
                // See #6846 for context on why cacheCompression is disabled
                cacheCompression: false,
                
                // Babel sourcemaps are needed for debugging into node_modules
                // code.  Without the options below, debuggers like VSCode
                // show incorrect code and set breakpoints on the wrong lines.
                sourceMaps:     enableSourceMap,
                inputSourceMap: enableSourceMap,
              },
            },
            // "postcss" loader applies autoprefixer to our CSS.
            // "css" loader resolves paths in CSS and adds assets as dependencies.
            // "style" loader turns CSS into JS modules that inject <style> tags.
            // In production, we use MiniCSSExtractPlugin to extract that CSS
            // to a file, but in development "style" loader enables hot editing
            // of CSS.
            // By default we support CSS Modules with the extension .module.css
            {
              test:    cssRegex,
              exclude: cssModuleRegex,
              use:     useStyleLoaders(
                isDev, {
                importLoaders: 1,
                sourceMap:     isProd
                  ? enableSourceMap
                  : isDev,
                },
                undefined,
                dir,
                paths,
                enableSourceMap
              ),
              // Don't consider CSS imports dead code even if the
              // containing package claims to have no side effects.
              // Remove this when webpack adds a warning or an error for this.
              // See https://github.com/webpack/webpack/issues/6571
              sideEffects: true,
            },
            // Adds support for CSS Modules (https://github.com/css-modules/css-modules)
            // using the extension .module.css
            {
              test: cssModuleRegex,
              use:  useStyleLoaders(
                isDev, {
                  importLoaders: 1,
                  sourceMap:     isProd
                    ? enableSourceMap
                    : isDev,
                  modules: {
                    getLocalIdent: getCSSModuleLocalIdent,
                  },
                },
                undefined,
                dir,
                paths,
                enableSourceMap
              ),
            },
            // Opt-in support for SASS (using .scss or .sass extensions).
            // By default we support SASS Modules with the
            // extensions .module.scss or .module.sass
            {
              test:    sassRegex,
              exclude: sassModuleRegex,
              use:     useStyleLoaders(
                isDev, {
                  importLoaders: 3,
                  sourceMap:     isProd
                    ? enableSourceMap
                    : isDev,
                },
                'sass-loader',
                dir,
                paths,
                enableSourceMap
              ),
              // Don't consider CSS imports dead code even if the
              // containing package claims to have no side effects.
              // Remove this when webpack adds a warning or an error for this.
              // See https://github.com/webpack/webpack/issues/6571
              sideEffects: true,
            },
            // Adds support for CSS Modules, but using SASS
            // using the extension .module.scss or .module.sass
            {
              test: sassModuleRegex,
              use:  useStyleLoaders(
                isDev, {
                  importLoaders: 3,
                  sourceMap:     isProd
                    ? enableSourceMap
                    : isDev,
                  modules: {
                    getLocalIdent: getCSSModuleLocalIdent,
                  },
                },
                'sass-loader',
                dir,
                paths,
                enableSourceMap
              ),
            },
            // "file" loader makes sure those assets get served by WebpackDevServer.
            // When you `import` an asset, you get its (virtual) filename.
            // In production, they would get copied to the `build` folder.
            // This loader doesn't use a "test" so it will catch all modules
            // that fall through the other loaders.
            {
              loader:  require.resolve('file-loader'),
              // Exclude `js` files to keep "css" loader working as it injects
              // its runtime that would otherwise be processed through "file" loader.
              // Also exclude `html` and `json` extensions so they get processed
              // by webpacks internal loaders.
              exclude: [/\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
              options: {
                name: resourcePath => (
                  resourcePath.match(/aid\d{4}(\.md)?$/)
                  ? 'static/get/article/[name]'
                  : 'static/media/[name].[hash:8].[ext]'
                ),
              },
            },
            // ** STOP ** Are you adding a new loader?
            // Make sure to add the new loader(s) before the "file" loader.
          ],
        },
      ],
    },
    // plugins
    plugins: [
      // Generates an `index.html` file with the <script> injected.
      new HtmlWebpackPlugin(
        Object.assign(
          {},
          {
            inject:   true,
            template: env.resolvePathInPackage(
              appName, paths.rootDir, paths.template
            ),
          },
          isProd ? {
            minify: {
              removeComments:                true,
              collapseWhitespace:            true,
              removeRedundantAttributes:     true,
              useShortDoctype:               true,
              removeEmptyAttributes:         true,
              removeStyleLinkTypeAttributes: true,
              keepClosingSlash:              true,
              minifyJS:                      true,
              minifyCSS:                     true,
              minifyURLs:                    true,
            },
          } : undefined
        )
      ),
      // Inlines the webpack runtime script. This script is too small to warrant
      // a network request.
      // https://github.com/facebook/create-react-app/issues/5358
      isProd && new InlineChunkHtmlPlugin(
        HtmlWebpackPlugin,
        [/runtime-.+[.]js/]
      ),
      // Inject environment variables in template html.
      new InterpolateHtmlPlugin(HtmlWebpackPlugin, {
        PUBLIC_URL: paths.referencePath.replace(/[/.]$/, '')
      }),
      // This gives some necessary context to module not found errors, such as
      // the requesting resource.
      new ModuleNotFoundPlugin(dir),
      // Inject environment variables in JS code.
      new DefinePlugin(loadEnvVars(isDev ? 'dev' : 'prod')),
      // Watcher doesn't work well if you mistype casing in a path so we use
      // a plugin that prints an error when you attempt to do this.
      // See https://github.com/facebook/create-react-app/issues/240
      isDev && new CaseSensitivePathsPlugin(),
      isProd && new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename:      'static/css/[name].[contenthash:8].css',
        chunkFilename: 'static/css/[name].[contenthash:8].chunk.css',
      }),
      // Generate an asset manifest file with the following content:
      // - "files" key: Mapping of all asset filenames to their corresponding
      //   output file so that tools can pick it up without having to parse
      //   `index.html`
      // - "entrypoints" key: Array of files which are included in `index.html`,
      //   can be used to reconstruct the HTML if necessary
      new ManifestPlugin({
        fileName:   isDev ? 'manifest.json' : 'asset-manifest.json',
        publicPath: env.resolvePathInPackage(
          dir, paths.referencePath
        ),
        generate:   (seed, files, entrypoints) => {
          const manifestFiles = files.reduce((manifest, file) => {
            manifest[file.name] = file.path;
            return manifest;
          }, seed);
          const entrypointFiles = entrypoints.main.filter(
            fileName => !fileName.endsWith('.map')
          );

          return {
            files:       manifestFiles,
            entrypoints: entrypointFiles,
          };
        },
      }),
      // TypeScript type checking
      enableTS && new ForkTsCheckerWebpackPlugin({
        // @see https://www.npmjs.com/package/fork-ts-checker-webpack-plugin#typescript-options
        typescript: {
          configFile: env.resolvePathInPackage(
            appName, 'tsconfig.json'
          )
        },
        async: isDev
      }),
      // ESLint checking
      enableESLint && new ESLintPlugin({
        // eslint runtime: eslint@7
        eslintPath:           require.resolve('eslint'),
        rulePaths:            [ESLintConfigFile],
        // lintDirtyModulesOnly: isDev,
        extensions:    [
          'js', 'mjs', 'jsx', 'ts', 'tsx'
        ],
        formatter:     require.resolve('react-dev-utils/eslintFormatter'),
        failOnError:   !isDev,
        context:       dir,
        cache:         true,
        cacheLocation: path.resolve(
          env.resolvePath('node_modules'),
          '.cache/.eslintcache'
        ),
        // ESLint class options
        cwd:                      dir,
        resolvePluginsRelativeTo: __dirname,
      }),
    ].filter(Boolean),
    // dev server console config
    infrastructureLogging: isDev ? {
      console: {
        ...console,
        info: (...data) => {
          const source = (
            /^\[[^\]]+\]/.exec(data[0] || '[webpack]') || ['[webpack]']
          )[0].replace(/^\[/, '').replace(/\]$/, ':');

          console.info(
            chalk ? chalk.yellow(source) : source,
            ...data.map(n => n.replace(/^\[[^\]]+\]\s*/, ''))
          );
        }
      }
    } : {},
  };
};


module.exports = useWebpackConfig;
