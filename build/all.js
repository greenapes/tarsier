(function main() {
    
    var T = {};

    /* mapping between tag name supported and appropriate function handler */
    TAG_HANDLERS = {};

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
    
    T.sendMessage = function(elm, msg){
        elm.getElementsByTagName("iframe")[0].contentWindow.postMessage(msg, '*');
    }
    
    T.testStartAnimation = function(){
        var g = document.getElementsByTagName("g:info-tribe")[0];
        GAstartAnimation(g);
    }

    /* IE8 special tags fix */   
    if (navigator.appName.match("Microsoft")) {
        var ua = navigator.userAgent;
        var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
        if (re.exec(ua) != null){
            rv = parseFloat(RegExp.$1);
            if(rv < 9){
                for(var tag in TAG_HANDLERS){
                    document.createElement(tag);     
                }
            }
        }
    }
    T.replace = function(){
        /* where the magic happen... */
        window.console.log(TAG_HANDLERS);
        for(var tag_name in TAG_HANDLERS) {
            var handler = TAG_HANDLERS[tag_name];
            var elems = document.getElementsByTagName(tag_name);
            for(var ix=0; ix<elems.length; ix++) {
                handler(elems[ix]);
            }
        }
    }
    window.T = T; 
})();
;var default_url = "http://localhost:5001";var default_url = default_url || "http://localhost/";

function info_embed(node){
    var o = T.getOptions(node, ["ape", "month", "topic", "animation"]);
    var iframe = document.createElement('iframe');
    iframe.style.width = "100%";
    iframe.style.height = "100%";
    iframe.style.overflow = "hidden";
    iframe.style.borderStyle = "none";
    var url = "{1}/widget#/{0.ape}/stats/monthly/2013/{0.month}/section/{0.topic}?animations=true&animation={0.animation}".supplant([o, default_url]);
    iframe.src = url;
    node.appendChild(iframe);
}

/* functions declaration for various widget embedding */
T.registerHandler("ga:info-tribe", info_embed);