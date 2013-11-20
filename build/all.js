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
        console.log("sono io");
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
            var live = document.getElementsByTagName(tag_name);
            var elems = [];
            for(var ix=0; ix<live.length; ix++) {
                elems.push(live[ix]);
            }
            for(var ix=0; ix<elems.length; ix++) {
                handler(T.ie8fix(elems[ix], tag_name));
            }
        }
    }
    window.T = T; 
})();
;//var default_url = default_url || "https://fbapp.greenapes.com/";
var default_url = default_url || "https://fb-greenapes.herokuapp.com/";

function info_embed(node){
    var o = T.getOptions(node, ["ape", "date", "duration", "topic", "animation", "preload"]);
    var iframe = document.createElement('iframe');
    iframe.style.width = "100%";
    iframe.style.height = "100%";
    iframe.style.overflow = "hidden";
    iframe.style.borderStyle = "none";
    iframe.marginheight="0";
    iframe.marginwidth="0";
    iframe.frameborder="0";
    iframe.frameBorder = "no";
    n = T.widgets.length;

    var today = new Date();
    o["ape"] = o["ape"] || "me";
    o["date"] = o["date"] || ([today.getFullYear(), today.getMonth()+1, today.getDate()].join("/"));
    o["animation"] = o["animation"] || "none";
    o["preload"] = o["preload"] || "fade";
    o["duration"] = o["duration"] || "";
    var url = "{1}/widget#/tribes-actions/{0.ape}/stats/interval/section/{0.topic}?start_date={0.date}&duration={0.duration}&preload=true&preload_animation={0.preload}&animation={0.animation}&id={2}".supplant([o, default_url, n]);
    iframe.src = url;

    try{
        node.appendChild(iframe);
    }catch(e){
    }
    
    T.widgets.push(node);
    
    function onReady(e) {
        var node = e.target;
        var o = T.getOptions(node, ["animation"]);
        var ms = parseFloat(o.animation);
        // if ms is != from Nan mean that the parameter is a number 
        // that represent the delay in ms before we start the animation
        if(!isNaN(ms)){
            setTimeout(function(){
                T.startAnimation(node);
            }, ms);
        }
    }

    T.addEventListener(node, 'loaded', onReady);

    
}

/* functions declaration for various widget embedding */
T.registerHandler("ga:info-tribe", info_embed);
var currentHandler;

function receiveMessage(event)
{
    // we read the id from the parameter
    var params = event.data.split(";");
    if(params.length == 2 && params[1] == "ready!") {
        var node = T.widgets[params[0]];
        T.dispatchEvent(node, "loaded");
    }
}

T.addEventListener(window, "message", receiveMessage);
