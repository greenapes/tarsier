//var default_url = default_url || "https://fbapp.greenapes.com/";
var default_url = default_url || "https://fb-greenapes.herokuapp.com/";

function info_tribe_embed(node){
    var o = T.getOptions(node, ["ape", "date", "duration", "topic", "animation", "preload", "embedded"]);
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
    if(o["embedded"]) {
        url += "&embedded";
    }
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

function info_ape_embed(node){
    var o = T.getOptions(node, ["ape", "date", "duration", "topic", "animation", "preload", "embedded"]);
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
    var url = "{1}/widget#/{0.ape}/stats/interval/section/{0.topic}?start_date={0.date}&duration={0.duration}&preload=true&preload_animation={0.preload}&animation={0.animation}&id={2}".supplant([o, default_url, n]);
    if(o["embedded"]) {
        url += "&embedded";
    }
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
T.registerHandler("ga:info-tribe", info_tribe_embed);
T.registerHandler("ga:info-ape", info_ape_embed);
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
