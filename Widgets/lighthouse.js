// Lighthouse Widget
(function() {

	dashBoard.widget( "lighthouseWidget" , function( id, options ){

	var refresh = function(){

		var open, closed, title, dueOn;

		// JQuery used to get the JSON data from our server, values stored in arrays named accordingly
		$.getJSON(
			"http://scotland.proximity.on.ca/sdowne/sqlite/jsonp.php?callback=?&service=lighthouse-popcorn",
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
		
		var newdiv, newdivz, width, words, words2, oText, oText2, names = "div" + options.milestone, namez = "divz" + options.milestone;
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
		
		if(open[options.milestone-1] == 0 || closed[options.milestone-1] == 0){
			open[options.milestone-1] == 0 ? width = "100%" : width = "0%";
		}
		else{
			width = (open[options.milestone-1]/(closed[options.milestone-1]+open[options.milestone-1]));
			width = 100 - (width*100) + "%";
		}
		
		words = document.createElement("p");
		words2 = document.createElement("p");
      		words.innerHTML = "<strong><b>" + open[options.milestone-1] + "</b></strong> open tickets";
		words2.innerHTML = "<b><strong>" + closed[options.milestone-1] +  "</strong></b> closed tickets";
		document.getElementById(id).appendChild(words);
		document.getElementById(id).appendChild(words2);

		newdivz.width = "200px";
		newdivz.height = "50px";
		newdivz.align="centre";
		newdivz.style.backgroundColor = "grey";
		newdivz.style.border = "2px solid black";
		newdivz.style.width = "200px";
		newdivz.style.height = "25px";

		newdiv.style.backgroundColor = "green";
		newdiv.style.width = width;
		newdiv.style.height = newdivz.style.height;
		newdiv.innerHTML = "&nbsp;";
		document.getElementById(id).appendChild(newdivz);
		newdivz.appendChild(newdiv);

		newdiv_ = document.createElement("div");
		newdiv_.id = "times" + options.milestone-1;
		document.getElementById(id).appendChild(newdiv_);
				

		if(options.time){
			dashBoard.milestone( newdiv_.id, {
           		what: title[options.milestone-1],
            		when: dueOn[options.milestone-1],
            		gradient: "days"
          	});
		}
				
		setTimeout( refresh, 30000 );
}
	};
	refresh();
	});
} ());
