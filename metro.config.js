const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const config = getDefaultConfig(__dirname);

config.resolver.extraNodeModules = {
  ...config.resolver.extraNodeModules,
  path: require.resolve('path-browserify'),
  crypto: require.resolve('react-native-quick-crypto'),
}

config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (moduleName === '@0xpolygonid/js-sdk') {
    return { type: 'sourceFile', filePath: path.resolve(__dirname, 'node_modules/@0xpolygonid/js-sdk/dist/browser/esm/index.js') };
  }
  if (moduleName === '@iden3/js-jwz') {
    return { type: 'sourceFile', filePath: path.resolve(__dirname, 'node_modules/@iden3/js-jwz/dist/browser/esm/index.js') };
  }
  if (moduleName === '@iden3/js-crypto') {
    return { type: 'sourceFile', filePath: path.resolve(__dirname, 'node_modules/@iden3/js-crypto/dist/browser/esm/index.js') };
  }
  if (moduleName === '@iden3/js-iden3-core') {
    return { type: 'sourceFile', filePath: path.resolve(__dirname, 'node_modules/@iden3/js-iden3-core/dist/browser/esm/index.js') };
  }
  if (moduleName === '@iden3/js-merkletree') {
    return { type: 'sourceFile', filePath: path.resolve(__dirname, 'node_modules/@iden3/js-merkletree/dist/browser/esm/index.js') };
  }
  if (moduleName === '@iden3/js-jsonld-merklization') {
    return { type: 'sourceFile', filePath: path.resolve(__dirname, 'node_modules/@iden3/js-jsonld-merklization/dist/browser/esm/index.js') };
  }
  if (moduleName === 'ffjavascript') {
    return { type: 'sourceFile', filePath: path.resolve(__dirname, 'node_modules/ffjavascript/build/browser.esm.js') };
  }
  if (moduleName === 'snarkjs') {
    return { type: 'sourceFile', filePath: path.resolve(__dirname, 'node_modules/snarkjs/build/browser.esm.js') };
  }

  return context.resolveRequest(context, moduleName, platform);
};

module.exports = config;