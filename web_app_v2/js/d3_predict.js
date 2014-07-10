/*
1. circle 'Drag here', listening for drag event
2. on drag, show 'loading' and read data from dragged div
3. transition to force layout with the 'analysed' data <- taken from a mapping file?
*/

var config = {
    'screenStartX' : 0,
    'screenEndX'   : 708,
    'screenStartY': 0,
    'screenEndY'  : 450
}

var vocab   = {
    "words": [
        {"label": "original", "position": 1},
        {"label": "smart", "position": 2},
        {"label": "provocative", "position": 3},
        {"label": "aesthetic", "position": 4},
        {"label": "cute", "position": 5}
    ]
}

var svgContainer = d3.select('#force-graph');

function drawDragCircle() {   
    var dragCircle = svgContainer.append('g')
        .attr('id', 'dragCircle')
        .attr('opacity', .0)
    
    dragCircle.transition()
        .duration(500)
        .attr('opacity', .5)

    dragCircle.append('circle')
        .attr('r', .8* config.screenEndY/2)
        .attr('cx', config.screenEndX/2)
        .attr('cy', config.screenEndY/2)

    dragCircle.append('text')
        .text("Drag a Prey here")
        .attr('dx', config.screenEndX/2)
        .attr('dy', config.screenEndY/2)
}

function hideDragCircle() {
    d3.selectAll('#dragCircle')
        .transition()
        .duration(500)
        .attr('opacity', 0)
        .remove()
}

function loadingOn() {
    d3.select('#loading')
        .attr('visibility', 'visible')
        .attr('transform', 'translate('+ (config.screenEndX/2-16) +','+ (config.screenEndY/2-16) +')')
}

function loadingOff() {
    d3.select('#loading')
        .attr('visibility', 'hidden')
}


function netFromVocab() {
    var len = vocab.words.length;
    nodes = [];
    links = [];
    nodes.push({'label': 'prey',
                'mass': 0,
                'fixed': false
                })
    
    for (var i=0; i < len; i+=1 ) {
        var mass = Math.random();
        nodes.push( {'label': vocab.words[ i ].label,
                     'x': 0.5*( config.screenEndX + 0.8*config.screenEndY *Math.cos(2*Math.PI * (i/len)) ), 
                     'y': 0.5*( config.screenEndY + 0.8*config.screenEndY *Math.sin(2*Math.PI * (i/len)) ),
                     'mass': mass,
                     'fixed': true
                    } );
    }
    
    var x=0;
    var y=0;
    var masses = 0;
    for (var i=1; i < len+1; i+=1 ) {
        x += nodes[i].mass * nodes[i].x;
        y += nodes[i].mass * nodes[i].y;
        masses += nodes[i].mass;
    };
    x = x/masses;
    y = y/masses;
    
    for (var i=1; i < len+1; i+=1 ) {
        links.push( {'source': 0,
                 'target': i,
                 'linkDistance': Math.sqrt( Math.pow(nodes[i].x - x, 2) + Math.pow(nodes[i].y - y, 2) ),
                 'weight': nodes[i].mass
                })
    }
    
}

function removeNails() {
    try {
        svgContainer.select('#nails')
            .remove()
    }
    catch(err) {}
}

function drawNails() {
    
    var force = d3.layout.force()
        .nodes(nodes)
        .links(links)
        .linkStrength(1)
        .linkDistance(function(d) { return d.linkDistance; })
        .alpha(.1)
        .charge(0)
        .gravity(0)
        .size([config.screenEndX, config.screenEndY])
        .start();
    
    nails = svgContainer.append('g')
        .attr('id', 'nails')
    
    link = nails.selectAll(".link")
      .data(links)
    .enter().append("line")
      .attr("class", "link")
      .style("stroke", "grey")
      .style("stroke-width", function(d) { return 5*d.weight; });
    
    node = nails.selectAll(".node")
      .data(nodes)
    .enter().append("circle")
      .attr('class', 'node')
      .attr("r", 15)
      .style("fill", "steelblue")
      .style("stroke", "white")
      .style("stroke-width", "1.5px")
      .call(force.drag);
    
    function tick() {
        link.attr("x1", function(d) { return d.source.x; })
            .attr("y1", function(d) { return d.source.y; })
            .attr("x2", function(d) { return d.target.x; })
            .attr("y2", function(d) { return d.target.y; });

        node.attr("cx", function(d) { return d.x; })
            .attr("cy", function(d) { return d.y; });
      }
    
    force.on("tick", tick);
}


////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////

function pressEnter(){
    svgContainer.append('text')
    .attr('id', 'pressEnter')
    .text("Press Enter")
    .attr('dx', config.screenXEnd/2)
    .attr('dy', config.screenEnd/2-70)
    .style('font', '30px Oswald, sans-serif')
}

function pressEnterRemove(){
    svgContainer.selectAll('#pressEnter')
    .transition()
    .duration(1000)
    .style('opacity', 0)
    .remove()
}