//http://frugalcoder.us/post/2010/02/11/js-classes.aspx
var validator = {
    initAllForms : function() {

    },
    valideForm : function(formID) {

        this.hidelAllErrorMessages(formID);

        var form = $("[data-validace-form="+formID+"]");
        var a = this;
        var isFormValid = true;

        $(form).find("[validate]").each(function() {
            var isValid = true;
            var validace = $(this).attr("validate");
            var inputVal = $(this).val();
            if(validace.length>0)
            {
                isValid = eval("a.val"+validace+"('"+inputVal+"')");
                if(!isValid) {
                    isFormValid = false;
                    a.showErrorMessage(this);
                }

            }


        });

        return isFormValid;
    },
    hidelAllErrorMessages : function(formID) {
        var form = $("[data-validace-form="+formID+"]");
        $(form).find("[validate]").each(function() {
            $(this).next().css("display","none");
        });
    },
    showErrorMessage : function(el){
        $(el).next().css("display","block");
        $(el).addClass("validateError");

    },
        /* validation functions */
    valnotempty : function(v){
        if(v!=undefined)
        {
            if(v.length>0)
            return true;

        }
        return false;
    }
};