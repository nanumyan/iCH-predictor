;(function($) {
    // INITIALIZATION CODE
    var FB_APP_ID = "136971079651094";
    var API_IMG = "https://images.icoolhunt.com";
    var WEB_PREY = "https://www.icoolhunt.com/prey";
    var WEB_TRENDBOX = "https://www.icoolhunt.com/trendboxes";
    var WEB_HUNTER = "https://www.icoolhunt.com/coolhunters";
    var WEB_PAGE = "https://www.icoolhunt.com/";
        
    function getPreyShareLink(service, prey, post) {
        if (!prey) return;
            
        var prey_url = (prey.url ? prey.url : WEB_PREY) + "/" + prey.id;
        var view_url = API_IMG + "/preys/" + prey.id + "/images/view_500^";
        var tags = prey.tags || false;
        
        var text = "I just found this on iCoolhunt";
        if (post)
            text = "I just uploaded this on iCoolhunt";
        
        if (service === "GOOGLE")
            return "https://plus.google.com/share?url=" + encodeURIComponent(prey_url);
            
        if (service === "TWITTER") {
            if (tags)
                tags = "icoolhunt," + tags.join(',');
            else
                tags = "icoolhunt";
            return "https://twitter.com/share?url=" + encodeURIComponent(prey_url) 
                    + "&text=" + encodeURIComponent(text + "!")
                    + "&hashtags=" + encodeURIComponent(tags);
        }
        
        if (service === "TUMBLR") {
            return "https://www.tumblr.com/share/photo?source=" + encodeURIComponent(view_url)
                    + "&caption=" + encodeURIComponent(prey.description || text + "!")
                    + "&clickthru=" + encodeURIComponent(prey_url);
        }
        
        if (service === "FACEBOOK") {
            if (tags)
                tags = tags.map(function (item) { return "#"+item; }).join(" ");
            else
                tags = "";
            return "https://www.facebook.com/dialog/feed?app_id=" + FB_APP_ID
                    + "&display=page&show_error=true"
                    + "&redirect_uri=" + encodeURIComponent(WEB_PAGE)
                    + "&link=" + encodeURIComponent(prey_url)
                    + "&picture=" + encodeURIComponent(view_url)
                    + "&name=" + encodeURIComponent(text)
                    + "&caption=" + encodeURIComponent(tags)
                    + "&description=" + encodeURIComponent(prey.description || "");
        }
    }
    
    function getTrendboxShareLink(service) {
        var prey = {
            id: $("[data-ich-type=trendbox]").data("id"),
            description: $("[data-ich-type=trendbox]").find("[data-role=title]").text(),
            url: WEB_TRENDBOX
        }
        return getPreyShareLink(service, prey);
    }
    
    function getHunterShareLink(service, $hunter) {
        var $hunter = $hunter || $("[data-ich-type='hunter']");
        
        if ($hunter.length === 0) return;
        
        var id = $hunter.data("id");
        var nick = $hunter.find("h1").text();
        var level = $hunter.find("h2").text();
        var description = $hunter.find(".description").text();
        var url = WEB_HUNTER + "/" + id;
        var img = API_IMG + "/hunters/" + id + "/images/avatar/icon_500^500";
        
        var text = "Follow " + nick + " on iCoolhunt!";
        
        if (service === "GOOGLE")
            return "https://plus.google.com/share?url=" + encodeURIComponent(url);
            
        if (service === "TWITTER") {
            return "https://twitter.com/share?url=" + encodeURIComponent(url) 
                    + "&text=" + encodeURIComponent(text)
                    + "&hashtags=" + encodeURIComponent("icoolhunt");
        }
        
        if (service === "TUMBLR") {
            text = "<p><strong>"+text+"</strong><br />" + description + "</p>";
            
            return "https://www.tumblr.com/share/photo?source=" + encodeURIComponent(img)
                    + "&caption=" + encodeURIComponent(text)
                    + "&clickthru=" + encodeURIComponent(url);
        }
        
        if (service === "FACEBOOK") {
            return "https://www.facebook.com/dialog/feed?app_id=" + FB_APP_ID
                    + "&display=page&show_error=true"
                    + "&redirect_uri=" + encodeURIComponent(WEB_PAGE)
                    + "&link=" + encodeURIComponent(url)
                    + "&picture=" + encodeURIComponent(img)
                    + "&name=" + encodeURIComponent(nick)
                    + "&caption=" + encodeURIComponent(text)
                    + "&description=" + encodeURIComponent(description || "");
        }
    }    
    
    function getPageShareLink(service, $page) {
        var $page = $page || $("[data-wp-type='page']");
        
        if ($page.length === 0) return;
        
        var imgUrl = $page.data("wp-image-url");
        var pageUrl = $page.data("wp-url");
        var title = $page.find("h1").text();
        var description = $page.find(".summary").text();
        var url = WEB_PAGE + "/" + pageUrl;
        var img = WEB_PAGE + "/" + imgUrl;                
        
        var text = title;
                
        if (service === "GOOGLE")
            return "https://plus.google.com/share?url=" + encodeURIComponent(url);
            
        if (service === "TWITTER") {
            return "https://twitter.com/share?url=" + encodeURIComponent(url) 
                    + "&text=" + encodeURIComponent(text)
                    + "&hashtags=" + encodeURIComponent("icoolhunt");
        }
        
        if (service === "TUMBLR") {
            text = "<p><strong>"+text+"</strong><br />" + description + "</p>";
            
            return "https://www.tumblr.com/share/photo?source=" + encodeURIComponent(img)
                    + "&caption=" + encodeURIComponent(text)
                    + "&clickthru=" + encodeURIComponent(url);
        }
        
        if (service === "FACEBOOK") {
            return "https://www.facebook.com/dialog/feed?app_id=" + FB_APP_ID
                    + "&display=page&show_error=true"
                    + "&redirect_uri=" + encodeURIComponent(WEB_PAGE)
                    + "&link=" + encodeURIComponent(url)
                    + "&caption=" + encodeURIComponent(text)
                    + "&description=" + encodeURIComponent(description || "");
        }
    }    
    
    function openSharePopup(service, evt, $link) {
        if (service === "GOOGLE" || service === "TWITTER" || service === "TUMBLR") {
            window.open($link.attr("href"),'', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');
            return false;
        }
            
        if (service === "FACEBOOK") {
            return true;
        }
    }
    
    function createPreyMap ($map, prey) {
        if ($map.length !== 1 || (!prey.lat && !prey.lng)) {
            $map.hide();
            return;
        }
        
        var map = new google.maps.Map($map[0],
            $.extend(icoolhunt.defaultMapOptions, {
                center: new google.maps.LatLng(prey.lat, prey.lng),
                scrollwheel: true,
                zoom: 11})
        );
        marker = new google.maps.Marker({
            position: new google.maps.LatLng(prey.lat, prey.lng),
            map: map
        });
    }
    
    $(function() {
        // Conditional initialization (depends on page boxes).

        if ($(".home #articles").length)
            $(".home #articles").carousel('cycle');

        icoolhunt.setupLogin();
        icoolhunt.setupToolsToolbar();
        icoolhunt.setupLandingAnimate();
        icoolhunt.setupShowSearchBox();
        icoolhunt.setupShowTrophyCase();
        icoolhunt.setupShowMap();   
        icoolhunt.setupShowSocial();
        icoolhunt.setupPreyActions();
        icoolhunt.setupPreyCatch();
        icoolhunt.setupPreyGallery();
        icoolhunt.setupTrendboxContributeSingle();
        icoolhunt.setupPreyLanded();
        icoolhunt.setupTrendboxLanded();
        icoolhunt.setupHunterActions();
        icoolhunt.setupHunterEdit();
        icoolhunt.setupAjaxEvents();        
        //icoolhunt.setupHashtags(".prey .description,.prey-description,.comment .message");
        icoolhunt.setupHashtags(".prey .description,.prey-description");        
        icoolhunt.transformDropCaps($(".dropcaps"));        
        icoolhunt.setupTiling(".explore.stream", ".item,.trendbox-comments");     

        // If this is a bookmarklet window, build a prey instance and open the upload dialog.
        // If the user isn't logged in show the login dialog and the extra text to explain
        // why the bookmarklet isn't working.
        var uri = parseUri(location.href);
        if (uri.path === "/bookmarklet") {
            if (uri.queryKey.login === "true") {
                $("#ich-login-dialog").modal();
                $("#bookmarklet-login").show();
            }
            else {
                window.icoolhunt.setupPreyCatch({id: uri.queryKey.prey_id, lat: uri.queryKey.prey_lat, lng: uri.queryKey.prey_lng});
            }
        }
    });

    $(window).load(function() {
        $(window).scroll(function() {
            if ($(this).scrollTop() != 0) {
                $('#to-top').fadeIn();
            } else {
                $('#to-top').fadeOut();
            }
        });

        $('#to-top').click(function() {
            $('body,html').animate({scrollTop:0}, 800);
        });
    });

    // MODULE: icoolhunt

    var defaultMapOptions = {};
    if (window.google)
        defaultMapOptions = {
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            mapTypeControl: false,
            mapTypeControlOptions: { style: google.maps.MapTypeControlStyle.DROPDOWN_MENU },
            navigationControl: true,
            navigationControlOptions: { style: google.maps.NavigationControlStyle.SMALL },
            streetViewControl: false,
            streetViewControlOptions: {},
            scaleControl: false,
            scaleControlOptions: {},
            scrollwheel: false,
            zoom: 14
    };
    
    window.icoolhunt = $.extend(window.icoolhunt || {}, {
        defaultMapOptions: defaultMapOptions
    });

    window.icoolhunt.setupPreload = function($elements) {
            $($elements).on('load', function(evt) {               
                    $(evt.target).closest('.preload').fadeIn(1000); 
            });
    };


    window.icoolhunt.transformDropCaps = function($elements) {
        var MAX = 80;
        $elements.each(function () {
            var text = $(this).text();
            var caps = text.charAt(0);
            if (text.length <= MAX) {           
                text = text.substring(1);
            }
            else {
                var index = text.lastIndexOf(' ', MAX);
                if (index === -1)
                    index = MAX-4;
                text = text.substring(1, index) + " ...";
            }
            $(this).html('<span class="dropcap">'+caps+'</span><span class="text">'+text+'</span>');
            
        });
    };

    window.icoolhunt.setupWaypoints = function (pointSelector, containerSelector, itemsSelector, refid, url, donetext, callback) {
        var $footer = $(pointSelector);      
        var opts = { offset: $(window).height() * 3 };        
        $footer.waypoint(function(event, direction) {
            $footer.waypoint('remove');                            
            
            if(!refid) return false; 

            var geturl;
            if (url.split("?").length === 2)
                geturl = url + "&f.refid=" + refid;
            else
                geturl = url + "?f.refid=" + refid;
                      
            $.get(geturl, function(data) {
                var $data = $(data);
                var $elements = $data.find(containerSelector+" "+itemsSelector);
                if ($elements.length > 0) {
                    refid = $elements.last().data("stream-id");
                    if (callback)
                        callback($elements, false);
                    $footer.waypoint(opts);
                }
                else {
                    refid = null;
                    if (callback)
                        callback(null, true);
                }
            });
        }, opts);    
    };

    window.icoolhunt.setupTiling = function (container, selector) {   
        var $container = $(container);                
        var tileImgHeight = $container.data("tile-img-height");
        var tileImgWidth = $container.data("tile-img-width");
        
        var setupItems = function ($elements) {
            icoolhunt.transformDropCaps($elements.find(".dropcaps"));
            icoolhunt.setupPreload($elements.find(".preload-trigger"));                    
        };
        
        var state = {container: container, stack: [], step: 0, top: 0, tileImgWidth: tileImgWidth, tileImgHeight: tileImgHeight };
        
        if ($container.length) {      
            var $items = $container.find(selector).remove();
            var refid = $items.last().data("stream-id");            
            setupItems($items);
            icoolhunt.mahjong(state, $items, $items.length <= 4);

            if ($items.length > 4) {
                icoolhunt.setupWaypoints(".items-navigation-offset", container, selector, refid, location.href, "No More Items to Load",
                    function($newElements, isLast) {
                        if ($newElements)
                            setupItems($newElements);
                        icoolhunt.mahjong(state, $newElements, isLast);
                    }
                );
            }
        }
    };
    
    window.icoolhunt.mahjong = function (state, $items, flush) {
        function extract (stack, type, klass) {
            for (var i = 0, l = stack.length ; i < l ; i++) {
                if (stack[i][0].data("span") === type && (!klass || stack[i][0].hasClass(klass)))
                    return stack.splice(i, 1)[0][0];
            }
        }
    
        function getTypes (stack) {
            var types = {"1x1": 0, "2x1": 0};
            if (stack.length > 0)
                types[stack[0][0].data("span")] += 1;
            if (stack.length > 1)
                types[stack[1][0].data("span")] += 1;
            if (stack.length > 2)
                types[stack[2][0].data("span")] += 1;
            if (stack.length > 3)
                types[stack[3][0].data("span")] += 1;
            return types;
        }

        function selectContents () {
            var stack = state.stack;
            var types = getTypes(stack);

            if (stack.length > 0) {
                if (types["1x1"] === 4) {
                    return [extract(stack, "1x1"), extract(stack, "1x1"), extract(stack, "1x1"), extract(stack, "1x1")];
                }
                else if (stack[0][0].data("span") === "1x1") {
                    if (types["1x1"] >= 2 && types["2x1"] >= 1) {
                        if (stack[0][0].data("type") === "1x1")
                            return [extract(stack, "1x1"), extract(stack, "1x1"), extract(stack, "2x1")];
                        else
                            return [extract(stack, "2x1"), extract(stack, "1x1"), extract(stack, "1x1")];
                    }
                    else if (types["2x1"] >= 2) {
                        return [extract(stack, "2x1"), extract(stack, "2x1")];
                    }
                }
                else {
                    if (types["2x1"] >= 2) {
                        return [extract(stack, "2x1"), extract(stack, "2x1")];
                    }
                    else if (types["1x1"] >= 2 && types["2x1"] >= 1) {
                        if (stack[0][0].data("type") === "1x1")
                            return [extract(stack, "1x1"), extract(stack, "1x1"), extract(stack, "2x1")];
                        else
                            return [extract(stack, "2x1"), extract(stack, "1x1"), extract(stack, "1x1")];
                    }
                }
            }
            
            return null;
        }
        
        function addTile(contents) {
            var $tile = $('<div class="tile"></div>').appendTo(state.container);
            if (contents)
                $.each(contents, function () { $tile.append(this); });
            return $tile;
        }
        
        if ($items !== null && $items.length > 0) {
            $items.each(function () {
                state.stack.push([$(this), state.step]);
            });
        }        
        
        while (true) {
            if (state.step % 5 === 4 && state.stack.length > 0 
                 && state.stack[0][0].data("span") === "1x1" && state.stack[0][0].hasClass("prey")) {
                var $tile = addTile();
                var $prey = extract(state.stack, "1x1", "prey").addClass("large").appendTo($tile);
                var $img = $prey.find("img.photo");
                $img.attr("src", $img.attr("src").replace("238^238", state.tileImgWidth + "^" + state.tileImgHeight ))
                    .attr("width", state.tileImgWidth)
                    .attr("height", state.tileImgHeight);
                state.step += 1;
            }
        
            var contents = selectContents();
            if (contents !== null) {
                if (!flush || state.stack.length > 0)
                    addTile(contents);
                else
                    $.each(contents, function () { $(this).appendTo(state.container); });
                state.step += 1;
            }
            else {
                break;
            }
        }  
        
        if (flush) {
            while (state.stack.length > 0) {
                state.stack.shift()[0].appendTo(state.container);
            }
        }
    };

    window.icoolhunt.setupShowMap = function () {
        $("[data-action='showmap']").click(function (elt) {            
            var wepUrl = $(this).data("api");
            var mapType = $(this).data("map-type");
            $(".map-wrapper:visible").slideUp();
            $(".map-wrapper:not(:visible)").slideDown(function () {
                if($('.map-wrapper').hasClass("showed"))
                    return false;
                else {
                    icoolhunt.setupBigMap(wepUrl, mapType);                    
                    $('.map-wrapper').addClass("showed");
                }
            });
        });
    };

    window.icoolhunt.setupShowTrophyCase = function () {
        $("[data-action='show-trophy-case']").click(function (elt) {            
            $("#trophy-case:visible").slideUp();
            $("#trophy-case:not(:visible)").slideDown();
        });
    };

    window.icoolhunt.setupShowSearchBox = function() {
        $("[data-action='showsearchbox']").click(
            function(elt) {
                $(".search-box:visible").slideUp();
                $(".search-box:not(:visible)").slideDown();
            });
    };
    
    window.icoolhunt.setupShowSocial = function() {
        $("[data-action='showsocialbox']").click(
            function(elt) {
                $(".social-box:visible").slideUp();
                $(".social-box:not(:visible)").slideDown();
            });

        var func = null;
        if ($("[data-social=hunter]").length === 1)
            func = getHunterShareLink;
        else if ($("[data-social=trendbox]").length === 1)
            func = getTrendboxShareLink;
        else if ($("[data-social=wp]").length === 1)
            func = getPageShareLink;

        if (func !== null) {
            $(".social-box")
                .on("click.ich", ".links .google a", function (evt) { return openSharePopup("GOOGLE", evt, $(this)); })
                .on("click.ich", ".links .tumblr a", function (evt) { return openSharePopup("TUMBLR", evt, $(this)); })
                .on("click.ich", ".links .twitter a", function (evt) { return openSharePopup("TWITTER", evt, $(this)); })
                .on("click.ich", ".links .fb a", function (evt) { return openSharePopup("FACEBOOK", evt, $(this)); })
                .find(".links .google a").attr("href", func("GOOGLE")).end()
                .find(".links .twitter a").attr("href", func("TWITTER")).end()
                .find(".links .tumblr a").attr("href", func("TUMBLR")).end()
                .find(".links .fb a").attr("href", func("FACEBOOK"));            
        }
    };    

    window.icoolhunt.setupToolsToolbar = function() {
        var $nav = $('.ich-tools-toolbar');
        if ($nav.length !== 1)
            return;
            
        var $bumper = $('.ich-tools-toolbar-bumper');
        var $brand = $('.brand');
        var $claim = $('.claim');
        var $tools = $('.tools');
        var navTop = $('.ich-tools-toolbar').offset().top - 40;
        var isFixed = 1;

        function processScroll() {
            var scrollTop = $(window).scrollTop();
            if (scrollTop >= navTop && !isFixed) {
                isFixed = 1;
                $nav.removeClass('free');
                $tools.addClass('fixed');
                $bumper.height($nav.outerHeight(true)+12);
                $brand.fadeIn();
                $claim.fadeOut();

            } 
            else if (scrollTop <= navTop && isFixed) {
                isFixed = 0;
                $nav.addClass('free');
                $tools.removeClass('fixed');
                $bumper.height(0);
                $brand.fadeOut();
                $claim.fadeIn();
            }
        }
                
        $(window).on('scroll', processScroll);
        
        processScroll();
    };

    window.icoolhunt.setupAjaxEvents = function() {
        var squitsquitbangbang, $element = null;

        $("body")
            .ajaxSend(function(xhr) {
                if (!$element)
                    $element = $('<img class="spinner" src="/skins/icoolhunt/img/preload-black.gif" />')
                        .hide().appendTo("body");
                $element.fadeIn();
            })
            .ajaxSuccess(function(xhr) {
                if ($element)
                    $element.fadeOut();
            })
            .ajaxError(function(evt, xhr, settings, exception) {
                if ($element)
                    $element.fadeOut();
                if (!settings || !xhr || xhr.status != 500 || settings.url[0] != '/')
                    return;
            });
    };


    window.icoolhunt.setupLogin = function() {
        var $widget = $("#ich-login-dialog");
        
        $widget.on('hidden', function () {
            $widget.find('.error').hide();
        });
        
        $widget.find("form").submit(function(evt) {
            $widget.find('.error').hide();
            $(this).ajaxSubmit({
                success: function(data) { 
                    if (location.pathname != "/bookmarklet")
                        location.href = "/explore"; 
                    else
                        $widget.modal("hide");
                },
                error: function() { $widget.find('.error').show(); }
            });            
            return false;
        });
    };

    window.icoolhunt.setupPreyLanded = function(evt) {        
        var $prey = $(".prey.landed[data-ich-type=prey]");
        if ($prey.length === 1) {
            createPreyMap($prey.find(".map"), {lat: $prey.data("lat"), lng: $prey.data("lng")});
        }
    };
    
    window.icoolhunt.setupTrendboxLanded = function(evt) {        
        var $seed = $(".trendbox-cover[data-ich-type=trendbox]");
        if ($seed.length === 1) {
            createPreyMap($seed.find(".map"), {lat: $seed.data("lat"), lng: $seed.data("lng")});
        }
    };
    
    
    window.icoolhunt.setupPreyGallery = function () {
        $(document).on("click", ".description, .prey-link", function (evt) {
            var $overlay = null;
            var $currentPrey = $(evt.target).closest("[data-ich-view=prey]");
            var currIndex = $.inArray($currentPrey[0], $("[data-ich-view=prey]"));
            
            function resize () {
                var $img = $overlay.find("img.photo");            
                var w = $img.data("width");
                var h = $img.data("height");
                var tw = $(window).width() - 460;
                var th = $(window).height() -100;
                var sw = w / tw;
                var sh = h / th;
                
                $img.on('load', function(evt) {
                    $(evt.target).fadeIn(1000);    
                });    
                
                $overlay.width($(window).width()).height($(window).height());
                $overlay.find(".column.right .frame").height(th - 60 - 35);
                $overlay.find(".column.left").width(tw).height(th);
                            
                if (sw >= 1 || sh >= 1) {
                    if (sw >= sh) {
                        $img.width(tw);
                        $img.height("auto");
                        w = tw;
                        h = h / sw;
                    }
                    else {
                        $img.width("auto");
                        $img.height(th);
                        h = th;
                        w = w / sh;
                    }
                }
                
                var vo = (th - h) / 2;
                if (vo > 0)
                    $img.css('top', vo);
                    
                var ho = (tw - w) / 2;
                if (ho > 0)
                    $img.css('left', ho);            
            }

            function loadPrev (evt) {                                                            
                var prevIndex = currIndex-1;
                if (prevIndex >= 0)                                        
                    var $prev = $("[data-ich-view=prey]:eq("+prevIndex+")");
                                        
                if ($prev.length !== 0) {
                    openModal("/wep" + $prev.find(".prey-link").attr("href"));
                    $currentPrey = $prev;
                    currIndex -= 1;
                    $(window).scrollTop($currentPrey.offset().top);
                }
                return false;
            }

            function loadNext (evt) {       
                var nextIndex = currIndex+1;         
                var $next = $("[data-ich-view=prey]:eq("+nextIndex+")");
                
                if ($next.length !== 0) {
                    openModal("/wep" + $next.find(".prey-link").attr("href") );
                    $currentPrey = $next;
                    currIndex += 1;
                    $(window).scrollTop($currentPrey.offset().top);
                }
                
                return false;
            }
            
            function closeModal () {
                $(window).unbind('resize');
                $(window).off(".ich");
                $overlay.remove();
            }
            
            function openModal (url) {
                $overlay = $("#ich-overlay");            
                if ($overlay.length === 0) {
                    $overlay = $('<div id="ich-overlay"></div>').css({
                        width:  $(window).width(),
                        height: $(window).height()
                    })
                    .hide()
                    .appendTo("body")
                    .fadeIn();
                    $(window).resize(resize);
                    $(window).on("keyup.ich", function (evt) { if (evt.keyCode == 27) closeModal(); })                    
                }
                $overlay.load(url + " .prey", function () {
                    var $p = $overlay.find("[data-ich-type=prey]");
                    var prey = {
                        id: $p.data("id"),
                        description: $p.closest(".details").find(".description").text(),
                        tags: $p.data("tags"),
                        lat: $p.data("lat"),
                        lng: $p.data("lng")
                    };
                    resize(); 
                    createPreyMap($overlay.find(".map"), prey);
                    $overlay
                        .find(".next").click(loadNext).end()
                        .find(".prev").click(loadPrev).end()
                        .find(".close").click(function () { closeModal(); }).end()
                        .find(".column.left").click(function () { closeModal(); }).end()
                        .find("img.photo").click( function () { return false; }).end()
                        .find("[data-action='share-prey-google']").attr("href", getPreyShareLink("GOOGLE", prey))
                            .on("click", function (evt) { return openSharePopup("GOOGLE", evt, $(this)); }).end()
                        .find("[data-action='share-prey-twitter']").attr("href", getPreyShareLink("TWITTER", prey))
                            .on("click", function (evt) { return openSharePopup("TWITTER", evt, $(this)); }).end()
                        .find("[data-action='share-prey-tumblr']").attr("href", getPreyShareLink("TUMBLR", prey))
                            .on("click", function (evt) { return openSharePopup("TUMBLR", evt, $(this)); }).end()
                        .find("[data-action='share-prey-facebook']").attr("href", getPreyShareLink("FACEBOOK", prey))
                            .on("click", function (evt) { return openSharePopup("FACEBOOK", evt, $(this)); }).end();
                    
                    var currIndex = $.inArray($currentPrey[0], $("[data-ich-view=prey]"));
                    if (currIndex === 0 )
                        $overlay.find(".prev").hide();
                    if ($("[data-ich-view=prey]:gt("+currIndex+")").length === 0)
                        $overlay.find(".next").hide();
                });
            }
                    
            openModal("/wep" + $currentPrey.find(".prey-link").attr("href"));
        
            return false;
        });
    };
    
    function createOverlay(showFunc, resizeFunc) {
        var $overlay = $("#ich-overlay");            

        function resize () {
            var ww = $(window).width();
            var wh = $(window).height();
                        
            $overlay.width(ww).height(wh);
            if (resizeFunc)
                resizeFunc($overlay, ww, wh);
        }
            
        if ($overlay.length === 0) {
            $overlay = $('<div id="ich-overlay"></div>').css({
                width:  $(window).width(),
                height: $(window).height()
            })
            .hide()
            .appendTo("body")
            .fadeIn(function () { if (showFunc) showFunc($overlay, true); resize(); });
        }
        else {
            // If the overlay already exists we simply take ownership of it.
            // Make sure the overlay is visible but don't animate.
            $overlay.show(function () { if (showFunc) showFunc($overlay, true); resize(); });
        }
        
        $(window).on("resize.ich", resize);
                
        return $overlay;    
    }
    
    window.icoolhunt.setupTrendboxContributeSingle = function() {     
        var $overlay = null;
        var $dlg = $("#ich-trendbox-contribute-single-dialog");      
        var imgUpload = $dlg.find(".prey img").attr("src");
        var prey_id, inhibit_new, is_mine;
                       
        function closeModal (keepOverlay) {
            $dlg.off(".ich").fadeOut(function () {
                $dlg.find("input").val();
                $dlg.find(".prey img").attr("src", imgUpload);
            });
            $(window).off(".ich");
            if (keepOverlay !== true)
                $overlay.fadeOut(function () { $overlay.remove(); });
        }
        
        function setupTrendboxControl () {
            var $header = $dlg.find(".trendbox.header");
            var $ctrl = $dlg.find(".trendbox-control");
            var $input = $ctrl.find("[data-action=trendbox-add]");            
            var $inputTrendboxId = $ctrl.find("[name=trendbox_id]");            
            var $results = $ctrl.find(".trendbox-results");
            var $action = $dlg.find("[data-action=trendbox-contribute-single-ok]");
            var $data = null;                       

            $inputTrendboxId.val("");
            $input.val("");
            
            $action.attr("disabled", "disabled");
            if (inhibit_new) {
                $dlg.find(".header:not(.trendbox)").text("Add to existing Trendbox");
                $header.text("Add to trendbox");
                $input.attr("placeholder", "Search for Trendbox ...");
            }
            else {
                $dlg.find(".header:not(.trendbox)").text("Add to trendbox or start a new one");
                $header.text("Start or add to Trendbox");            
                $input.attr("placeholder", "Start typing or choose from the list ...");
            }
            
            function manageResults () {
                var $startNew = $results.find(".trendbox-start-new").on("click", function(evt) {
                    $results.hide();
                });                          
                $results.find("li:not(.trendbox-closed)").on("click", function(evt) {     
                    $input.val($(evt.target).text());
                    $inputTrendboxId.val($(evt.target).data("id"));
                    $results.hide();                                         
                    $input.removeClass("start-new");
                    $header.text("Add to trendbox");
                    $action.removeAttr("disabled");
                });
            }
                        
            $dlg.on("focus.ich", ".trendbox-control [data-action=trendbox-add]", function() {              
              var $self = $(this);
              $.get("/wep/trendboxes?prey_id="+prey_id, function(data) {          
                $data = $(data).children();
                $results.empty().append($data);
                manageResults();
                if($data.length > 0)
                    $results.show();          
                else
                    $results.hide();                                
              });              
              
              $dlg.on("keyup.ich1", ".trendbox-control [data-action=trendbox-add]", function() {
                   var q = $self.val(); 
                   $inputTrendboxId.val("");
                   $.get("/wep/trendboxes?q="+encodeURIComponent(q)+"&amp;prey_id="+prey_id, function(data) {              
                        $data = $(data).children();
                        $results.empty().append($data);
                        manageResults();
                        if ($data.length > 0) 
                            $results.show();          
                        else
                            $results.hide();
                            
                        if ($data.length === 0 && inhibit_new)
                            $action.attr("disabled", "disabled");
                   });              
                                                      
                   if (q.length > 0) {
                      if (!inhibit_new) {
                           $header.text("Start new trendbox");                        
                           $action.removeAttr("disabled");
                       }
                   }
                   else {
                       $input.removeClass("start-new");                                          
                       $action.attr("disabled", "disabled");
                   }              
                });              
                manageResults();
            });
            $dlg.on("click.ich1", function(evt) { 
                if($(evt.target).closest(".trendbox-control").length === 0) {
                    $results.hide(); 
                    $dlg.off(".ich1");
                }
            });
        }
        
        function openModal (evt) {
            prey_id = $(this).closest(".item").data("id");      
            is_mine = $(this).data("is-mine");
            inhibit_new = $(this).closest(".item").data("ich-type") === "trendbox" || !is_mine;
            $dlg.find(".prey img").attr("src", API_IMG+"/preys/" + prey_id + "/images/view_318^318");
            
            $overlay = createOverlay(
                function () { $dlg.show(); },
                function (_, ww, wh) { $dlg.css({left: (ww-$dlg.outerWidth(true))/2, top: (wh-$dlg.outerHeight(true))/2}); }
            );

            $dlg.on("click.ich", "[data-action='trendbox-contribute-single-cancel']", closeModal);
                        
            setupTrendboxControl();    
            
            $dlg.on("click.ich", "[data-action='trendbox-contribute-single-ok']", function () {
                if (prey_id) {
                    var data = { 
                        prey_id: prey_id,
                        trendbox_title: $dlg.find("[name=trendbox_title]").val(),
                        trendbox_id: $dlg.find("[name=trendbox_id]").val()
                    };
                    $.ajax({
                        url: "/wep/trendbox/contribute", 
                        type: "POST",
                        data: data,
                        dataType: "json",
                        success: function (json) {
                            closeModal();
                            var tb = json.response.trendbox;
                            if(tb.isNew) {
                                wok.message({msg: "Your trendbox <em>"+ tb.title +"</em> has been created, <a href='/trendboxes/"+ tb.id +"'>view it</a> or keep exploring", title: "Fantastic!", type: "info"});                                                       
                            }                                
                            else {
                                wok.message({msg: "Your prey has been added to the <em>"+ tb.title +"</em> trendbox, <a href='/trendboxes/"+ tb.id +"'>view it</a> or keep exploring", title: "Fantastic!", type: "info"});                                
                            }
                        }
                    });
                }
                else {
                    $dlg.find(".prey").addClass("error");
                }
            });
        }        
        
        $(document).on("click", "[data-action='trendbox-contribute-single']", openModal);
                        
        return false;    
    };

    window.icoolhunt.setupPreyCatch = function(prey) {     
        var $overlay = null;
        var $dlg = $("#ich-catch-dialog");
        var imgUpload = $dlg.find(".upload img").attr("src");
        var marker, map, prey_id, trendbox_id, trendbox_title;
        
        function mapCenter (latlng) {
            marker.setPosition(latlng);
            map.panTo(latlng);
            if (map.getZoom() < 9) 
                map.setZoom(9);        
        }
        
        function mapSearch (evt) {
            var address = $dlg.find(".search input").val();
            if (!$.trim(address)) return false;

            geocoder = new google.maps.Geocoder();
            geocoder.geocode({'address': address}, function(results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    mapCenter(results[0].geometry.location);
                }
                else
                    alert("Geocode was not successful for the following reason: " + status);
            });

            return false;
        }
        
        function mapCreate () {
            // Create the map to geolocalize the prey; if possible scroll and zoom
            // the map to the user's position. After we receive information about the
            // prey we can scroll to the shot position, if the user agrees.
            
            map = new google.maps.Map($dlg.find(".map")[0],
                $.extend(icoolhunt.defaultMapOptions, {
                    center: new google.maps.LatLng(0, 0),
                    scrollwheel: true,
                    zoom: 3})
            );
            marker = new google.maps.Marker({
                position: new google.maps.LatLng(0, 0),
                map: map,
                draggable: true
            });

            if (navigator && navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    function(position) {
                        mapCenter(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
                    },
                    function (error) { /* console.log(error); */ }
                );
            }                
        }

        function tagNormalize (text) {
            return text.replace(/[,;#<>]/g, "").replace(/(^\s+|\s+$)/g, "");
        }
        
        function tagAdd (text) {
            text = tagNormalize(text);
            if (text !== "") {
                var $tag = $('<li><span>' + text + '</span><a class="close">×</a></li>').hide();
                $dlg.find(".tags li").last().before($tag.fadeIn());
            }        
        }
        
        function tagGetAll () {
            var tags = [];
            $dlg.find(".tags li").not(".active").each(function () {
                tags.push($(this).children("span").text());
            });
            return tags;
        } 

        function tagScan (evt) {
            if (evt === null 
                 || evt.which === 32 || evt.which === 33 || evt.which === 44
                 || evt.which === 46 || evt.which === 59 || evt.which === 63) {
                var tags = tagGetAll();
                var scan = $dlg.find("textarea").val().match(/#[\w\d_-]+/g);
                if (scan) {
                    scan.forEach(function (item) {
                        item = tagNormalize(item);
                        if (tags.indexOf(item) === -1)
                            tagAdd(item);
                    });
                }
            }
        }
        
        function tagEdit (evt) {
            if (evt.which === 13 || evt.which === 44 || evt.which === 59) {
                var $input = $dlg.find(".tags input");
                tagAdd($input.val());
                $input.val("");
                return false;
            }
        }
                       
        function closeModal (keepOverlay) {
            $dlg.off(".ich").fadeOut(function () {
                $dlg.find(".tags li").not(".active").remove();
                $dlg.find("textarea,input").val();
                $dlg.find(".upload img").attr("src", imgUpload);
            });
            $(window).off(".ich");
            if (keepOverlay !== true)
                $overlay.fadeOut(function () { $overlay.remove(); });
        }
        
        function setupTrendboxControl () {
            var $header = $dlg.find(".trendbox.header");
            var $ctrl = $dlg.find(".trendbox-control");
            var $input = $ctrl.find("[data-action=trendbox-add]");            
            var $inputTrendboxId = $ctrl.find("[name=trendbox_id]");            
            var $results = $ctrl.find(".trendbox-results");
            var $data = null;                       
            
            $inputTrendboxId.val("");
            $input.val("");
            
            if (trendbox_id) {
                $input.val(trendbox_title).attr("readonly", "readonly").removeClass("start-new");
                $inputTrendboxId.val(trendbox_id);
                $header.text("Add to Trendbox");
                return;
            }
            else {
                $input.removeClass("start-new").removeAttr("readonly");
                $header.text("Start or add to Trendbox"); 
            }
            
            function manageResults () {    
                var $startNew = $results.find(".trendbox-start-new").on("click", function(evt) {
                    $results.hide();
                });                                    
                $results.find("li").on("click", function(evt) {     
                    if($(evt.target).closest("li").hasClass("trendbox-closed")) {
                        alert("You must be a PRO hunter to contribute to this trendbox. Please, read our FAQ section for more information.");
                        return;
                    }
                    else {                    
                        $input.val($(evt.target).text());
                        $inputTrendboxId.val($(evt.target).data("id"));
                        $results.hide();                     
                        $header.text("Add to trendbox");
                    }
                });
            }
                        
            $input.on("focus", function() {              
                var $self = $(this);
                $.get("/wep/trendboxes", function(data) {              
                    $data = $(data).children();
                    $results.empty().append($data);
                    manageResults();
                    if($data.length > 0)
                        $results.show();          
                    else
                        $results.hide();                                
                });
              
                $self.on("keyup", function() {
                   var q = $self.val(); 
                   $inputTrendboxId.val("");
                   $.get("/wep/trendboxes?q="+encodeURIComponent(q), function(data) {              
                        $data = $(data).children();
                        $results.empty().append($data);
                        manageResults();
                        if($data.length > 0)
                            $results.show();          
                        else
                            $results.hide();
                   });                                                                    
                });
              
                manageResults();
            });
            $dlg.on("click", function(evt) { 
                if($(evt.target).closest(".trendbox-control").length === 0) 
                    $results.hide(); 
            });
        }
        
        function openModal (evt) {
            function update (prey) {
                prey_id = prey.id;
                var lat = prey.lat || null;
                var lng = prey.lng || null;
                if (lat !== null && lng !== null && (lat !== 0 || lng !== 0))
                    mapCenter(new google.maps.LatLng(lat, lng));
                $dlg.find(".upload img").attr("src", API_IMG+"/preys/" + prey_id + "/images/view_318^318");
                $dlg.find("[data-action='catch-next']").removeAttr("disabled");                        
            }
            
            if (evt) {
                var $trendbox = $(evt.target).closest("[data-ich-type=trendbox]");
                trendbox_id = $trendbox.data("id");
                trendbox_title = $trendbox.find(".trendbox-description").text() 
                    || $trendbox.find(".left .title").text() || $trendbox.find(".left h1").text();
            }
            
            $overlay = createOverlay(
                function () { $dlg.show(); mapCreate(); if (prey) update(prey); },
                function (_, ww, wh) { $dlg.css({left: (ww-$dlg.outerWidth(true))/2, top: (wh-$dlg.outerHeight(true))/2}); }
            );

            $dlg.on("click.ich", "[data-action='catch-cancel']", closeModal)
                .on("submit.ich", "form.search", mapSearch)
                .on("keypress.ich", "[name='tagedit']", tagEdit)
                .on("keypress.ich", "[name=description]", tagScan)
                .on("click.ich", ".tags", function () { $(this).find("input").focus(); })
                .on("click.ich", ".tags a.close", function () { $(this).closest("li").remove(); });
                
            $(window).on("keyup.ich", function (evt) {
                if (evt.keyCode == 27)
                    closeModal();
            });
            
            $dlg.find(".upload").fileupload({ 
                url: "/wep/upload/photo", 
                dataType: "json",
                add: function (evt, data) {
                    $dlg.find(".progress-wrapper").show();
                    $dlg.find(".progress .bar").css("width", 0);
                    if (prey_id)
                        data.formData = { prey_id: prey_id };
                    data.submit();
                },
                progress: function (evt, data) {
                    var progress = parseInt(data.loaded / data.total * 100, 10);
                    $dlg.find(".progress .bar").css("width", progress+"%");
                },
                done: function (evt, data) {
                    data.jqXHR.success(function (json) {
                        update(json.response.prey);
                    });
                    $dlg.find(".progress-wrapper").fadeOut();
                }
            });
            
            setupTrendboxControl();    
            
            $dlg.on("click.ich", "[data-action='catch-next']", function () {
                tagScan(null);
                if (prey_id) {
                    var data = { 
                        prey_id: prey_id,
                        description: $dlg.find("[name=description]").val(),
                        trendbox_title: $dlg.find("[name=trendbox_title]").val(),
                        trendbox_id: $dlg.find("[name=trendbox_id]").val(),
                        tags: tagGetAll().join(','),
                    };
                    var lat = marker.position.lat(), lng = marker.position.lng();
                    if (lat !== 0 && lng !== 0) {
                        data.lat = lat;
                        data.lng = lng;
                    }
                    $.ajax({
                        url: "/wep/upload/prey", 
                        type: "POST",
                        data: data,
                        dataType: "json",
                        success: function (json) {
                            closeModal(true);
                            icoolhunt.continuePreySocial($.extend({bookmarklet: prey && true}, json.response.prey))
                        }
                    });
                }
                else {
                    $dlg.find(".upload").addClass("error");
                }
            });
        }        
        
        if (prey)
            openModal();                               
        else 
            $(document).on('click', "[data-action='upload-prey']", openModal);
            
        return false;    
    };
        
    window.icoolhunt.continuePreySocial = function (prey) {
        var $dlg = $("#ich-social-dialog");
        var $overlay = createOverlay(
            function () { $dlg.show(); },
            function (_, ww, wh) { $dlg.css({left: (ww-$dlg.outerWidth(true))/2, top: (wh-$dlg.outerHeight(true))/2}); }
        );    
        
        function closeModal () {
            $dlg.off(".ich").fadeOut();
            $(window).off(".ich");
            $overlay.fadeOut(function () { 
                $overlay.remove(); 
                if (location.pathname === "/explore") {
                    wok.message({msg: "Your prey has been uploaded.", title: "Fantastic!", type: "info"})
                    location = location.href;
                }
                else {
                    if (prey.bookmarklet)
                        msg = 'Your prey has been uploaded. Now you can <a target="_blank" href="/prey/' + prey.id + '">view your prey</a> or <a target="_blank" href="/explore">explore</a>.'
                    else
                        msg = 'Your prey has been uploaded. Now you can <a href="/prey/' + prey.id + '">view your prey</a> or <a href="/explore">explore</a>.'
                    wok.message({msg: msg, title: "Fantastic!", type: "info"});
                }
            });
            return false;
        }   
        
        function checkEnableShare () {
            var disabled = $dlg.find(".toggle-button input:checked").length === 0;
            $dlg.find("[data-action='catch-share']").prop("disabled", disabled).end()
                .find("textarea").prop("disabled", disabled);
        }
        
        function share () {
            $.ajax({
                url: "/wep/upload/share", 
                type: "POST",
                data: $dlg.find("#share-form").serialize() + "&prey_id=" + prey.id,
                dataType: "json",
                success: function (json) {
                    closeModal();
                }
            });
        }
        
        $dlg.on("click.ich", "[data-action='catch-end']", closeModal)
            .on("click.ich", ".links .google a", function (evt) { return openSharePopup("GOOGLE", evt, $(this)); })
            .on("click.ich", ".links .tumblr a", function (evt) { return openSharePopup("TUMBLR", evt, $(this)); })
            .on("click.ich", ".links .twitter a", function (evt) { return openSharePopup("TWITTER", evt, $(this)); })
            .on("click.ich", ".links .fb a", function (evt) { return openSharePopup("FACEBOOK", evt, $(this)); })
            .on("click.ich", "[data-action='catch-share']", share)
            .on("click.ich")
            
        $dlg.find(".toggle-button input").prop("checked", true).end()
            .find(".toggle-button").toggleButtons({
                onChange: function ($e, status, e) {
                    $e.parent().siblings("img").toggle();
                    checkEnableShare();
                }
        });
        
        $dlg.find(".links .google a").attr("href", getPreyShareLink("GOOGLE", prey, true));
        $dlg.find(".links .twitter a").attr("href", getPreyShareLink("TWITTER", prey, true));
        $dlg.find(".links .tumblr a").attr("href", getPreyShareLink("TUMBLR", prey, true));
        $dlg.find(".links .fb a").attr("href", getPreyShareLink("FACEBOOK", prey, true));
        
        checkEnableShare();
    };
    
    // Utility functions used by map.

    window.icoolhunt.setupBigMap = function(wepUrl, mapType) {
        var map, infos = [];
        function getParamString(obj) {
            if (location.search)
                return location.search.substring(1) + "&" + $.param(obj);
            else
                return $.param(obj);
        }

        function placeMap(latlng, zoom) {
            map = new google.maps.Map($(".map")[0],
                $.extend(icoolhunt.defaultMapOptions, {
                    center: latlng,
                    zoom: zoom
                })
            );

            google.maps.event.addListener(map, 'bounds_changed', queueUpdateMap);
        }

        function searchLocation(address) {
            geocoder = new google.maps.Geocoder();
            geocoder.geocode( { 'address': address}, function(results, status) {
              if (status == google.maps.GeocoderStatus.OK) {
                map.panTo(results[0].geometry.location);
                if (map.getZoom() < 11) map.setZoom(11);
              }
              else {
                alert("Geocode was not successful for the following reason: " + status);
              }
            });
        }

        var boundsChangeTimer = null, justDrag = false;

        function queueUpdateMap() {
            if (!boundsChangeTimer)
                boundsChangeTimer = setTimeout(updateMap, 1000);
        }

        function updateMap() {
            var bounds = map.getBounds();
            var ne = bounds.getNorthEast();
            var sw = bounds.getSouthWest();            
            var params = {
                'f.lat1': ne.lat(),
                'f.lng1': sw.lng(),
                'f.lat2': sw.lat(),
                'f.lng2': ne.lng(),
                'f.zoom': map.getZoom()
            };            
            $.ajax({ url: wepUrl, data: getParamString(params), dataType: "json",
                success: function(data) {
                    var items = data.response;
                    if (infos.length) {
                        $.each(infos, function(i) { infos[i].setMap(null) });
                    }
                    infos = [];

                    for (var i=0 ; i < items.length ; i++) {
                        var p = items[i];
                        var latlng = new google.maps.LatLng(p.Lat, p.Lng);
                        var itemImgUrl = API_IMG + "/preys/" + p.PreyId +'/images/view_72^50';
                        
                        if(mapType === "hunter" || p.SubjectType === "hunter") {
                            if (p.HunterHasAvatar)
                                itemImgUrl = API_IMG + "/hunters/" + p.HunterId +'/images/avatar/icon_72^50';
                            else 
                                itemImgUrl = '/skins/icoolhunt/img/hunterIcon.png';
                        }
                        
                        var info = new RichMarker({
                            position: latlng,
                            map: map,
                            draggable: false,
                            flat: true,
                            content: '<div style="position:relative;background:url(/skins/icoolhunt/img/map-baloon.png?v=1); bottom no-repeat;width:103px;height:103px">'
                                +    '  <img style="display:block;cursor:pointer;position:absolute;top:17px;left:15px" src="' + itemImgUrl + '"/>'
                                +    '  <div style="font-size:10px;color:black;position:absolute;top:67px;width:103px;text-align:center">' + p.HunterCoolname + '</di>'
                                +    '</div>'
                        });
                        
                        info.itemLink = "/prey/" + p.PreyId;
                        
                        if(mapType === "hunter" || p.SubjectType === "hunter")
                            info.itemLink =  p.HunterProfilePath;

                        google.maps.event.addListener(info, 'click', function(evt) {
                            if (justDrag)
                                justDrag = false;
                            else
                                location.href = this.itemLink;
                        });
                        infos.push(info);
                    }

                    boundsChangeTimer = null;
                },
                error: function(xhr) { boundsChangeTimer = null }
            });
        }

        placeMap(new google.maps.LatLng(20, 0), 2);

        if (navigator && navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                function(position) {
                    map.panTo(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
                    map.setZoom(12);
                },
                function() { /* Nothing to do */ }
            );
        }

    };


    window.icoolhunt.setupHunterActions = function() {
        var apiFollowing = "/wep/following";
        
        $(document).on('click', ".hunter [data-action=track],.hunter [data-action=untrack]", function (evt) {
            var $button = $(this);
            var $hunter = $button.closest("[data-ich-type=hunter]");
            var $feedback = $button.closest('.hunter').find('.feedback');
            var follow = $hunter.hasClass("tracked") ? "trash" : "active";
            
            $hunter.toggleClass("tracked", follow === "active");
            $.post(apiFollowing, {"f.HunterId": $hunter.data("id"), "f.Follow": follow}, function(data) {
                $hunter.find("[data-mark=followers]").text(data.response.hunter.followers);
            }, "json");

            if($feedback)
                 $feedback.fadeIn();
                    
            return false;
        });
        
        $(document).on('click', "[data-action=makepro-hunter]", function (evt) {
            var $hunter = $(this).closest("[data-ich-type=hunter]");            
            var conf = confirm("You're about to permanently make pro this hunter. Do you really want to continue?");
            if (conf) {
                $.post("/wep/coolhunters/" + $hunter.data("id") + "/makepro" , function(data) {
                    location.href = location.href;
                });
            }
            return false;
        });        
        
        $(document).on('click', "[data-action=makeunpro-hunter]", function (evt) {
            var $hunter = $(this).closest("[data-ich-type=hunter]");            
            var conf = confirm("You're about to permanently make unpro this hunter. Do you really want to continue?");
            if (conf) {
                $.post("/wep/coolhunters/" + $hunter.data("id") + "/makeunpro" , function(data) {
                    location.href = location.href;
                });
            }
            return false;
        });                
        
        $(document).on('click', "[data-action=remove-hunter]", function (evt) {
            var $hunter = $(this).closest("[data-ich-type=hunter]");            
            var conf = confirm("You're about to permanently remove this hunter. Do you really want to continue?");
            if (conf) {
                $.post("/wep/coolhunters/" + $hunter.data("id") + "/remove" , function(data) {
                    location.href = "/explore";
                });
            }
            return false;
        });        
        
    };

    window.icoolhunt.setupPreyActions = function() {
        var apiVote = "/wep/vote";
        var apiPrey = "/wep/prey/";
        var apiTrendbox = "/wep/trendbox/";
        var apiReport = "/wep/report";
        var apiComment = "/wep/comment";
        var apiTrendboxTracked = "/wep/trendbox-tracked";
        var apiTrendboxLocked = "/wep/trendbox-locked";
        
        $(document).on('click', "[data-action=trendbox-track],[data-action=trendbox-untrack]", function (evt) {
            var $button = $(this);
            var $trendbox = $button.closest("[data-ich-type=trendbox]");
            var $feedback = $button.closest('.trendbox').find('.feedback');
            var status = $trendbox.hasClass("tracked") ? "trash" : "active";
            
            $trendbox.toggleClass("tracked", status === "active");
            $.post(apiTrendboxTracked, {"f.TrendboxId": $trendbox.data("id"), "f.Track": status}, function(data) {
            }, "json");

            if($feedback)
                 $feedback.fadeIn();
                    
            return false;
        });

        $(document).on('click', "[data-action=trendbox-lock],[data-action=trendbox-unlock]", function (evt) {
            var $button = $(this);
            var $trendbox = $button.closest("[data-ich-type=trendbox]");
            var status = $trendbox.hasClass("unlocked") ? "lock" : "unlock";
            
            $trendbox.toggleClass("unlocked", status !== "lock");
            $.post(apiTrendboxLocked, {"f.TrendboxId": $trendbox.data("id"), "f.Open": status}, function(data) {
            }, "json");
                    
            return false;
        });

        $(document).on('click', ".prey [data-action=vote]", function (evt) {
            var $button = $(this);
            var $prey = $button.closest("[data-ich-type=prey]");
            var $feedback = $button.closest('.item').find('.feedback');
            var coolness = $button.data("args");

            if (!$prey.hasClass(coolness)) {
                $prey.removeClass("cool uncool").addClass(coolness);
                $.post(apiVote, {"f.PreyId": $prey.data("id"), "f.Coolness": coolness}, function(data) {
                    $prey.find(".coolness").text(data.response.prey.coolness);
                }, "json");
            }            
            if($feedback)
                 $feedback.fadeIn();
                    
            return false;
        });
        
        $(document).on('click', "[data-action=remove]", function (evt) {
            var $prey = $(this).closest("[data-ich-type=prey]");            
            var conf = confirm("You're about to permanently delete your prey. Do you really want to continue?");
            if (conf) {
                $.post(apiPrey + $prey.data("id") + "/remove" , function(data) {
                    if ($prey.is(".gallery"))
                        setTimeout("location.href = location.href", 1500);
                    else
                        $prey.fadeOut(function() { $prey.remove(); });
                });
            }
            return false;
        });
        
        $(document).on('click', "[data-action=ban-prey]", function (evt) {
            var $prey = $(this).closest("[data-ich-type=prey]");            
            var conf = confirm("You're about to permanently ban this prey or trendbox. Do you really want to continue?");
            if (conf) {
                $.post(apiPrey + $(this).data("id") + "/ban" , function(data) {
                    $prey.fadeOut(function() { $prey.remove(); });
                });
            }
            return false;
        });
                
        $(document).on('click', "[data-action=ban-hunter]", function (evt) {
            var $prey = $(this).closest("[data-ich-type=prey]");            
            var conf = confirm("You're about to permanently ban this prey owner. Do you really want to continue?");
            if (conf) {
                $.post("/wep/coolhunters/" + $(this).data("id") + "/ban" , function(data) {
                    $prey.fadeOut(function() { $prey.remove(); });
                });
            }
            return false;
        });

        $(document).on('click', "[data-action=ignore-report]", function (evt) {
            var $prey = $(this).closest("[data-ich-type=prey]");            
            var conf = confirm("You're about to permanently ignore this report. Do you really want to continue?");
            if (conf) {
                $.post("/wep/report/" + $(this).data("id") + "/ignore" , function(data) {
                    $prey.fadeOut(function() { $prey.remove(); });
                });
            }
            return false;
        });
                
        $(document).on('click', "[data-action=trendbox-remove]", function (evt) {
            var $trendbox = $(this).closest("[data-ich-type=trendbox]");            
            var conf = confirm("You're about to permanently remove your trendbox. Do you really want to continue?");
            if (conf) {
                $.post(apiTrendbox + $trendbox.data("id") + "/remove" , function(data) {
                    if ($trendbox.is(".trendbox-cover"))
                       setTimeout("location.href = '/explore'" , 1500);                         
                    else
                       setTimeout("location.href = location.href", 1500);
                    
                });
            }
            return false;
        });
        
        $(document).on('click', "[data-action=trendbox-contribute-remove]", function (evt) {            
            var $item = $(this).closest(".item");
            var conf = confirm("You're about to permanently remove this prey from the current trendbox. Do you really want to continue?");
            if (conf) {
                $.post(apiTrendbox + $item.data("trendbox-id") + "/prey/" + $item.data("id") + "/remove" , function(data) {
                      setTimeout("location.href = location.href", 1500);
                    
                });
            }
            return false;
        });
        
        
        $(document).on('click', ".prey [data-action=report]", function (evt) {
            var $button = $(this);
            var $prey = $button.closest("[data-ich-type=prey]");            
        
            var $prey = $(this).closest("[data-ich-type=prey]");
            var conf = confirm("You're about to report this prey as offensive. Do you really want to continue?");
            if (conf) {
                $.post(apiReport, {"f.PreyId": $prey.data("id"), "f.Message" : "Report from web."} , function(data) {
                    alert("You're abuse report has been recorded. Thank you very much for helping us to make iCoolhunt better for everybody.");
                }, "json");
            }
            
            return false;
        });
        
        $(document).on('submit', "[data-action=comment]", function (evt) {
            var $form = $(this);
            var $button = $(this).find("button[type='submit']");
            var $message = $form.find("input[name='message']");
            var $comments = $form.parent().prev(".comments");

            var text = $.trim($message.val());
            if (text === "")
                return false;
                
            $button.attr("disabled", "disabled");
            
            $.post(apiComment, {"f.PreyId": $form.data("prey-id"), "f.Text": text}, function(data) {
               $button.removeAttr("disabled");
               $message.val("");

               $comments.find(".intro").remove();

               var $newComment = $comments.find("ul li.template").clone().removeClass("template");               
               $($newComment.find(".message")).html(data.response.Html);  
               if ($newComment.find(".time").text() === "")
                   $($newComment.find(".time")).text(data.response.RelativeTime);  
               $newComment.prependTo($comments.find("ul")).fadeIn();
               $comments.scrollTop(0);
            }, "json");

            return false;
        });
    };

    // CLASS: Prey

    window.icoolhunt.Prey = function(sel) {
        this.$element = $(sel);
        this.description = $.trim(this.$element.find(".prey-description").text());

        var $data = this.$element.find(".data-position");
        if ($data.length)
            this.position = eval("("+$data.text()+")");

        return this;
    };

    window.icoolhunt.Prey.prototype.createMap = function(sel) {
        this.$elementMap = $(sel);
        if (this.$elementMap.length) {
            var latlng = new google.maps.LatLng(this.position.lat, this.position.lng);
            this.map = new google.maps.Map(this.$elementMap[0],
                $.extend(icoolhunt.defaultMapOptions, {
                    center: latlng
                })
            );
            this.mapMarker = new google.maps.Marker({
                position: latlng,
                map: this.map,
                title: this.description
            });
        }

        return this;
    };

    window.icoolhunt.Prey.prototype.showOnMap = function(map) {
        if (!this.mapMarker) {
            this.map = map;
            this.mapMarker = new google.maps.Marker({
                position: new google.maps.LatLng(this.position.lat, this.position.lng),
                map: this.map,
                title: this.description,
                icon: "skins/icoolhunt/css/im/map/marker.png",
                shadow: null
            });
        }
        else {
            this.mapMarker.setMap(map);
        }
        return this;
    };

    window.icoolhunt.Prey.prototype.removeFromMap = function() {
        if (this.mapMarker) {
            this.mapMarker.setMap(null);
            this.mapMarker = null;
        }
        return this;
    };

    window.icoolhunt.Prey.prototype.focus = function() {
        if (this.mapMarker) {
            this.map.panTo(this.mapMarker.getPosition());
        }
        return this;
    };

    window.icoolhunt.setupHashtags = function(selector) {
        // Replace each #hashtag with a link to /explore?q=hashtag
        $(selector).each(function () {
            $(this).html($(this).text().replace(/(^| )#([A-Za-z0-9_-]+)/g, '$1<a href=\"/explore?f.q=$2\">#$2</a>'));
        });
    };

    window.icoolhunt.setupHunterEdit = function () {
        function rgb2hex (rgb) {
            if (rgb[0] === "#")
                return rgb;
            rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
            return "#" +
              ("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
              ("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +
              ("0" + parseInt(rgb[3],10).toString(16)).slice(-2);
        }
        $("#change-colors-dialog").on("show", function () {
            var $dlg = $(this);
            var fgcolor = rgb2hex($(".hunter .left").css("color"));
            var bgcolor = rgb2hex($(".hunter .left").css("background-color"));
            $dlg.find(".preview").css("background-color", bgcolor).end()
                .find(".preview h1").css("color", fgcolor).end()
                .find("[name=fgcolor]").val(fgcolor).end()
                .find("[name=bgcolor]").val(bgcolor).end()
                .find(".color input").miniColors({
                    change: function (hex) {
                        if ($(this).attr("name") === "bgcolor")
                            $dlg.find(".preview").css("background-color", hex);
                        else
                            $dlg.find(".preview h1").css("color", hex);
                    }
                });
        });
        
        $("[data-action=change-avatar] input[type=file]").on("change", function () {
            var $form = $(this).closest("form");
            $form.ajaxSubmit(function () {
                var $img = $form.siblings("img");
                var url = $img.attr("src").split('?')[0];
                $img.attr("src", url + "?_=" + (new Date()).getTime());
            });
        });
    };

    // Setup landing page animation.

    window.icoolhunt.setupLandingAnimate = function () {
        if ($(".landing").length === 0) return;
        
        var $currentBackground = $(".landing .background").filter(":visible");
        var index = 0, count = $(".landing .background").length;
        var skip = false;

        function prepare () {            
            var $next = $currentBackground.next(".background");
            if ($next.length === 0) {
                $next = $(".landing .background").eq(0);
                index = 0;
            }
            else {
                index += 1;
            }
            
            return $next;
        }
                                
        function animate ($newBackground) {            
            var h = $currentBackground.height();
            $(".landing .dots a").removeClass("active").eq(index).addClass("active");
            
            $newBackground.css({top: -h, display: 'block'});
            $newBackground.animate({top: 0}, 800, function() {
                var $claim = $newBackground.find(".claim");
                setTimeout(function() {
                    $claim.fadeIn(); 
                    if (index === count-1)
                        $(".landing .only-last").fadeIn();
                }, 800);
            });
            $currentBackground.animate({top: h}, 800, function() {
                $(this).hide().find(".claim").hide();
                if (index !== count-1)
                    $(".landing .only-last").fadeOut();
            });
            
            $currentBackground = $newBackground;
        }

        function tick () {            
            if (skip) {
                skip = false;
                return;
            }
            animate(prepare());
        }

        $(".landing .only-last").hide();
        $(".landing .dots a").click(function (evt) {
            skip = true;
            index = $(evt.target).prevAll().length;
            animate($(".landing .background").eq(index));
            return false;
        });
        
        setTimeout(function() { $currentBackground.find(".claim").fadeIn(); }, 800);        
        setInterval(tick, 10000);
    };
})(jQuery);
