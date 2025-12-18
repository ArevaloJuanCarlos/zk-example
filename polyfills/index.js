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

    let response;
    if(Object.keys(body || {}).length === 0){
      response = await fetch(url);
    } else {
      response = await fetch(url, {
        ...body,
        method: body?.method?.toUpperCase() ?? 'GET',
      })
    }
    return response;
  } catch (error) {
    console.log('Polyfilled fetch error:', error);
    throw error;
  }
};