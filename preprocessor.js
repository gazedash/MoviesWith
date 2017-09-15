// Copyright 2004-present Facebook. All Rights Reserved.

const tsc = require('typescript');
const tsConfig = require('./tsconfig.json');
const babelJest = require('babel-jest');

module.exports = {
  process(src, path) {
    if (path.endsWith('.ts') || path.endsWith('.tsx')) {
      src = tsc.transpile(src, tsConfig.compilerOptions, path, []);
      src = babelJest.process(
        src,
        path,
    );
    return src;
      
    }
    return src;
  },
};