//CDOT clockWidget widget
// 

(function() {

  dashBoard.widget( "clockWidget" , function( id, options ){

    var targetDiv = document.getElementById ( id );
    if(targetDiv.className && options.cssClass) {
      targetDiv.className = targetDiv.className + " " + options.cssClass;
    }
    
    var updateTime = function() {
			var timeNow = new Date();
			timeNow = options.timeZone == "Mountain" ? new Date(timeNow - 3600000*2) : timeNow;	
			var hours   = timeNow.getHours();
			var minutes = timeNow.getMinutes();
			var timeString = "" + ((hours > 12) ? hours - 12 : (hours == 0 ? hours = 12 : hours));
			timeString  += ((minutes < 10) ? ":0" : ":") + minutes;
			timeString  += (hours >= 12) ? " PM" : " AM";
			targetDiv.innerHTML = timeString;
    };
    updateTime();
    window.setInterval ( updateTime, 1000 );
  });
} ());

