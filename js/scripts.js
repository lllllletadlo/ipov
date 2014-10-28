var elMainTopH;



function onDeviceReady() {


    scripDefaultInit();

    //showWindow("index");
    //showWindow("prihlaseni");
    //showWindow("registrace");
    //showWindow("kalkulace");
    //showWindow("nahravam");
    showWindow("nabidky");
    //showWindow("podrobnosti");
    //showWindow("doplnkove");
    //showWindow("dekujeme");


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
    if(windowName=="doplnkove")
    {
        topTex("Doplňkové informace");
        containerVisibilitySet("doplnkove",true);
        containerVisibilitySet("backButton",true);
    }
    if(windowName=="dekujeme")
    {
        topTex("Děkujeme");
        containerVisibilitySet("dekujeme",true);
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
    showWindow("prihlaseni");
}

function prihlasit()
{
    showWindow("kalkulace");
}