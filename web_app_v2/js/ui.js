var colors = ["#66c2a5","#fc8d62","#8da0cb","#e78ac3","#a6d854","#ffd92f","#e5c494","#b3b3b3"]

//------------------------------------------------explore UI stuff----------------------------------------//
function hideAllDivs(){
    //hide preyView
    $('#preyViewDiv').hide();
    
    //hide userView
    $('#userViewDiv').hide();
    
    //hide prediction view
    $('#predictionDiv').hide();
    
    //hide exploration div    
    $('.filters .active').closest('li').removeClass('active');
    $(this).addClass('active');
    
    var $container = $('.itemsDiv');
    $container.isotope({
        filter: 'none',
    });
    
    //remove all d3 stuff
    //...
}

function url_domain(data) {
  var    a      = document.createElement('a');
         a.href = data;
  return a.hostname;
}

$('.itemsDiv').on('click', '.item', function() {
    //hide any active div
    hideAllDivs();
    
    //empty prior shite
    $('#preyPhoto').empty()
    $('#preyTitle').empty()
    
    //get prey data from item
    var preyData = $(this).data('preyData')
    
    //populate prew viewer divs with replace
    $('#preyPhoto').append('<img class="img-thumbnail" src="./images/' + preyData.id + '">')
    $('#preyTitle').append('<h1 class="navbar-brand">' + preyData.descr + '</h1>')
    
    $('#preyLink').append('<a href="' + preyData.link + '" target="_blank">' + url_domain(preyData.link) + '</a>')
    $('#preyTags').html(preyData.tags.join(', '))
    
    window.scrollTo(0,0);
    
    //show prey viewer
    $('#preyViewDiv').show();
    
    showSemantics(preyData);
});

//------------------------------------------------predict UI stuff----------------------------------------//

$('#buttonPredict').click(function(){
    //hide all divs
    hideAllDivs();
    
    window.scrollTo(0,0);
    
    //show prediction div
    $('#predictionDiv').show();
});


var dragSrcEl = null;
            
function handleDragStart(e) {
    var preyBadges = document.querySelectorAll('#preyContainer .preyBadge');
    [].forEach.call(preyBadges, function(badge) {
        badge.style.opacity = '1';
    });
    
    this.style.opacity = '0.4';
    dragSrcEl = this;
    
    e.dataTransfer.effectAllowed = 'move';
    //e.dataTransfer.setData('text/html', this.innerHTML); //after we look at the data
    
    hideDragCircle()
    drawDragCircle()
}

function handleDragOver(e) {
    if (e.preventDefault) {
      e.preventDefault();
    }

}

function handleDragEnter(e) {
  // this / e.target is the current hover target.
  this.classList.add('over');
}

function handleDragLeave(e) {
    this.classList.remove('over');  // this / e.target is previous target element.
}

function handleDrop(e) {

    if (e.stopPropagation) {
      e.stopPropagation();
    }

    // Don't do anything if dropping the same prey
    if (dragSrcEl != this) {
      //dragSrcEl.innerHTML = this.innerHTML;
      //this.innerHTML = e.dataTransfer.getData('text/html');
    }

    return false;
  }

function handleDragEnd(e) {
    hideDragCircle();
}

function drop(ev) {
    ev.preventDefault();

    removeNails();
    loadingOn();
    netFromVocab();

    setTimeout(function(){loadingOff()}, 500);
    setTimeout(function(){drawNails()}, 500);
}

function allowDrop(ev) {
    ev.preventDefault();
}

window.onload = function () {
    var preyBadges = document.querySelectorAll('#preyContainer .preyBadge');
    [].forEach.call(preyBadges, function(badge) {
        badge.addEventListener('dragstart', handleDragStart, false);
        badge.addEventListener('dragenter', handleDragEnter, false)
        badge.addEventListener('dragover', handleDragOver, false);
        badge.addEventListener('dragleave', handleDragLeave, false);
        badge.addEventListener('drop', handleDrop, false);
        badge.addEventListener('dragend', handleDragEnd, false);
    });
    drawDragCircle()
};