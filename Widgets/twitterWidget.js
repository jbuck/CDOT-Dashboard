//CDOT twitter widget
// 

(function() {
    dashBoard.widget( "twitterWidget" , function( id, options ){
        var targetDiv = document.getElementById ( id );
        if(targetDiv.className && options.cssClass) {
          targetDiv.className = targetDiv.className + " " + options.cssClass;
        }
        var innerIntervalID = -1;
            
        var Tweet = function () {
              this.img = null;
              this.user = null;
              this.text = null;
              this.date = null;
            },
            tweetIndex = 0;
        
        //Contains the id of the most recent tweet that twitter grabbed for us. This is put into the since_id
        //parameter to cause future update requests to only return new tweets for us
        var lastUpdatePoint = 0;
        
        var updateTweets = function() {
            if (innerIntervalID != -1)
            {
                clearInterval(innerIntervalID);
            }
            //All of the following variables are expected as properties in the options that are passed in
            //ms between calls to refresh the feed -->
            //var refreshInterval=   5000;
            //var results=          50;
            //var showUser=          "true";
            //the tweet string to search for on twitter -->
            //var query=             "@humphd";
            //var headerType=       "h2";
            //var mode= "search" or "timeline";
            
            var jsonurl;
            if (options.mode == "search")
            {
                jsonurl="http://search.twitter.com/search.json?rpp="+options.results
                //+"&show_user="+options.showUser
                +"&q="+escape(options.query);
                
            }
            else
            {
                 //For some reason twitter only returns results-1 tweets in timeline mode.
                jsonurl="http://twitter.com/statuses/user_timeline/" + escape(options.query)
                +".json?count=" + (options.results+1);
            }
            $.getJSON(jsonurl+"&callback=?",{},function(json){
                var newTweets = [];
                if (options.mode == "search"){
                    $.each(json.results, function(i, t){
                        newTweets[i] = new Tweet();
                        newTweets[i].img = t.profile_image_url;
                        newTweets[i].text = t.text;
                        newTweets[i].user = t.from_user;
                        newTweets[i].date = t.created_at;
                    });
                }else{
                    $.each(json, function(i, t){
                        newTweets[i] = new Tweet();
                        newTweets[i].img = t.user.profile_image_url;
                        newTweets[i].text = t.text;
                        newTweets[i].user = options.query;
                        newTweets[i].date = t.created_at;
                    });
                }
                while (targetDiv.hasChildNodes()) targetDiv.removeChild(targetDiv.firstChild);
                var modeString = (options.mode == "search")?"Results for ":"Timeline of ";
                options.headerType && $(targetDiv).append("<"+ options.headerType +">" + modeString + options.query + "</"+options.headerType+">");
                
                var displayTweet = function() {
                  $("#"+id).fadeIn(3000,function(){$("#"+id).fadeOut(7000, function(){});});
                  var userImage = "<img src='" + newTweets[ tweetIndex ].img +"'/>";
                  var userLink;
                  var userDate;
                  if (options.date)
                  {
                    //userDate = "<div id='twitDate'>"+newTweets[tweetIndex].date+"</div>";
                    var dateSplit = newTweets[tweetIndex].date.split(' ');
                    userDate = dateSplit[0] + ' '+dateSplit[1] + ' '+dateSplit[2] + ' '+dateSplit[3]+ ' ';
                  }else{
                    userDate = "";
                  }
                  if (options.image)
                  {
                    userLink = "<a href='http://twitter.com/"+ newTweets[ tweetIndex ].user + "'>" + userImage + "</a>";
                  }else
                  {
                    userLink = newTweets[tweetIndex].user + ": ";
                  }
                  //targetDiv.innerHTML = userLink + userDate + "<div id='twitText'>"+newTweets[ tweetIndex ].text+"</div>";
                  targetDiv.innerHTML = userLink;
                  $(targetDiv).append(userDate +newTweets[ tweetIndex ].text);

                  if ( !newTweets[ ++tweetIndex ] ) {
                    tweetIndex = 0;
                  }
                                  
                };
                displayTweet();

                innerIntervalID = setInterval( displayTweet, options.displayInterval );
            });
        };
        updateTweets();
        if (options.refreshInterval < 50000)
        {
            options.refreshInterval = 50000;
        }
        window.setInterval(updateTweets, options.refreshInterval);
    });
}());
