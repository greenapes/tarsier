var default_url = default_url || "http://localhost/";

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