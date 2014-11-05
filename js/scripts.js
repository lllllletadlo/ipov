var elMainTopH;
var datePickerOpen = false; // workaround for datapicker be onepn only once time
var pageCurrent;
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

function onDeviceReady() {


    scripDefaultInit();

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

    $(".boxDoplnek ._buttonClick").on("click", function(e){

    });

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


                el.value = (Number(newDate.getMonth()) + 1) + "/" + newDate.getDate() + "/" + newDate.getFullYear().toString().substr(2,2);


            }
        });

    }
}



function showWindow(windowName)
{
    //window.localStorage.setItem("hairSoft-lastWindow",windowName);


    hideAll();



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
        topTex("Kalkulace");
        containerVisibilitySet("kalkulace",true);
        containerVisibilitySet("backButton",true);
    }
    if(windowName=="nahravam")
    {
        topTex("Nahrávám");
        containerVisibilitySet("nahravam",true);
        containerVisibilitySet("backButton",true);
        setTimeout(function(){
            showWindow("nabidky");
        },2500);
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