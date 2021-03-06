var pictureSource;   // picture source
var destinationType; // sets the format of returned value
var elMainTopH;
var datePickerOpen = false; // workaround for datapicker be onepn only once time
var pageCurrent;
var dataZpravy = "";
var imgUri = "";

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
};

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
    //showWindow("photoImage");

    // TODO dopsat pri zvetsovani scale3d se musi zvetsovat i div v kterym to je, aby slo scrollovat
    //var pinch1 = new PinchEl(document.getElementById("smallImage"), document.getElementById("smallImage"));


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

    // hide all fields ---- start
    hideAll();

    if(pageCurrent == "photoImage" && windowName !="photoImage")
    {
        $("#photoAgain").css("display","none");
        $("#photoOk").css("display","none");
        $("#photoLupa").css("display","none");
        $(".mainTop h1").css("display","block");
    }
    // hide all fields  ------ end

    var pageBefore = pageCurrent;
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
        if(pageBefore != "photoImage")
        {
            inputsClearAll($(".kalkulace"));
            $('.roundedOne input').prop('checked', false);
        }

        if(imgUri!="")
            $(".kalkulace.prvni .fotak").addClass("fotky");
        else
            $(".kalkulace.prvni .fotak").removeClass("fotky");

        topTex("Kalkulace");
        containerVisibilitySet("kalkulace",true);
        containerVisibilitySet("backButton",true);
    }
    if(windowName=="nahravam")
    {
        topTex("Nahrávám");

        // reset previous data
        $(".nahravam .boxGeneral h1").html("Vyčkejte prosím...");
        $(".nahravam div.zpravy").html("");
        dataZpravy = "";
        containerVisibilitySet("nahravam",true);
        //containerVisibilitySet("backButton",true);
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
        $("#smallImage").css("display","block");
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
    if(typeof navigator.camera == "undefined")
    {
        return;
    } else
    {
        pictureSource=navigator.camera.PictureSourceType;
        destinationType=navigator.camera.DestinationType;
    }
}

function ajaxSendRequest()
{
    if(imgUri=="") {
        ajaxSendRequestBezDokumentu();
        return
    }


    $('.mainContent.nahravam p').html('Nahrávám formulář na server...');
    showWindow("nahravam");

    var options = new FileUploadOptions();
    options.fileKey = "client_file";
    options.fileName = imgUri.substr(imgUri.lastIndexOf('/') + 1);
    options.mimeType = "image/jpg";

    var params = {};
    params.client_name = $(".kalkulace input[name=client_name]").val();
    params.client_personalnumber = $(".kalkulace input[name=client_personalnumber]").val();
    params.client_id = $(".kalkulace input[name=client_id]").val();
    params.client_phone = $(".kalkulace input[name=client_phone]").val();
    params.client_email = $(".kalkulace input[name=client_email]").val();
    params.client_zip = $(".kalkulace input[name=client_zip]").val();
    params.client_car_volume = $(".kalkulace input[name=client_car_volume]").val();
    params.client_car_power = $(".kalkulace input[name=client_car_power]").val();
    params.agree = "agree";
    params.order_send = "Odeslat";


    options.params = params;
    options.chunkedMode = false;
    var ft = new FileTransfer();
    var clID = guid();
    window.localStorage.setItem("ipovclID",clID);
    var url = "http://client.aireworks.eu/ipov/app/customer?client_id="+clID;
    ft.upload(imgUri, url, win, fail, options, true);

}

function ajaxSendRequestBezDokumentu()
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

function win(r) {
    console.log("Code = " + r.responseCode);
    console.log("Response = " + r.response);
    console.log("Sent = " + r.bytesSent);
    $('.mainContent.nahravam p').html('Nahráno<br>Čekám na odpověď serveru...');
    window.localStorage.setItem("ipovStav","odeslano");
    checkStav.start();
}

function fail(error) {
    //alertG(error.code,"Chyba!");
    alertG("Obrázek nelze nahrát","Chyba!");
    console.log("upload error source " + error.source);
    console.log("upload error target " + error.target);
}

function ajaxSendRequest_old(ID)
{
    var clID = guid();
    window.localStorage.setItem("ipovclID",clID);
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
            if (data.order_status == 2 ) {
                if (data.messages && dataZpravy != JSON.stringify(data.messages)) {
                    dataZpravy = JSON.stringify(data.messages);
                    console.log(data.messages);
                    $(".nahravam .boxGeneral h1").html("Zprávy od operátora");

                    var zpravyHtml = "";
                    $.each(data.messages, function (index, value) {
                        zpravyHtml += '<p class="m">' + value.message_data + '</p>';
                    });

                    vyska = $("body").height() - $(".nahravam .boxGeneral div.zpravy").offset().top - $(".nahravam .boxGeneral div.buttonBlue").height() - 20;
                    var zpravyBox = $(".nahravam div.zpravy");

                    $(".nahravam .boxGeneral > p").html("");
                    $(zpravyBox).html(zpravyHtml)
                        .css("height",vyska + "px")
                        .scrollTop(zpravyBox.prop("scrollHeight"));
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
    imgUri = "";
    checkStav.stop();
    $(".nahravam div.zpravy").html("")
        .css("height","5em");

    // checkbox disable
    $('.roundedOne input').prop('checked', false);
    $(".buttonBlue._souhlasPodminek").addClass("backgGrey");
    $(".buttonBlue._souhlasPodminek").removeClass("backgBlue");
    $(".buttonBlue._souhlasPodminek").addClass("buttonDisable");
}
function delete_cookie()
{
    document.cookie = 'PHPSESSID=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}



function vyfot()
{
    if(typeof navigator.camera == "undefined")
    {
        alertG("Nelze spustit kameru","Chyba");
        return;
    }

    if(imgUri=="")
    {
        navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 75,
            destinationType: destinationType.FILE_URI });
    } else
    {
        showWindow("photoImage");
    }
}

function vyfot_ukazka()
{
    navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 75,
        destinationType: destinationType.DATA_URL });

}
function onPhotoDataSuccess_ukazka(imageData) {
    showWindow('photoImage');
    var smallImage = document.getElementById('smallImage');
    smallImage.src = "data:image/jpeg;base64," + imageData;

    //$(".kalkulace.prvni .fotak").addClass("fotky");


}

function photoLupa()
{
    if($("#photoLupa").html()=="-")
    {
        $("#photoLupa").html("+");
        $("#smallImage").css("width","100%");
    } else
    {
        $("#photoLupa").html("-");
        $("#smallImage").css("width","initial");
    }
}



function onPhotoDataSuccess(imageURI) {
    showWindow("photoImage");
    smallImage.src = imageURI;
    imgUri=imageURI;
}




function onFail(message) {
    alertG("Zrušeno");
}