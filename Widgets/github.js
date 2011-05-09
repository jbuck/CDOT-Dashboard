// Github integration
// By Mohammed Buttu

$( 
  function() { 
  var projectName = "CDOT-Dashboard";
      
  Array.prototype.unique = function () {
    var objects = {}, 
        length = this.length,
        result = [],
        arrayIdx;
    
    for (arrayIdx = 0; arrayIdx < length; arrayIdx++) {
      objects[this[arrayIdx]] = this[arrayIdx];
    }
    for (arrayIdx in objects) {
      result.push(objects[arrayIdx]);
    }
    return result;
  };
  
  Array.prototype.arrayForKey = function(key, func) {
    var result = [],
        length = this.length,
        arrayIdx;
        
    for (arrayIdx = 0; arrayIdx  < length; arrayIdx++) {
      result.push(this[arrayIdx][key]);
    }
    
    if (typeof func === 'function') {
      for (arrayIdx = 0; arrayIdx < result.length; arrayIdx++) {
        result[arrayIdx] = func(result[arrayIdx]);
      }
    }
    
    return result;
  };
  
  var normalizeDate = function(inDate) {
    var date = typeof inDate === 'Date' ? inDate : new Date(inDate);
    return new Date(date.getFullYear(), date.getMonth(), date.getDay(), 0, 0, 0, 0);
  }
  
  $.ajax({
      type: "GET",
      url: "http://github.com/api/v2/json/repos/show/jbuck/" + projectName + "/contributors",
      dataType: "json",
      success: function(result) {
        var contributors = result.contributors;
        $('#githubContributors').append('<h1> ' + projectName + ' Contributors');
        for (var arrayIdx = 0; arrayIdx < contributors.length; arrayIdx++) {
          var contributor = contributors[arrayIdx];
          if (contributor.login !== "invalid-email-address") {
            $('#githubContributors').append('<p>' + contributor.name + '</p>');
          }
        }
      }
    });
    
    $.ajax({
      type: "GET",
      url: "http://github.com/api/v2/json/commits/list/jbuck/CDOT-Dashboard/master",
      dataType: "json",
      success: function(result) {
        var commits = result.commits;
        var uniqueDates = result.commits.arrayForKey('committed_date', normalizeDate).unique();
        var arrayIdx;
        
        $('#githubStatus').append('<h1>Recent Commits</h1>').append('<p><b>' + commits.length + ' commits</b></p>');
        
        for(arrayIdx = 0; arrayIdx < uniqueDates.length; arrayIdx++) {
          var targetDiv = $('<div id="' + uniqueDates[arrayIdx].getTime() + '">');
          targetDiv.addClass('oneDayOfCommits');
          targetDiv.appendTo('body');
          targetDiv.append('<h2>' + uniqueDates[arrayIdx].toDateString() + '</h2>');
        }

        for(arrayIdx = 0; arrayIdx < commits.length; arrayIdx++) {
          var commit = commits[arrayIdx];
          var committedDate = normalizeDate(commit.committed_date);
          $('#' + committedDate.getTime()).append('<p><b>' + commit.author.name + '</b> committed with message "' + commit.message + '"</p>');
        }
      }
    });
  }
);
