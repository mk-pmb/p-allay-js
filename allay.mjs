// -*- coding: utf-8, tab-width: 2 -*-

import getOwn from 'getown';
import isFunc from 'is-fn';


function ensureError(e) {
  if (e === '') { return new TypeError('Original error was an empty string.'); }
  const t = (e && typeof e);
  if (t === 'object') { return e; }
  if (t === 'string') { return new Error(e); }
  return new TypeError('Original error was neither object nor string: ' + e); }
}


function maybePr(pr, f) {
  if (pr && isFunc(pr.then)) { pr.then(null, f); }
  return f;
}


const EX = {

  ifHasProp(key, pr) {
    return maybePr(pr, function allayIfHasProp(err) {
      const val = getOwn(err, key);
      if (val !== undefined) { return val; }
      throw ensureError(err);
    });
  },


  byCode(dict, pr) {
    return maybePr(pr, function allayByCode(err) {
      const val = getOwn(dict, (err || false).code);
      if (val !== undefined) { return val; }
      throw ensureError(err);
    });
  },


  eNoEnt(pr) { return EX.byCode({ ENOENT: false }, pr); },
  eIsDir(pr) { return EX.byCode({ EISDIR: false }, pr); },




};


export default EX;
