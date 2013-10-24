(function main() {
    
    var T = {};

    T.widgets = [];
    /* mapping between tag name supported and appropriate function handler */
    TAG_HANDLERS = {};
    var TAGS = [];
    var IS_IE8 = false;
    T.registerHandler = function(TAG_NAME, HANDLER) {
        TAG_HANDLERS[TAG_NAME] = HANDLER;
    }
    
    /*  HELPER
        supplant */
    if(!String.prototype.supplant) {
        String.prototype.supplant = function (o) {
            return this.replace(
                /\{([^{}]*)\}/g,
                function (a, b) {
                    var r = o[b];
                    if(typeof r === 'undefined' && typeof o === 'object' && b.indexOf('.') != -1) {
                        var path = b.split('.');
                        var ctx = o;
                        for(var ix=0; ix<path.length; ix++) {
                            r = ctx = ctx[path[ix]];
                            if(typeof r === 'undefined')
                                break;
                        }
                    }
                    return typeof r === 'string' || typeof r === 'number' ? r : a;
                }
            );
        };
    }

    /*  HELPER
    get attribute from a DOM node */
    T.getAttribute = function(ele, attr) {
        var result = (ele.getAttribute && ele.getAttribute(attr)) || null;
        if( !result ) {
            var attrs = ele.attributes;
            var length = attrs.length;
            for(var i = 0; i < length; i++)
                if(attrs[i].nodeName === attr) {
                    result = attrs[i].nodeValue;
                    break;
                }
        }
        return result;
    }

    T.setAttribute = function(ele, attr, value) {
        ele.setAttribute(attr, value);
    }
    /* HELPER
    get an options object from a DOM node 
    and an array of strings corresponding to the node's attributes

        var a = document.getElementById('a_link');
        getOptions(a, ['href', 'target']);
    */
    T.getOptions = function(node, a_list_of_attrs){
        var o = {};
        for(var i in a_list_of_attrs){
            var opt = a_list_of_attrs[i];
            o[opt] = T.getAttribute(node, opt);
        }
        return o;
    }
    T.setOptions = function(node, options){
        var o = {};
        for(var o in options){
            T.setAttribute(node, o, options[o]);
        }
    }
    T.sendMessage = function(elm, msg){
        elm.getElementsByTagName("iframe")[0].contentWindow.postMessage(msg, '*');
    }
    
    T.startAnimation = function(tag){
        if(tag){
            T.sendMessage(tag, "animate!");
        }
    }

    T.createEvent = function(event_name){
        if (document.createEvent){
            var ev = document.createEvent("HTMLEvents");
            ev.initEvent(event_name, true, true)
            return ev;
        }
        if (document.createEventObject){
            var ev = document.createEventObject(    );
            ev.eventType = event_name;
            return ev;
        }
        return null;
    }
    T.addEventListener = function(tag, event_name, func){
        
        if(tag && tag.attachEvent){
            if(event_name=="message"){
                event_name="onmessage";
                tag.attachEvent(event_name, func);
            }else{
                if (document.attachEvent) { // MSIE
                    var currentHandler = func;
                    tag.fakeEvents = 0; // an expando property

                    tag.attachEvent("onpropertychange", function(event) {
                        if (event.propertyName == event_name) {
                            // execute the callback
                            currentHandler({target:tag});
                        }
                    });

                    dispatchFakeEvent = function(handler) {
                        // fire the propertychange event
                        document.documentElement.fakeEvents++;
                    };
                }
            }
            
            return;   
        }
        if(tag && tag.addEventListener){
            tag.addEventListener(event_name, func);
            return;
        }
    }
    T.dispatchEvent = function(elem, event_name){
        var event = T.createEvent(event_name);
        if(elem.dispatchEvent)
            elem.dispatchEvent(event);
        else{
            elem[event_name]++; 
        }
    }
    T.ie8fix = function(elem, tag_name){
        elem.className += " " + tag_name.replace(":", "_");
        if(IS_IE8){
            var divelem = document.createElement('div');
            divelem.className = elem.className;
            elem.parentNode.insertBefore(divelem, elem);
            var o = T.getOptions(elem, ["ape", "date", "duration", "topic", "animation", "preload"]);
            elem.parentNode.removeChild(elem);
            T.setOptions(divelem, o);
            return divelem;
        }
        return elem;
        
    }
    T.replace = function(){
        /* IE8 special tags fix */   
        if (navigator.appName.match("Microsoft")) {
            var ua = navigator.userAgent;
            var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
            if (re.exec(ua) != null){
                rv = parseFloat(RegExp.$1);
                if(rv < 9){
                    IS_IE8 = true;
                }
            }
        }
        /* where the magic happen... */
        for(var tag_name in TAG_HANDLERS) {
            var handler = TAG_HANDLERS[tag_name];
            var elems = document.getElementsByTagName(tag_name);
            for(var ix=0; ix<elems.length; ix++) {
                handler(T.ie8fix(elems[ix], tag_name));
            }
        }
    }
    window.T = T; 
})();
