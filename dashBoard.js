// create API
(function() {

  this.dashBoard = {};

  dashBoard.widget = function( type, definition ){

    dashBoard[ type ] = function( id, options ) {

      definition.call( dashBoard, id, options );

      return dashBoard;
    };
  };

})();

