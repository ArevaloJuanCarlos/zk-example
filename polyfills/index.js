import 'react-native-get-random-values';

import { fetch } from 'expo/fetch';

//import 'react-native-url-polyfill/auto';

global.Blob = undefined;
global.fetch = (url, body) => {
  return fetch(url, {
    ...body,
    method: body?.method.toUpperCase() || 'GET',
  });
};