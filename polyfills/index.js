import 'react-native-get-random-values';

import { fetch } from 'expo/fetch';
import { WebAssembly } from 'polywasm';

global.WebAssembly = WebAssembly;
global.Blob = undefined;
global.fetch = async (url, body) => {
  try {
    if(typeof url !== 'string'){
      url = url.toString();
    }

    const response = await fetch(url, {
      ...body,
      headers: {
        ...(body?.headers?.map || body?.headers || {}),
        'accept-encoding': 'identity',
      },
      method: body?.method?.toUpperCase() ?? 'GET',
    });
    return response;
  } catch (error) {
    console.log('Polyfilled fetch error:', error);
    throw error;
  }
};