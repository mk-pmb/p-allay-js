// -*- coding: utf-8, tab-width: 2 -*-

import fsPr from 'fs/promises';

import absDir from 'absdir';
import test from 'p-tape';

import pAllay from '../allay.mjs';


const relPath = absDir(import.meta, '.');

async function pFail(f) { return f(); }


test('capture message', async (t) => {
  t.plan(5);
  const pr = pFail(() => String.fromCarCode(0));
  pr.then(null, Boolean);
  t.equal(await pAllay.ifPropDef('name', pr), 'TypeError');
  t.equal(await pAllay.ifPropDef('message', pr),
    'String.fromCarCode is not a function');
  const rx = /^TypeError: String\.fromCarCode is not a function$/;
  t.rejects(() => pAllay.ifPropDef('wheels', pr), rx);
  t.rejects(() => pAllay.eNoEnt(pr), rx);
  t.rejects(() => pAllay.eIsDir(pr), rx);
});


test('readFile on directory', async (t) => {
  t.plan(5);
  const pr = fsPr.readFile(relPath('..'));
  t.equal(await pAllay.ifPropDef('name', pr), 'Error');
  t.equal(await pAllay.ifPropDef('code', pr), 'EISDIR');
  t.equal(await pAllay.eIsDir(pr), false);
  const rx = /^Error: EISDIR: illegal operation on a directory, read$/;
  t.rejects(() => pAllay.ifPropDef('wheels', pr), rx);
  t.rejects(() => pAllay.eNoEnt(pr), rx);
});


test('read nonexistent file', async (t) => {
  t.plan(5);
  const pr = fsPr.readFile(relPath('nope/does/not/exist.txt'));
  t.equal(await pAllay.ifPropDef('name', pr), 'Error');
  t.equal(await pAllay.ifPropDef('code', pr), 'ENOENT');
  t.equal(await pAllay.eNoEnt(pr), false);
  const rx = /^Error: ENOENT: no such file or directory, open /;
  t.rejects(() => pAllay.ifPropDef('wheels', pr), rx);
  t.rejects(() => pAllay.eIsDir(pr), rx);
});















/* scroll */
