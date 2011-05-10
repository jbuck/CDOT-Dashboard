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
			timeNow = options.timeZone == "Mountain" ? new Date(timeNow - 1000 * 60 * 60 *3) : timeNow;	
			var hours   = timeNow.getHours();
			var minutes = timeNow.getMinutes();
			var timeString = "<span class='t-size-x60'>" + ((hours > 12) ? hours - 12 : (hours == 0 ? hours = 12 : hours));
			timeString  += ((minutes < 10) ? ":0" : ":") + minutes + "</span>";
			timeString  += "<span class='t-size-x30'>" + ((hours >= 12) ? " PM" : " AM") + "</span>";
			targetDiv.innerHTML = timeString;
    };
    updateTime();
    window.setInterval ( updateTime, 1000 );
  });
} ());

