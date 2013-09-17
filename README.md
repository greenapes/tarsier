Tarsier - JS library for greenApes
==================================
This javascript library allows you to integrate widgets that display information for
users of greenApes (www.greenapes.com).

**NOTE**: The library is not ready yet, but it is in active development. Documentation will be added later.


How to build
------------

requirements:

 - nodejs
 - npm

install grunt:
```
npm install -g grunt-cli
```

then from the project root folder
```
npm install
```

npm will install all the dependencies from package.json

To minify the library, from the project root folder

```
grunt uglify
```

It will save on build/widget.min.js the minified version of src/widget.js
