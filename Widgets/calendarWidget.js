//CDOT Calendar Widget
// 

(function() {

  /* Calendar Widget */

  dashBoard.widget( "calendarWidget" , function( id, options ){
    if (!options.data || !id) { 
      return false;
    }

    var data = options.data;

    var pageLen = options.pageLength ? options.pageLength : 5;

    var targetDiv = document.getElementById ( id );

    if (targetDiv.className && options.cssClass) {
      targetDiv.className = targetDiv.className + " " + options.cssClass;
    }
    else if ( options.cssClass ) {
      targetDiv.className = options.cssClass;
    }
    
    var list = [];
    var pages = Math.ceil(data.length / pageLen);
    for (var i = 0, j = 0; i < pages ; i++){ 
      list.push('<dl class="' + id +'" id="calSeq' + i + '" style="display: none" >');
      for (var k = 0; j < data.length && k < pageLen; k++, j++) {
        var s = "";
        var entry = data[j];        
        s += '<dt>' + entry.date + '</dt><dd>' + entry.text + '</dd>';
        list.push(s);
      }
      list.push('</dl>');
    }
    $('<div/>', {
      html: list.join('')
    }).appendTo(targetDiv);

    document.getElementById("calSeq0").style.display = "inline";

    options.callback && options.callback();
  });
  
} ());
