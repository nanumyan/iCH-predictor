$(window).load(function(){
    var $container = $('.itemsDiv');
    $container.isotope({
        filter: '*',
        itemSelector: '.item',
        layoutMode: 'masonry',
        animationOptions: {
            duration: 750,
            easing: 'linear',
            queue: false
        }
    });
 
    $('.filters a').click(function(){
        $('.filters .active').closest('li').removeClass('active');
        $(this).closest('li').addClass('active');
        
        //hide preyView
        $('#preyViewDiv').hide();

        //hide userView
        $('#userViewDiv').hide();

        //hide prediction view
        $('#predictionDiv').hide();
 
        var selector = $(this).attr('data-filter');
        $container.isotope({
            filter: selector,
            itemSelector: '.item',
            layoutMode: 'masonry',
            animationOptions: {
                duration: 750,
                easing: 'linear',
                queue: false
            }
         });
         return false;
    });
});