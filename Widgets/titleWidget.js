//CDOT title widget
// 

(function() {
    dashBoard.widget( "clockWidget" , function( id, options ){

        //All of the following variables are expected as properties in the options that are passed in
        //var titleText=          "Our glorious dashboard";
        //var headerType =        "h1";
    
        var targetDiv = $(id);
        if(targetDiv.className && options.cssClass) {
          targetDiv.className = targetDiv.className + " " + options.cssClass;
        }
        $(targetDiv).innerHTML = "";
        $(targetDiv).append("<" + options.headerType + ">" + options.titleText + "</" + options.headerType + ">");
    
    });
} ());