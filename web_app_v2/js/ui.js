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

$('.item').click(function(){
    //hide any active div
    hideAllDivs();
    
    //get prey data from item
    //$data = this.data('preyData')
    
    //attach data to the prey view
    
    //show prey viewer
    $('#preyViewDiv').show();
});


//------------------------------------------------predict UI stuff----------------------------------------//

$('#buttonPredict').click(function(){
    //hide all divs
    hideAllDivs();

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