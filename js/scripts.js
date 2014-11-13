var pictureSource;   // picture source
var destinationType; // sets the format of returned value
var elMainTopH;
var datePickerOpen = false; // workaround for datapicker be onepn only once time
var pageCurrent;

var checkStav = {
    stav:"",
    start : function(){
       this.stav =  setInterval(function(){
           ajaxCheckStav();
       }, 5000);
    },
    stop : function(){
        clearInterval(this.stav);
    }
}

var pageSys = {
    pageBackArr:[],
    pageBack:"",
    pageCurrent:"",
    countMemorizedPages:5,
    setCurrent: function(c){
        this.pageBack = this.pageCurrent;
        this.pageCurrent = c;
        //console.log(c);
        this.pageBackArr.push(c);
        if(this.pageBackArr.length>this.countMemorizedPages)
            this.pageBackArr = this.pageBackArr.slice(1,this.countMemorizedPages+1);
    },
    goBack : function() {
        this.pageBackArr.pop();
        this.pageCurrent = this.pageBackArr.pop();
        this.pageBack = this.pageBackArr[this.pageBackArr.length-1];
        showWindow(this.pageCurrent);

    },
    reset : function(currenPage) {
        this.pageCurrent = currenPage;
        this.pageBackArr = [];
        this.pageBackArr.push(currenPage);
        this.pageBack = "";
    }

};

var guid = (function() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return function() {
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    };
})();

function onDeviceReady() {

    scripDefaultInit();
    var stav = window.localStorage.getItem("ipovStav");
    if(stav!=null)
    {
        if(stav == "odeslano")
        {
            checkStav.start();
            showWindow("nahravam");
            return;
        }
    }

    //var id = crypto.randomBytes(20).toString('hex');
    //alert(guid());

    showWindow("index");
    //showWindow("prihlaseni");
    //showWindow("registrace");
    //showWindow("kalkulace");
    //showWindow("nahravam");
    //showWindow("nabidky");
    //showWindow("podrobnosti");
    //showWindow("doplnkove1");
    //showWindow("doplnkove2");
    //showWindow("doplnkove3");
    //showWindow("doplnkove4"); // datumy
    //showWindow("rekapitulace");
    //showWindow("dekujeme");
    showWindow("photoImage");



}

function clickInit()
{
    /*
    zaskrtavadlo souhlasim s podminkama
     */
    $("input._souhlasPodminek").on("click", function(e){
        if($(this).is(':checked'))
        {
            $(".buttonBlue._souhlasPodminek").removeClass("backgGrey");
            $(".buttonBlue._souhlasPodminek").addClass("backgBlue");
            $(".buttonBlue._souhlasPodminek").removeClass("buttonDisable");
        } else
        {
            $(".buttonBlue._souhlasPodminek").addClass("backgGrey");
            $(".buttonBlue._souhlasPodminek").removeClass("backgBlue");
            $(".buttonBlue._souhlasPodminek").addClass("buttonDisable");
        }
    });

    // box doplnkove informace, volba ano/ne
    $(".boxDoplnek ._buttonClick").on("click", function(e){

        var par = $(this).parent();
        // defPosition stav prepinace je defaultne?
        var defPosition = true;
        if($(par).find(".ne._buttonClick").hasClass("backgBlue"))
        {
            defPosition = false;
        }

        var elNe = $(par).find(".ne._buttonClick");
        var elAno = $(par).find(".ano._buttonClick");


        if(defPosition)
        {
            // change default position to - ne in blue
            $(elNe).removeClass("backgGrey")
                .addClass("backgBlue");
            $(elAno).removeClass("backgBlue")
                .addClass("backgGrey");
            $(par).next().css("display","block");

        } else
        {
            $(elNe).removeClass("backgBlue")
                .addClass("backgGrey");
            $(elAno).removeClass("backgGrey")
                .addClass("backgBlue");
            $(par).next().css("display","none");
        }
        /*
        if($(this).hasClass("backgGrey") && $(this).hasClass("ne"))
        {
            $(this).removeClass("backgGrey");
            $(this).addClass("backgBlue");
            $(this).next().removeClass("backgBlue");
            $(this).next().addClass("backgGrey");
        } else
        {
            $(this).removeClass("backgBlue");
            $(this).addClass("backgGrey");
            $(this).next().removeClass("backgGrey");
            $(this).next().addClass("backgBlue");
        }
        */
    });

}

