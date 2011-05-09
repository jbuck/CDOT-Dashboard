//CDOT Fedora-ARM Build Status Widget
// 

(function() {

  /* Fedora-ARM Widget */

  dashBoard.widget( "fedoraBuildWidget" , function( id, options ){
        
    var tableBorder     = options.border      ? options.border      : 1;
    var tableHeight     = options.height      ? options.height      : "480px";
    var tableWidth      = options.width       ? options.width       : "300px";
    var tableClass      = options.tableClass  ? options.tableClass  : null;
    var cellSpacing     = options.cellSpacing ? options.cellSpacing : 0;
    
    var targetDiv = document.getElementById ( id );

    if (targetDiv.className && options.cssClass) {
      targetDiv.className = targetDiv.className + " " + options.cssClass;
    }
    else if ( options.cssClass ) {
      targetDiv.className = options.cssClass;
    }
    
    var getBuildStatus = function() {
      
      var buildStats = [];
      var icons = { "complete": "icons/success.png", "building": "icons/building.png", "failed": "icons/fail.png", "cancelled": "icons/cancelled.png"};
      
      $.ajax({
        url: "http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&callback=?&q=http://arm.koji.fedoraproject.org/koji/recentbuilds&num=10",
        cache: false,
        dataType: 'json',
        success: function (data) {

          if (!data) {
              return false;
          }
          var response = data.responseData.feed;

          for ( i = 0; i < response.entries.length; i++ ) {
            var entry = response.entries[i];
            var title = entry.title;
            var date = entry.publishedDate;
            var s = title.split( ":", 2 );
            var outcome = s[0];
            var build = s[1].split( ",", 2 )[0];
            if ( date ) {
              date = new Date(date);
            } else {
              date = new Date();
            }
            var s = '<tr height="25px" style="max-height: 25px"><td style="text-align: center; max-height: 25px">' + 
              date.toLocaleString() + '</td><td style="text-align: left; max-height: 25px">' + build +
              '</td><td style="text-align: left; max-height: 25px"><img height="16px" width="16px" src="' + 
              icons[outcome] + '"></img></td></tr>';
            buildStats.push(s);

          }
          targetDiv.innerHTML = "";

          $( '<table/>', {
                html: buildStats.join(''),
                "border"      : tableBorder,
                "height"      : tableHeight,
                "width"       : tableWidth,
                "class"       : tableClass,
                "cellspacing" : cellSpacing
          }).appendTo(targetDiv);
        }
      });
    }
    getBuildStatus();
    window.setInterval ( getBuildStatus, 18000000 );
  });
  
} ());
