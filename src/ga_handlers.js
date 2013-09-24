var default_url = default_url || "http://localhost/";

function info_embed(node){
    var o = T.getOptions(node, ["ape", "month", "topic", "animation"]);
    var iframe = document.createElement('iframe');
    iframe.style.width = "100%";
    iframe.style.height = "100%";
    iframe.style.overflow = "hidden";
    iframe.style.borderStyle = "none";
    n = T.widgets.length;
    var url = "{1}/widget#/tribes-actions/{0.ape}/stats/monthly/2013/{0.month}/section/{0.topic}?preload=true&animation={0.animation}&id={2}".supplant([o, default_url, n]);
    iframe.src = url;
    node.appendChild(iframe);
    T.widgets.push(node);
}

/* functions declaration for various widget embedding */
T.registerHandler("ga:info-tribe", info_embed);


// 
function receiveMessage(event)
{
    // we read the id from the parameter
    if(event.data.msg == "ready!") {
        var node = T.widgets[event.data.id];
        var o = T.getOptions(node, ["ape", "month", "topic", "animation"]);
        var ms = parseFloat(o.animation);
        // if ms is != from Nan mean that the parameter is a number 
        // that represent the delay in ms before we start the animation
        if(!isNaN(ms)){
            setTimeout(function(){
                T.startAnimation(node);
            }, ms)
        }
    }
    
}
window.addEventListener("message", receiveMessage, false);