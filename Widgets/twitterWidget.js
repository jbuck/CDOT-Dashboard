//CDOT twitter widget
// 

(function() {
    dashBoard.widget( "twitterWidget" , function( id, options ){
        var targetDiv = document.getElementById ( id );
        if(targetDiv.className && options.cssClass) {
          targetDiv.className = targetDiv.className + " " + options.cssClass;
        }
            
        var Tweet = function () {
            this.img = null;
            this.user = null;
            this.text = null;
        }
        var tweets = [];
        var newTweets = [];
        
        //Contains the id of the most recent tweet that twitter grabbed for us. This is put into the since_id
        //parameter to cause future update requests to only return new tweets for us
        var lastUpdatePoint = 0;
        
        var updateTweets = function() {
            //All of the following variables are expected as properties in the options that are passed in
            //ms between calls to refresh the feed -->
            //var tweetRefreshInterval=   5000;
            //var tweetsPerPage=          50;
            //var tweetPageNumber=        1;
            //var tweetShowUser=          "true";
            //the tweet string to search for on twitter -->
            //var tweetQuery=             "@humphd";
            
            // the actual json url -->
            var url="http://search.twitter.com/search.json?rpp="+options.tweetsPerPage+"&since_id="+options.lastUpdatePoint+"&show_user="+options.tweetShowUser+"&page="+options.tweetPageNumber+"&q=";
            url+=options.tweetQuery;
            $.getJSON(url,function(json){
                // by putting the max update id of the current set of tweets into the since_id parameter we avoid-->
                // getting any duplicate tweets on future refreshes -->
                lastUpdatePoint = json.max_id_str;
                newTweets = [];
                $.each(json.results, function(i, t){
                    newTweets[i] = new Tweet();     
                    newTweets[i].img = t.profile_image_url;
                    newTweets[i].text = t.text;
                    newTweets[i].user = t.from_user;
                    tweets.push(newTweets[i]);
                });
                // Get rid of tweets that won't be shown -->
                for (var currentIndex = options.tweetsPerPage; currentIndex < tweets.length; currentIndex++)
                {
                    tweets.pop();
                }
                $(targetDiv).innerHTML = "";
                $(targetDiv).append("<h2>Showing tweets related to " + options.tweetQuery + "</h2></br>");
                
                $.each(tweets, function(tweetIndex,currentTweet){
                    if (tweetIndex < options.tweetsPerPage)
                    {
                        var userImage = "<img src='" + currentTweet.img +"'/>";
                        var userLink = "<a href='http://twitter.com/"+ currentTweet.user + "'>" + userImage + "</a>";
                        $(targetDiv).append(userLink + currentTweet.text + "<br/>");
                    }
                });
            });
        };
        updateTweets()
        //window.setInterval(updateTweets, options.tweetRefreshInterval);
    });
}());