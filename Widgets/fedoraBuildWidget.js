//CDOT Fedora-ARM Build Status Widget
// 

(function() {
  
  var machines = {
    "0": {"name": "gnome-do-0.8.3.1-1.fc13", "state": "1"},
    "1": {"name": "gcc-4.5.1-4.fc14", "state": "2"},
    "2": {"name": "binutils-2.20.51.0.7-8.fc14", "state": "2"},
    "3": {"name": "xorg-x11-drv-omapfb-0.1.1-1", "state": "1"},
    "4": {"name": "binutils-2.20.51.0.7-4.fc14", "state": "3"},
    "5": {"name": "asio-1.4.1-2.fc13", "state": "2"},
    "6": {"name": "libtool-2.2.10-3.fc14", "state": "1"},
    "7": {"name": "espeak-1.43-2.fc13", "state": "2"},
    "8": {"name": "glibc-2.12.90-17", "state": "3"},
    "9": {"name": "empathy-2.30.1-2.fc13", "state": "1"},
    "10": {"name": "elfutils-0.152-1.fc14", "state": "1"},
    "11": {"name": "gnome-do-0.8.3.1-1.fc13", "state": "3"}
  };

  dashBoard.widget( "fedoraBuildWidget" , function( id, options ){

    var targetDiv = document.getElementById ( id );

    if(targetDiv.className && options.cssClass) {
      targetDiv.className = targetDiv.className + " " + options.cssClass;
    }
    else if (options.cssClass) {
      targetDiv.className = options.cssClass;
    }

    var tableBorder     = options.border     ? options.border     : 0;
    var tableHeight     = options.height     ? options.height     : "480px";
    var tableWidth      = options.width      ? options.width      : "300px";
    var tableClass      = options.tableClass ? options.tableClass : null;
    
    var getBuildStatus = function() {
      var items = [];
      var states = { "1": "green", "2": "yellow", "3": "red"};

      //for (var r = 0, i = 0; r < 3 && machines[i]; r++ ){
        //items.push('<tr>');
        for (var c = 0; c < 12 && machines[c]; c++){
          items.push('<tr><td style="text-align: center; min-height: 30px; background: ' + states[machines[c].state] + '">' + machines[c].name + '</td></tr>');
        }
        //items.push('</tr>');
      //}

      $('<table/>', {
        html: items.join(''),
        "border" : tableBorder,
        "height" : tableHeight,
        "width"  : tableWidth,
        "class"  : tableClass
      }).appendTo(targetDiv);        

    }
    getBuildStatus();
    //window.setInterval ( getBuildStatus, 1000 );
  });
} ());

