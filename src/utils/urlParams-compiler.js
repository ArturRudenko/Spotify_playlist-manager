const prepareGetParams = function (params) {
  return Object.entries(params).map(param => param.join('=')).join('&')
}

const parseGetParams = function (string){
  let params = {};
  const keyVals = string.split('&').map(item => {
    const keyVal = item.split('=');
    const obj = {};
    obj[keyVal[0]] = keyVal[1];
    return obj;
  })
  keyVals.forEach(keyVal => {
    params = Object.assign(params, keyVal);
  })
  return params;
}

export default {
  prepareGetParams,
  parseGetParams
}