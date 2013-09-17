tarsier js build system
=

requirements:
-
- nodejs
- npm

install grunt:
-
```
npm install -g grunt-cli
```

then from the project root folder

```
npm install
```

npm will install all the dependencies from package.json

minify the library
-
from the project root folder

```
grunt uglify
```

It will save on build/widget.min.js the minified version of src/widget.js