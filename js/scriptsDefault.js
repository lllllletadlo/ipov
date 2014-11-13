var transitionObject = {};


function scripDefaultInit() {

    // search first page display usually in dataManagerLoad after ajax result

    // detect if browser support things we need and set support... variable
    supportDetectDef();

    // by supported aceleration, prepare classes and view
    transitionInit();

    // set clicks function on buttons, touch or click
    clickInitDef();

    // load variable from localStore and set data it in pages
    dataManagerLoad();

    // unhide ready app :)
    $(".special.cover").css("display","none");


}

function clickInitDef()
{

    var $buttons;
    // ------------- buttons needs click (scrollable or...)
    $buttons = $('._buttonClick');

    $buttons.on("click", function(e){
        e.stopPropagation();
        e.preventDefault();
        if($(this).hasClass("buttonDisable"))
            return;
        if($(this).hasClass("buttonOpacity"))
            $(this).addClass('highlightOpacity');
        else
            $(this).addClass('highlight');
        var el= this;

        setTimeout(function(){
            // set button click effect back
            var dataClick = $(el).attr("data-click");
            if($(el).hasClass("buttonOpacity"))
                $(el).removeClass('highlightOpacity');
            else
                $(el).removeClass('highlight');

            // is there any validation to proceed?
            var validateFormID = $(el).attr("data-validace-submitForm");
            if(validateFormID!= null && validator!=null)
            {

                var isValid = validator.valideForm(validateFormID);
                if(!isValid) return;
            }

            // run onclick function
            if(dataClick!= null)
            {
                alert("click");
                eval(dataClick);
            }
        },150);
    });

    clickInit();
}

function dataManagerLoad()
{

}

function showInfow(show,msg)
{

    if(show)
    {
        $("div.special.info h1").html(msg);
        //$("div.special.info").css("display","block");
        containerVisibilitySet("specInfo",true);
    } else
    {
        //$("div.special.info").css("display","none");
        containerVisibilitySet("specInfo",false);
    }

}

function transitionObjectInit()
{
    // get all containers
    $("[data-cont-id]").each(function() {
        var key = $(this).attr("data-cont-id");
        transitionObject[key] = {
            el: $(this),
            visibility: true
        };
    });
    logging("transitionObject found: " + Object.keys(transitionObject).length);
}

function containerHideAll(expectShowInfo)
{

    for(var o in transitionObject){
        if(o=="specInfo" && expectShowInfo)
        {
        } else
            containerVisibilitySet(o,false,true);
    }
}

function containerVisibilitySet(contID,visibility,forced,ccsStyle)
{

    // if already visibility is do nothing
    if(transitionObject[contID].visibility == visibility && forced != true)
    {
        return;
    }


    if(supportedTran == 3)
    {
        if(visibility)
        {
            transitionObject[contID].el.css("-webkit-transform","translate3d(0, 0, 0)");
            transitionObject[contID].el.css("transform","translate3d(0, 0, 0)");
        } else
        {
            transitionObject[contID].el.css("-webkit-transform","translate3d(-"+pageMaxLenght+"px, 0, 0)");
            transitionObject[contID].el.css("transform","translate3d(-"+pageMaxLenght+"px, 0, 0)");
        }
    } else
    {
        if(visibility)
        {
            if(ccsStyle!=null)
                transitionObject[contID].el.css("display",ccsStyle);
            else
                transitionObject[contID].el.css("display","block");
        } else
        {
            transitionObject[contID].el.css("display","none");
        }
    }

    transitionObject[contID].visibility = visibility;
}


function transitionInit()
{

    pageMaxLenght = $(document).width()>$(document).height()?$(document).width():$(document).height();

    //$("body").css("min-height",pageMaxLenght + "px");

    // --- menu bar
    if(supportedTran == 3)
    {
        $("div.menu").css("-webkit-transform","translate3d(-100%, 0, 0)");
        $("div.menu").css("transform","translate3d(-100%, 0, 0)");
    } else if(supportedTran == 2)
    {
        $("div.menu").css("left","-100%");
    } else
    {
        $("div.menu").css("display","none");
    }
    menuVisible = false;

    $navtoggle2 = $("#nav-toggle2");
    $menu = $("div.menu");

    transitionObjectInit();
    containerHideAll(true);

}

// improve to hide by 3d transforms current window
function hideAll()
{
    /*
     $(".main div.mainContent").css("display","none");
     $(".main div.mainBottom").css("display","none");
     $(".mainTop h1").css("display","none");
     $("#rowLeft").css("display","none");
     $(".mainTop input").css("display","none");

     $(".mainTop div.zakazniciDetail").css("display","none");
     */
    //$(".mainTop h1").css("display","none");
    //$(".mainTop input").css("display","none");
    containerHideAll();
}

function supportDetectDef()
{
    supportedTran = 1;

    if(supportsTransitions())
    {
        supportedTran = 2;
        logging("support transition",1);
    }
    if(supportsTransitions3d())
    {
        supportedTran = 3;
        logging("support transition3d",1);
    }

    supportDetect();
}

function supportsTransitions() {
    var b = document.body || document.documentElement,
        s = b.style,
        p = 'transition';

    if (typeof s[p] == 'string') { return true; }

    // Tests for vendor specific prop
    var v = ['Moz', 'webkit', 'Webkit', 'Khtml', 'O', 'ms'];
    p = p.charAt(0).toUpperCase() + p.substr(1);

    for (var i=0; i<v.length; i++) {
        if (typeof s[v[i] + p] == 'string') { return true; }
    }

    return false;
}

function supportsTransitions3d() {
    var el = document.createElement('p'),
        has3d,
        transforms = {
            'webkitTransform':'-webkit-transform',
            'OTransform':'-o-transform',
            'msTransform':'-ms-transform',
            'MozTransform':'-moz-transform',
            'transform':'transform'
        };

    // Add it to the body to get the computed style.
    document.body.insertBefore(el, null);

    for (var t in transforms) {
        if (el.style[t] !== undefined) {
            el.style[t] = "translate3d(1px,1px,1px)";
            has3d = window.getComputedStyle(el).getPropertyValue(transforms[t]);
        }
    }

    document.body.removeChild(el);

    return (has3d !== undefined && has3d.length > 0 && has3d !== "none");
}