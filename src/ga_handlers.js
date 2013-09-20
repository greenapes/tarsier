var default_url = default_url || "http://localhost/";

function info_embed(node){
    var o = T.getOptions(node, ["ape", "month", "topic", "animation"]);
    var iframe = document.createElement('iframe');
    iframe.style.width = "100%";
    iframe.style.height = "100%";
    iframe.style.overflow = "hidden";
    iframe.style.borderStyle = "none";
    var url = "{1}/widget#/tribes-actions/{0.ape}/stats/monthly/2013/{0.month}/section/{0.topic}?preload=true&animation={0.animation}".supplant([o, default_url]);
    iframe.src = url;
    node.appendChild(iframe);
    var ms = parseFloat(o.animation);
    if(!isNaN(ms)){ //mean that the parameter is a number that represent the delay in ms before we start the animation
    	setTimeout(function(){
    		T.startAnimation(node);
    	}, ms)
    }
}

/* functions declaration for various widget embedding */
T.registerHandler("ga:info-tribe", info_embed);