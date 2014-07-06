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