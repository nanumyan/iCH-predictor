
preyData = { 'colors': ['#f8f9d1',
                          '#574b52',
                          '#8b6669',
                          '#a4a95d',
                          '#787a4d',
                          '#e7eda5',
                          '#cdd57a',
                          '#c5c0a3',
                          '#162442',
                          '#af9184'],
  'descr': 'Rethinking Vintage: Are the 80\u2032s and 90\u2032s fashion vintage?',
  'hunterid': 22523,
  'id': 128282,
  'lat': null,
  'link': 'http://www.wendybendoni.com/rethinking-vintage-80s-90s-fashion-vintage/',
  'lng': null,
  'platform': 'web',
  'semanticClass': 'Warm Aesthetic',
  'semantics': {'Cold Aesthetic': 0.0031608677324910434,
              'Dark Sensitive Aesthetic': 0.14246000942207279,
              'Dark Stimulating': 0.0010012281826534484,
              'Easing Original': 0.00033568301050734372,
              'Energetic Inspiring Original': 0.0010686049424429526,
              'Energetic Original': 0.0,
              'Impressive Structural Smart': 0.0014978186066103975,
              'Joyous Flashy Aesthetic': 0.0,
              'Joyous Inspiring Smart': 0.0,
              'Lively Aesthetic': 0.0015230464829177996,
              'Lively Original': 0.0,
              'Luminous Energetic Aesthetic': 0.0,
              'Luminous Natural Smart': 0.00047640499442059967,
              'Luminous Stimulating': 0.0,
              'Powerful Aesthetic': 0.0,
              'Sensitive Energetic Original': 0.0,
              'Sensitive Original': 0.00036871942897257636,
              'Serene Structural Smart': 0.0,
              'Soothing Aesthetic': 0.0,
              'Warm Aesthetic': 0.84810761719691108
               },
  'tags': ['fashion', 'vintage', '80s', '90s']
}
 

//d3.json(preyData, function(data){
//    console.log('preyData', data)
//})
  
///////////////////////////////

function showSemantics(preyData){

    var len = 20 //preyData.length,
    var semantics = []
    sems = Object.keys(preyData.semantics)
    
    for ( var i=0; i < len; i+=1 ) {
        semantics.push( {'semantic': sems[ i ], 'value': preyData.semantics[sems[ i ]]}  );   
    }

    
    console.log('preyData', semantics)
    
    svgPreyView = d3.select('#preySemantics svg')
        .append('g')
    
    svgPreyView.selectAll('rect')
        .data(semantics)
        .enter()
        .append('rect')
        .style('fill', 'red')
        .attr('x', 0)
        .attr('y', function(d,i){ return 10*i;})
        .attr('height', 9)
        .attr('width', function(d,i){ return 10*d;})

}

