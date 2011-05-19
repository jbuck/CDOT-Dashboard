//CDOT Fedora-ARM Build Status Widget
// 

(function() {

  /* Fedora-ARM Widget */

  dashBoard.widget( "fedoraBuildWidget" , function( id, options ){
        
    var tableBorder     = options.border      ? options.border      : 0;
    var tableHeight     = options.height      ? options.height      : "430px";
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
      var icons = { "complete": "Widgets/icons/success.png", "building": "Widgets/icons/building.png", "failed": "Widgets/icons/fail.png", "canceled": "Widgets/icons/fail.png"};
      
      $.ajax({
        url: "http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&callback=?&q=http://arm.koji.fedoraproject.org/koji/recentbuilds&num=12",
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
            var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            var dateString = months[date.getMonth()] + " " + date.getDate() + " ";
            dateString = dateString + (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":";
            dateString = dateString + (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes());
            var s = '<tr><td>' + 
              dateString + '</td><td style="text-align: left;"><a href="' + entry.link + '">' + build + '</a>' +
              '</td><td ><img height="16px" width="16px" src="' + 
              icons[outcome] + '"></img></td></tr>';
            buildStats.push(s);

          }
          targetDiv.innerHTML = "";

          $( '<table/>', {
                html: buildStats.join(''),
                "class"       : tableClass,
          }).appendTo(targetDiv);
        }
      });
    };
    getBuildStatus();
    window.setInterval ( getBuildStatus, 18000000 );
  });
  
} ());
