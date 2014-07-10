var colors = ["#66c2a5","#fc8d62","#8da0cb","#e78ac3","#a6d854","#ffd92f","#e5c494","#b3b3b3"]

//d3.json(preyData, function(data){
//    console.log('preyData', data)
//})
  
///////////////////////////////

function showSemantics(preyData){
    
    var margin = {top: 20, right: 15, bottom: 20, left: 15};
    var width = 300 - margin.left - margin.right,
        height = 200 - margin.top - margin.bottom;

    
    var len = 20 //preyData.length,
    var semantics = []
    sems = Object.keys(preyData.semantics)
    
    for ( var i=0; i < len; i+=1 ) {
        sem = sems[ i ].split(' ')
        
        semantics.push( {'semantic': sem[sem.length - 1], 
                         'subsemantic': sem.slice(0,-1).join(' '), 
                         'value': preyData.semantics[sems[ i ]]}  );   
    }

    var semanticsNest = d3.nest()
        .key(function(d) { return d.semantic; })
        .sortKeys(d3.ascending)
        .entries(semantics);
    
    //console.log('preyData', semanticsNest)
    
    var svgPreyView = d3.select('#preySemantics svg')
    
    svgPreyView.selectAll('g')
        .remove()
    
    svgPreyView = svgPreyView.append('g')
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
    
    var bar = svgPreyView.append('g')
        .selectAll('g')
        .data(semanticsNest)
        .enter()
        .append('g')
        .attr('transform', function(d,i){ return 'translate(0,'+20*i+')'; } )
    
    bar.append('text')
        //.style('alignment-baseline', 'central')
        .attr('y', 10)
        .text(function(d) {
            return d.key;
        })
    
    bar.append('rect')
        .style('fill', 'white')
        .attr('opacity', 0.3)
        .attr('x', 80)
        .attr('height', 9)
        .attr('width', 200)
    
    bar.append('rect')
        .style('fill', function(d,i){ return colors[i]; })
        .attr('x', 80)
        //.attr('y', function(d,i){ return 10*i; })
        .attr('height', 9)
        .attr('width', 0)
        .transition()
        .duration(1000)
        .attr('width', function(d,i){ 
            var score = 0
            for (var sub in d.values) {
                score += d.values[sub].value
            }
            return 200*score;
        })

    ////////////
    
    var colorRecs = svgPreyView.append('g')
        .attr('transform', 'translate(5,100)')
        
    colorRecs.selectAll('rect')
        .data(preyData.colors)
        .enter()
        .append('rect')
        .attr('width', 23)
        .attr('height', 23)
        .attr('x', function(d,i){ return 28*i; })
        .attr('stroke', 'white')
        .attr('stroke-width', 1.5)
        .attr('stroke-opacity', .8)
        .attr('fill', function(d,i){ return d; })
    
    
}