function dateZacatek(el)
{
    if (typeof datePicker === 'undefined') {
        return;
    }

    if(datePickerOpen)
    {
        return;
    } else
    {
        datePickerOpen = true;
    }

    var options = {
        date: new Date(),
        mode: 'date'
    };

    inputValue = $(el).val();
    el.blur();
    datePicker.show(options, function(date){
        if(date)
        {
            datePickerOpen = false;
            // happend when is cancel button press
            if(date=="Invalid Date") return;

            // fill date in input
            var newDate = new Date(date);


            el.value = (newDate.getDate() + "." + (Number(newDate.getMonth()) + 1) + "." +  + newDate.getFullYear().toString());


        }
    });

}


function showWindow(windowName)
{
    //window.localStorage.setItem("hairSoft-lastWindow",windowName);


    hideAll();

    if(pageCurrent == "photoImage" && windowName !="photoImage")
    {
        $("#photoAgain").css("display","none");
        $("#photoOk").css("display","none");
        $(".mainTop h1").css("display","block");
    }

    pageCurrent = windowName;


    if(windowName=="index")
    {
        topTex("Výběr pojištění");
        containerVisibilitySet("contentIndex",true);
    }
    if(windowName=="prihlaseni")
    {
        topTex("Přihlášení");
        containerVisibilitySet("prihlaseni",true);
        containerVisibilitySet("backButton",true);
    }
    if(windowName=="registrace")
    {
        topTex("Registrace");
        containerVisibilitySet("registrace",true);
        containerVisibilitySet("backButton",true);
    }
    if(windowName=="kalkulace")
    {
        inputsClearAll($(".kalkulace"));
        topTex("Kalkulace");
        containerVisibilitySet("kalkulace",true);
        containerVisibilitySet("backButton",true);
    }
    if(windowName=="nahravam")
    {
        topTex("Nahrávám");
        containerVisibilitySet("nahravam",true);
        //containerVisibilitySet("backButton",true);
        pageSys.reset();
        return;
    }
    if(windowName=="nabidky")
    {
        topTex("Nabídky");
        containerVisibilitySet("nabidky",true);
        containerVisibilitySet("backButton",true);
    }
    if(windowName=="podrobnosti")
    {
        topTex("Nabídky");
        containerVisibilitySet("podrobnosti",true);
        containerVisibilitySet("backButton",true);
    }
    if(windowName=="rekapitulace")
    {
        topTex("Doplňkové informace");
        containerVisibilitySet("rekapitulace",true);
        containerVisibilitySet("backButton",true);
    }
    if(windowName=="doplnkove1")
    {
        topTex("Doplňkové informace");
        containerVisibilitySet("doplnkove1",true);
        containerVisibilitySet("backButton",true);
    }
    if(windowName=="doplnkove2")
    {
        topTex("Doplňkové informace");
        containerVisibilitySet("doplnkove2",true);
        containerVisibilitySet("backButton",true);
    }
    if(windowName=="doplnkove3")
    {
        topTex("Doplňkové informace");
        containerVisibilitySet("doplnkove3",true);
        containerVisibilitySet("backButton",true);
    }
    if(windowName=="doplnkove4")
    {
        topTex("Doplňkové informace");
        containerVisibilitySet("doplnkove4",true);
        containerVisibilitySet("backButton",true);
    }
    if(windowName=="dekujeme")
    {
        topTex("Děkujeme");
        containerVisibilitySet("dekujeme",true);
    }
    if(windowName=="photoImage")
    {
        containerVisibilitySet("photoImage",true);
        $("#photoAgain").css("display","inline-block");
        $("#photoOk").css("display","inline-block");
        $("#photoLupa").css("display","inline-block");
        $(".mainTop h1").css("display","none");
        containerVisibilitySet("backButton",true);
    }

    // add current page to page history
    if(windowName=="index"){
        pageSys.reset("index");
    } else
    {
        pageSys.setCurrent(windowName);
    }


}

function topTex(text)
{
    if(elMainTopH == null)
    {
        elMainTopH = $(".mainTop h1");
    }
    elMainTopH.html(text);
}

function pojistit(koho)
{
    showWindow("kalkulace");
}

function prihlasit()
{
    showWindow("prihlaseni");
}

function supportDetect()
{
    if(navigator.camera== null) return;
    pictureSource=navigator.camera.PictureSourceType;
    destinationType=navigator.camera.DestinationType;
}


/**
 * ajax dotaz na ...
 * @param ID - ID pozadavku...
 */
