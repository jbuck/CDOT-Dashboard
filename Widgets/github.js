( function() {
  dashBoard.widget( "githubWidget", function (id, options) {

    var userId =  options.userId,
    projectName = options.projectName,
    branchName = options.branchName || "master";

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
    // $.ajax({
    // type: "GET",
    // url: "http://github.com/api/v2/json/repos/show/jbuck/" + projectName + "/contributors",
    // dataType: "json",
    // success: function(result) {
    // var contributors =  result.contributors,
    // arrayIdx;
    // $('#githubContributors').append('<h1> ' + projectName + ' Contributors');
    // for (arrayIdx = 0; arrayIdx < contributors.length; arrayIdx++) {
    // var contributor = contributors[arrayIdx];
    // if (contributor.login !== "invalid-email-address") {
    // $('#githubContributors').append('<p>' + contributor.name + '</p>');
    // }
    // }
    // }
    // });

    $.ajax({
      type: "GET",
      url: "http://github.com/api/v2/json/commits/list/" + userId + "/" + projectName + "/" + branchName,
      dataType: "json",
      success: function(result) {
        var commits = result.commits,
        uniqueDates = commits.arrayForKey('committed_date', normalizeDate).unique(),
        arrayIdx;

        $('#' + id).append('<h1>Recent Commits</h1>').append('<p><b>' + commits.length + ' commits</b></p>');

        for(arrayIdx = 0; arrayIdx < uniqueDates.length; arrayIdx += 1) {
          var targetDiv = $('<div id="' + uniqueDates[arrayIdx].getTime() + '">');
          //targetDiv.addClass('oneDayOfCommits');
          $('#' + id).append(targetDiv);
          targetDiv.append('<h2>' + uniqueDates[arrayIdx].toDateString() + '</h2>');
          targetDiv.addClass('navcontainer');
          targetDiv.append('<ul class="navlist"></ul>');
          targetDiv.addClass(id);
          targetDiv.addClass('scroll');
        }

        // call the callback function if it is specified
        options.callback && options.callback();

        for(arrayIdx = 0; arrayIdx < commits.length; arrayIdx += 1) {
          var commit =  commits[arrayIdx],
          committedDate = normalizeDate(commit.committed_date);
          $('#' + committedDate.getTime() + '> ul').append('<li>' + commit.author.name + ' committed with message "' + commit.message + '"</li>');
        }
      }
    });
  });
}());