//CDOT title widget
// 

(function() {
    dashBoard.widget( "titleWidget" , function( id, options ){

        //All of the following variables are expected as properties in the options that are passed in
        //var titleText=          "Our glorious dashboard";
        //var headerType =        "h1";
        console.log(options);
        var targetDiv = document.getElementById ( id );
        if(targetDiv.className && options.cssClass) {
          targetDiv.className = targetDiv.className + " " + options.cssClass;
        }
        $(targetDiv).innerHTML = "";
        $(targetDiv).append("<" + options.headerType + ">" + options.titleText + "</" + options.headerType + ">");
    
    });
} ());