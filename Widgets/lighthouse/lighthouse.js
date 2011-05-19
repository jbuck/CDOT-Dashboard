// Lighthouse Widget
(function() {

	dashBoard.widget( "lighthouseWidget" , function( id, options ){

	var refresh = function(){

		var open, closed, title, dueOn, url;
		
		options.project == "Processing" ? url = "http://scotland.proximity.on.ca/sdowne/sqlite/jsonp.php?callback=?&service=lighthouse-processing" :
						  url = "http://scotland.proximity.on.ca/sdowne/sqlite/jsonp.php?callback=?&service=lighthouse-popcorn";

		// JQuery used to get the JSON data from our server, values stored in arrays named accordingly
		$.getJSON(
			url,
			function(json) {
			
				open = new Array(json.milestones.length);
				closed = new Array(json.milestones.length);
				title = new Array(json.milestones.length);
				dueOn = new Array(json.milestones.length);
				
				for(var i = 0; i < json.milestones.length;i++){
					dueOn[i] = json.milestones[i].milestone.due_on;
					title[i] = json.milestones[i].milestone.title;
					open[i] = json.milestones[i].milestone.open_tickets_count;
					closed[i] = json.milestones[i].milestone.tickets_count - json.milestones[i].milestone.open_tickets_count;
				}

				finished();
		});

		// Callback to be called once all JSON data has been loaded
		function finished(){
		
		var newdiv, newdivz, newdiv_, width, words, wordz, words2, oText, oText2, names = "div" + options.milestone, namez = "divz" + options.milestone;
		if(!document.getElementById(names)){
			newdiv = document.createElement('div');
			newdivz = document.createElement('div');
			newdivz.id = "divz" + options.milestone;
			newdiv.id = "div" + options.milestone;
		}
		else{
			newdiv.id = names;
			newdivz.id = namez;
		}
		
		if(open[options.milestone] == 0 || closed[options.milestone] == 0){
			open[options.milestone] == 0 ? width = "100%" : width = "0%";
		}
		else{
			width = (open[options.milestone]/(closed[options.milestone]+open[options.milestone]));
			width = 100 - (width*100) + "%";
		}
		
		wordz = document.createElement("p");
		wordz.innerHTML = "<p>"+ title[options.milestone] + "</p><p>"+Math.round(closed[options.milestone]/(open[options.milestone]+closed[options.milestone])*100) + "% complete</p>";
		
		words = document.createElement("p");
		words2 = document.createElement("p");
      		words.innerHTML = "<span class='t-negative'>" + open[options.milestone] + "</span> open tickets";
		words2.innerHTML = "<span class='t-positive'>" + closed[options.milestone] +  "</span> closed tickets";
		document.getElementById(id).appendChild(wordz);
		document.getElementById(id).appendChild(words);
		document.getElementById(id).appendChild(words2);


		newdivz.width = "200px";
		newdivz.height = "50px";
		newdivz.align="centre";
		newdivz.style.backgroundColor = "grey";
		newdivz.style.border = "2px solid black";
		newdivz.style.width = "200px";
		newdivz.style.height = "25px";

		newdiv.style.backgroundColor = "#77AB13";
		newdiv.style.width = width;
		newdiv.style.height = newdivz.style.height;
		newdiv.innerHTML = "&nbsp;";
		document.getElementById(id).appendChild(newdivz);
		newdivz.appendChild(newdiv);

		newdiv_ = document.createElement("div");
		newdiv_.id = "times" + options.milestone;

		if(options.time){
			dashBoard.milestone( newdiv_.id, {
            		when: dueOn[options.milestone],
            		gradient: "Days"
          	});
		}

		document.getElementById(id).appendChild(newdiv_);
				
		setTimeout( refresh, 30000 );
}
	};
	refresh();
	});
} ());
