// PLUGIN: Google Feed
(function () {

  
  dashBoard.widget( "blogFeed" , function( options ) {
    // create a new div and append it to the parent div so nothing
    // that already exists in the parent div gets overwritten
    var newdiv = document.createElement( "div" );
    newdiv.id = "_feed";
    newdiv.style.width = "100%";
    newdiv.style.height = "100%";

    if ( document.getElementById( options.target ) ) {
      document.getElementById( options.target ).appendChild( newdiv );
    }

    var initialize = function() {
      // Create the feed control using the user entered url and title
      new GFdynamicFeedControl( options.url, newdiv, {
        vertical: options.orientation.toLowerCase() == "vertical" ? true : false,
        horizontal: options.orientation.toLowerCase() == "horizontal" ? true : false,
        title: options.title = options.title || "Blog"
      });
      
    };
    
    initialize();
    
  });
  
})( );