function ajaxSendRequest(ID)
{
    var clID = guid();
    $.ajax({
        type: "POST",
        //url: "http://client.aireworks.eu/ipov/app/customer?client_name=m&client_personalnumber=m&client_id=c&client_phone=d&client_email=e&client_zip=f&client_car_volume=g&client_car_power=h&agree=agree&order_send=Odeslat",
        url: "http://client.aireworks.eu/ipov/app/customer?client_id="+clID,
        data : {
            client_name : $(".kalkulace input[name=client_name]").val(),
            client_personalnumber : $(".kalkulace input[name=client_personalnumber]").val(),
            client_id : $(".kalkulace input[name=client_id]").val(),
            //client_id : clID,
            client_phone : $(".kalkulace input[name=client_phone]").val(),
            client_email : $(".kalkulace input[name=client_email]").val(),
            client_zip : $(".kalkulace input[name=client_zip]").val(),
            client_car_volume : $(".kalkulace input[name=client_car_volume]").val(),
            client_car_power : $(".kalkulace input[name=client_car_power]").val(),
            agree: "agree",
            order_send: "Odeslat"

        },
        success: function(data) {
            //alert("succes");
            //console.log(data);
            window.localStorage.setItem("ipovStav","odeslano");
            window.localStorage.setItem("ipovclID",clID);
            checkStav.start();
            showWindow("nahravam");
        },
        error: ajaxErrorHandler
    });
}

function ajaxCheckStav()
{
    var clID = window.localStorage.getItem("ipovclID");
    $.ajax({
        type: "GET",
        //url: "http://client.aireworks.eu/ipov/app/customer?client_name=m&client_personalnumber=m&client_id=c&client_phone=d&client_email=e&client_zip=f&client_car_volume=g&client_car_power=h&agree=agree&order_send=Odeslat",
        url: "http://client.aireworks.eu/ipov/app/customer/action/checkdb?client_id="+clID,
        dataType: 'json',
        success : function(data) {
            if(data == false) {
                //alert("sad");
                checkStav.stop();
            }
            if (data.order_status == 0) {
                $('.mainContent.nahravam p').html('Náš operátor pro vás zpracovává nabídky pojištění, pokud bude aplikace ukončena, výsledek vám přijde na zadaný e-mail.');
            }
            if (data.order_status == 1) {
                $('.mainContent.nahravam p').html('Operátor převzal Váš požadavek a nyní zpracovává nabídku...');
            }
            if (data.order_status == 2) {
                if (action != 'response') {
                    window.location = site_url + '/customer/response';
                }
                else {
                    if (data.messages) {
                        $('#orderresponse').empty();
                        $.each(data.messages, function (index, value) {
                            $('#orderresponse').append('<div class="list-group-item">' + value.message_data + '</div>');
                        });
                    }

                }
            }
        },
        error: ajaxErrorHandler
    });
}

function ajaxErrorHandler(data) {
    console.log(data);


    if(!local)
    {
        if(typeof navigator.connection!="undefined")
        {

            var networkState = navigator.connection.type;
            if(networkState == Connection.UNKNOWN || networkState== Connection.NONE)
            {
                alertG("Nelze se připojit k internetu","Chyba!");
                return;false
            }
        }

    }

    var msg = "";
    if(typeof data.msg != "undefined")
    {
        msg = data.msg;
    }

    if(typeof data.responseText != "undefined")
    {
        msg = data.responseText;
    }

    if(msg=="")
    {
        alertG("Chyba s komunikací se serverem","Chyba!");
    } else
    {
        alertG("chyba:" +data.msg,"Chyba!");
    }
}

function inputsClearAll(el)
{
    $(el).find("input").val("");
}



function reset()
{
    window.localStorage.setItem("ipovStav","reset");
    delete_cookie();
    showWindow("index");
    checkStav.stop();
}
function delete_cookie()
{
    document.cookie = 'PHPSESSID=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}


function vyfot()
{
    navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 75,
        destinationType: destinationType.DATA_URL });

}

function photoLupa()
{
    alert("photoLupa");
    alert($("#photoLupa").html());
    if($("#photoLupa").html()=="-")
    {
        alert("je minus");
        $("#photoLupa").html("+");
        alert("set plus");
        $("#smallImage").css("width","100%");
        $("#smallImage").css("height","100%");
    } else
    {
        $("#photoLupa").html("-");
        $("#smallImage").css("width","initial");
        $("#smallImage").css("height","initial");
    }
}



function onPhotoDataSuccess(imageData) {
    // Uncomment to view the base64 encoded image data
    // console.log(imageData);

    // Get image handle
    //
    var smallImage = document.getElementById('smallImage');

    // Unhide image elements
    //
    smallImage.style.display = 'block';

    // Show the captured photo
    // The inline CSS rules are used to resize the image
    //
    smallImage.src = "data:image/jpeg;base64," + imageData;

    showWindow('photoImage',true);
}



function onFail(message) {
    alert('Failed because: ' + message);
}