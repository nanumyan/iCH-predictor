drawDragCircle()

d3.select("body")
    .on("keydown", function() {
        if(d3.event.keyCode == 13){
            loadingOn();
            hideDragCircle();
            netFromVocab();
            console.log(nodes, links)
            
            setTimeout(function(){loadingOff()}, 500);
            setTimeout(function(){drawNails()}, 500);;
        }
    });