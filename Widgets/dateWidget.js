//CDOT dateWidget widget
// 

(function() {

  dashBoard.widget( "dateWidget" , function( id, options ){

    var targetDiv = document.getElementById ( id );
    if(targetDiv.className && options.cssClass) {
      targetDiv.className = targetDiv.className + " " + options.cssClass;
    }

    var days = ["Sun", "Mon" , "Tue", "Wed","Thu","Fri","Sat" ];
    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    var updateTime = function() {
      var now = new Date();
      targetDiv.innerHTML = days[now.getDay()] + " " + months[now.getMonth()] + " " + now.getDate();
    };
    updateTime();
    window.setInterval ( updateTime, 60000);
  });
} ());

