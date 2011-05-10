// PLUGIN: Google Feed
(function () {

  
  dashBoard.widget( "blogReaderWidget" , function( options ) {
    // create a new div and append it to the parent div so nothing
    // that already exists in the parent div gets overwritten
    var newdiv = document.createElement( "div" );
    newdiv.id = "_feed";
    newdiv.style.width = "100%";
    newdiv.style.height = "430px";

    if ( document.getElementById( options.target ) ) {
      document.getElementById( options.target ).appendChild( newdiv );
    }

    var initialize = function() {
      // Create the feed control using the user entered url and title
      
      var gf = new GFdynamicFeedControl( options.url, newdiv, {
        vertical: options.orientation.toLowerCase() == "vertical" ? true : false,
        horizontal: options.orientation.toLowerCase() == "horizontal" ? true : false,
        numResults: 10,
        displayTime: 10 * 1000,
        scrollOnFadeOut: false,
        pauseOnHover: false
      });  
      
      /*
      var setHeight = function() { 
        var d = document.getElementsByClassName('gfg-entry');
        if (d.length == 0) {
          setTimeout(function() { 
            setHeight();
          }, 5);
        } else {
          d[0].style.height = "270px";       
        }
      }
      setHeight();
      */
    };
    
    initialize();
    
  });
  
})( );
