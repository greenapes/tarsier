Tarsier - JS library for greenApes
==================================
This javascript library allows you to integrate widgets that display information for
users of greenApes (www.greenapes.com).

**NOTE**: The library is not ready yet, but it is in active development. Documentation will be added later.



Embed greenApes widgets in your page
----------------------------------------------------------
### 1. script

first of all, you need to include the script in your page head section:

```html
<script src="https://greenapes.r.worldssl.net/tarsier/v0.1/tarsier.min.js"></script>
```

### 2. ga:tag

put the available tags in your html page:

```html
<ga:info-tribe ape="me" month="05" topic="actions" animation="5000"></ga:info-tribe>
```

### 3. replace!

when the page is loaded call the replace function. Tarsier will inserts the greenapes widgets into the ga:tags:

```javascript
T.replace();
```

this could be achieved putting this script in the bottom of the page or wrapping in a jquery style document.ready callback.


Available GA:TAGS
-----------------

### ga:info-tribe
this tag is for the widget of a tribe's infographic

#### parameters:

* ape: 
* month:
* preload: [fade | top]
choose the preferred animation for preload
* animation: [ none | delay in ms | manual | scroll ]
#### animate!

if the animation attribute is set to manual, to start the chart animation you will have to send a message to the widget as below:

```javascript
var g = document.getElementsByTagName("ga:info-tribe")[0];
T.sendMessage(g, "animate!");
```


* topic: [ actions | eating | housing | jungle | shopping ]

##### example of topic actions

![](assets/ga_info-tribe_actions.png)

##### example of topic eating

![](assets/ga_info-tribe_eating.png)

##### example of topic home

![](assets/ga_info-tribe_home)

##### example of topic shopping

![](assets/ga_info-tribe_shopping.png)

#####example of topic jungle

![](assets/ga_info-tribe_social.png)

About IE8
---------
Tarsier supports IE8 substituting HTML5 placeholder tags with div elements with class name = "html5 tag name":

```html
<ga:info-tribe ape="me" month="05" topic="actions" animation="5000"></ga:info-tribe>
```

will become like this on IE8:

```html
<div class="ga:info-tribe" ape="me" month="05" topic="actions" animation="5000"></ga:info-tribe>
```

keep in mind that when you write stylesheet, if you want to support IE8:

```css
.ga\:info-tribe,
ga\:info-tribe {
	display: inline-block;
	width:645px;
	height:645px;
	overflow:hidden;
	border:1px solid #000;
}
```

Use the library in your own project
-----------------------------------
The source code is splitted in 2 main files:

* tarsier.js
* handlers.js

### tarsier.js
contains helpers for DOM traversing and attributes reading.
### handlers.js
contains the handlers that will process the tag specified


```
T.registerHandler("YOUR TAG NAME", function(node){
    //node manipulation....
});
```

How to build
------------
```
npm install -g grunt-cli
```

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
