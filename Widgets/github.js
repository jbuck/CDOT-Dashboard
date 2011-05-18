( function() {
  dashBoard.widget( "githubWidget", function (id, options) {

    var userId =  options.userId,
    projectName = options.projectName,
    branchName = options.branchName || "master";
    
    $.getJSON( "fakedata/github-" + projectName + ".json", function(result) {
      var commits = result.commits,
                i = 0,
        targetDiv = document.getElementById(id);
      
      targetDiv.innerHTML = '<h2 class="t-muted">Wed May 18 2011</h2>';
      var targetList = document.createElement("ul");
      //targetList.addClass('navlist');
      targetDiv.appendChild(targetList);
      
      for (i = 0; i < 8; i++) {
        var li = document.createElement("li");
        li.innerHTML = "<span class='t-muted-more'>" + commits[i].author.name + ":</span> <span> " + commits[i].message + "</span>";
        targetList.appendChild(li);
      }

    });
  });
}());
