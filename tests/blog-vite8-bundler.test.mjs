import test from 'node:test';
import assert from 'node:assert/strict';
import config from '../vite.config.js';
import fs from 'node:fs';

test('Vite 8 uses a functional bundle partition that preserves source vendor lanes',()=>{
  const output=config.build.rollupOptions.output;
  assert.equal(typeof output.manualChunks,'function');
  for(const pkg of ['react','react-dom','react-router','react-router-dom'])
    assert.equal(output.manualChunks('/sandbox/node_modules/'+pkg+'/index.js'),'react-vendor',pkg);
  assert.equal(output.manualChunks('/sandbox/node_modules/framer-motion/dist/index.js'),'animation-vendor');
  assert.equal(output.manualChunks('/sandbox/src/App.jsx'),undefined);
});
test('sourcemaps and deployment remain disabled in the security-only build',()=>{
  assert.equal(config.build.minify,'oxc');
  assert.equal(config.build.sourcemap,false);
  assert.equal(JSON.parse(fs.readFileSync('vercel.json','utf8')).git.deploymentEnabled,false);
});
