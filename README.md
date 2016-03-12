# pretty-banner

Banner generator based on package.json data.
It parses package.json file and renders well formatted header for code files (like js, css, html, etc). Could build banner in full or minified format.

## Installing

Use `npm` to install it to your app:
    
    npm install --save pretty-banner

## Usage

```js
var banner = require('pretty-banner');
var pkg = require('./package.json');
var minified = true; //or false

banner.code(pkg, minified);
banner.html(pkg);
banner.meta(pkg);
```

## Demo

    node demo

## Examples

```js
var pkg = {
    "name": "pretty-banner",
    "version": "1.0.0",
    "description": "Banner generator based on package.json data.",
    "license": "ISC",
    "author": "Yurk Sha (https://github.com/yurks)",
    "foundation": {
        "name": "Foundation, Inc.",
        "url": "http://foundation.url/",
        "url_short": "fnd.url"
    }
}
```

Output for `banner.code(pkg)`:
```js
/*!
 * pretty-banner v1.0.0
 * Banner generator based on package.json data.
 *
 * Foundation, Inc.
 * http://foundation.url/
 *
 * Date: 2016-03-12T20:44:08Z
 * Author: Yurk Sha (https://github.com/yurks)
 * Licensed under the ISC license
 */

```

Output for `banner.code(pkg, true)`:
```js
/*! pretty-banner v1.0.0 | Foundation, Inc. | fnd.url | github.com/yurks | ISC */
```

Output for `banner.html(pkg)`:
```html
<meta name="author" content="Foundation, Inc. | fnd.url | github.com/yurks | ISC">
```

Output for `banner.meta(pkg)`:
```html
Foundation, Inc. | fnd.url | github.com/yurks | ISC
```

## License

[ISC license](LICENSE)
