//CDOT dateWidget widget
// 

(function() {

  dashBoard.widget( "dateWidget" , function( id, options ){

    var targetDiv = document.getElementById ( id );
    if(targetDiv.className && options.cssClass) {
      targetDiv.className = targetDiv.className + " " + options.cssClass;
    }

    var days = ["Sunday", "Monday" , "Tuesday", "Wednesday","Thursday","Friday","Saturday" ];
    var months = ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    var updateTime = function() {
      var now = new Date();
			now = options.timeZone == "Mountain" ? new Date(now-3600000*2) : now;
      targetDiv.innerHTML = days[now.getDay()] + " " + months[now.getMonth()] + " " + now.getDate() + " " + now.getFullYear();
    };
    updateTime();
    window.setInterval ( updateTime, 60000);
  });
} ());

