//CDOT clockWidget widget
// 

(function() {

  dashBoard.widget( "clockWidget" , function( id, options ){

    var targetDiv = document.getElementById ( id );
    if(targetDiv.className && options.cssClass) {
      targetDiv.className = targetDiv.className + " " + options.cssClass;
    }
    
    var updateTime = function() {
      var now = new Date();
      targetDiv.innerHTML = now.toLocaleTimeString();
    };

    window.setInterval ( updateTime, 1000 );
  });
} ());

