//CDOT Fedora-ARM Build Status Widget
// 

(function() {
  dashBoard.widget( "fedoraBuildWidget" , function( id, options ){
    var targetDiv = document.getElementById ( id );
    if (targetDiv.className && options.cssClass) {
      targetDiv.className = targetDiv.className + " " + options.cssClass;
    }
    else if (options.cssClass) {
      targetDiv.className = options.cssClass;
    }
    var tableBorder     = options.border      ? options.border      : 0;
    var tableHeight     = options.height      ? options.height      : "480px";
    var tableWidth      = options.width       ? options.width       : "300px";
    var tableClass      = options.tableClass  ? options.tableClass  : null;
    var cellSpacing     = options.cellSpacing ? options.cellSpacing : 0;
    var getBuildStatus = function() {
      var buildStats = [];
      var states = { "complete": "green", "building": "yellow", "failed": "red", "cancelled": "orange"};
      $.jGFeed('http://arm.koji.fedoraproject.org/koji/recentbuilds', function (response) {
        if (!response) {
            alert("Error");
            return false;
        }
        for ( i = 0; i < response.entries.length; i++ ) {
          var title = response.entries[i].title;
          var outcome = title.split( ":", 2 )[0];
          var build = title.split( ":", 2 );
          build = build[1].split( ",", 2 )[0];
          buildStats.push( '<tr><td style="text-align: center; min-height: 30px; background: ' + states[outcome] + '">' + build + '</td></tr>');
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
      },10);
    }
    getBuildStatus();
    window.setInterval ( getBuildStatus, 120000 );
  });
} ());
