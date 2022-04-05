
<!--#echo json="package.json" key="name" underline="=" -->
p-allay
=======
<!--/#echo -->

<!--#echo json="package.json" key="description" -->
Allay expected promise rejections: Resolve with your failure value instead.
<!--/#echo -->



API
---

This module exports an object that holds these methods:


### .ifHasProp(key[, pr])

Returns a function `allayIfHasProp(err)` that will:

* Try to look up a `key`-named own property of `err`.
  If found, and its value is not `undefined`, return that value.
* Otherwise, throw something:
  * If `err` is an object, throw that.
  * If `err` is a non-empty string, throw a `new Error(err)`.
  * If neither, throw a `TypeError` that complains about `err`.

If `pr` is something that holds a `.then` method,
it will be called with arguments `(null, allayIfHasProp)`.



### .byCode(dict[, pr])

Returns a function `allayByCode(err)` that will:

* Try to look up an `err.code`-named own property in dictionary object `dict`.
  If found, and its value is not `undefined`, return that value.
* Otherwise, throw as described for `.ifHasProp`.

`pr` works like with `.ifHasProp`.



### .eNoEnt([pr])

Shorthand for `.byCode({ ENOENT: false }, pr)`.



### .eIsDir([pr])

Shorthand for `.byCode({ EISDIR: false }, pr)`.







Usage
-----

see [test/usage.mjs](test/usage.mjs).



<!--#toc stop="scan" -->



Known issues
------------

* Needs more/better tests and docs.




&nbsp;


License
-------
<!--#echo json="package.json" key=".license" -->
ISC
<!--/#echo -->
