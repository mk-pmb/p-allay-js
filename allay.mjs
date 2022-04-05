// -*- coding: utf-8, tab-width: 2 -*-

import getOwn from 'getown';


function ensureError(e) {
  if (e === '') { return new TypeError('Original error was an empty string.'); }
  const t = (e && typeof e);
  if (t === 'object') { return e; }
  if (t === 'string') { return new Error(e); }
  return new TypeError('Original error was neither object nor string: ' + e);
}


function maybePr(pr, f) { return (pr ? pr.then(null, f) : f); }


const EX = {

  ifPropDef(key, pr) {
    return maybePr(pr, function allayIfPropDef(err) {
      if (err) {
        const val = err[key];
        // console.debug('allayIfHasProp:', [key, val, err]);
        if (val !== undefined) { return val; }
      }
      throw ensureError(err);
    });
  },


  byCode(dict, pr) {
    return maybePr(pr, function allayByCode(err) {
      if (err) {
        const val = getOwn(dict, err.code);
        // console.debug('allayByCode:', [dict, val, err]);
        if (val !== undefined) { return val; }
      }
      throw ensureError(err);
    });
  },


  eNoEnt(pr) { return EX.byCode({ ENOENT: false }, pr); },
  eIsDir(pr) { return EX.byCode({ EISDIR: false }, pr); },




};


export default EX;
