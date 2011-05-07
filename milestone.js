(function() {

  var gradients = {

    time: function( diff ) {

      var weeks = 0,
          days = 0,
          hours = 0,
          minutes = 0,
          seconds = 0,
          milliseconds = 0;

      //return this.weeks( diff ) + ":" + this.days( diff ) + ":" + this.hours( diff ) + ":" + this.minutes( diff ) + ":" + this.seconds( diff ) + ":" + this.milliseconds( diff );
    },
    weeks: function( diff ) {

      return Math.floor( diff / 604800000 );
    },
    days: function( diff ) {

      return Math.floor( diff / 86400000 );
    },
    hours: function( diff ) {

      return Math.floor( diff / 3600000 );
    },
    minutes: function( diff ) {

      return Math.floor( diff / 60000 );
    },
    seconds: function( diff ) {

      return Math.floor( diff / 1000 );
    },
    milliseconds: function( diff ) {

      return Math.floor( diff );
    },
  };

  dashBoard.widget( "milestone", function( id, options ){

    var today = new Date(),
        milestone = new Date( options.when );

    options.gradient = options.gradient || "time";

    setInterval( function() {
		if(milestone.getTime() - new Date().getTime() > 0)
      document.getElementById( id ).innerHTML = options.gradient + " until " + options.what + ": " + gradients[ options.gradient ]( milestone.getTime() - new Date().getTime() );
    else
			document.getElementById( id ).innerHTML = options.gradient + " until " + options.what + ": " + "Complete!";
		}, 1);
  });

})();

