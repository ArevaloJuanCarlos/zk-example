// plugins/android-blob-provider.js
const { withAndroidManifest, withStringsXml, AndroidConfig } = require('@expo/config-plugins');

const PROVIDER_NAME = 'com.facebook.react.modules.blob.BlobProvider';
const AUTHORITY_STRING_NAME = 'blob_provider_authority';
const AUTHORITY_STRING_VALUE = 'com.jarevaloferrufino.zkexample.blobs';

function addProvider(androidManifest) {
  const app = AndroidConfig.Manifest.getMainApplicationOrThrow(androidManifest);
  app.provider = app.provider || [];
  const exists = app.provider.some(p => p?.$?.['android:name'] === PROVIDER_NAME);
  if (!exists) {
    app.provider.push({
      $: {
        'android:name': PROVIDER_NAME,
        'android:authorities': `@string/${AUTHORITY_STRING_NAME}`,
        'android:exported': 'false',
      },
    });
  }
  return androidManifest;
}

const withAndroidBlobProvider = (config) => {
  // Modify AndroidManifest.xml
  config = withAndroidManifest(config, (mod) => {
    mod.modResults = addProvider(mod.modResults);
    return mod;
  });

  // Ensure <string name="blob_provider_authority"> is present
  config = withStringsXml(config, (mod) => {
    const xml = mod.modResults || {};
    xml.resources = xml.resources || {};
    xml.resources.string = xml.resources.string || [];

    const name = AUTHORITY_STRING_NAME;
    const strings = xml.resources.string;

    // Normalize entries and find existing index
    const idx = strings.findIndex((item) => item?.$?.name === name);
    const newItem = {
      $: { name, translatable: 'false' },
      _: AUTHORITY_STRING_VALUE,
    };

    if (idx >= 0) {
      strings[idx] = newItem;
    } else {
      strings.push(newItem);
    }

    mod.modResults = xml;
    return mod;
  });

  return config;
};

module.exports = withAndroidBlobProvider;