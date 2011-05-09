// Chart Widget
(function() {

	dashBoard.widget( "chart" , function( id, options ){

	var refresh = function(){

		var tickets, open, title, dueOn, url;
		
		options.project == "Processing" ? url = "http://scotland.proximity.on.ca/sdowne/sqlite/jsonp.php?callback=?&service=lighthouse-processing" :
						  url = "http://scotland.proximity.on.ca/sdowne/sqlite/jsonp.php?callback=?&service=lighthouse-popcorn";

		// JQuery used to get the JSON data from our server, values stored in arrays named accordingly
		$.getJSON(
			url,
			function(json) {
			
				tickets = new Array(json.milestones.length);
				title = new Array(json.milestones.length);
				dueOn = new Array(json.milestones.length);
				open = new Array(json.milestones.length);
				
				for(var i = 0; i < json.milestones.length;i++){
					tickets[i] = json.milestones[i].milestone.tickets_count;
					open[i] = json.milestones[i].milestone.open_tickets_count;
					title[i] = json.milestones[i].milestone.title;
				}

				finished();
		});

			// Callback to be called once all JSON data has been loaded
			function finished(){
				var data = new google.visualization.DataTable();

				// Check to make sure a milestone was entered, if not, default to last milestone
				options.milestone = options.milestone || open.length-1;

				data.addColumn('string', "Project");
				  data.addColumn('number', 'Commits');
				  data.addRows(tickets.length);
				  for(var k = 0;k < tickets.length;k++){
					if(open[k] != 0){
				  	data.setValue(k, 0, title[k]);
					data.setValue(k, 1, tickets[k]);
}
				  }
				 
				// Create and draw the visualization, as well as set all options

				new google.visualization.PieChart(document.getElementById(id)).
				draw(data,{
				width:230, height:230,
				is3D: true,
				title: options.project,
				titleTextStyle: {color:"#FFFFFF", fontSize:24},
				isStacked: true,
				chartArea: {width:"100%"},
				backgroundColor: "#232526",
				gridlineColor: "#232526",
				legend: "bottom",
				legendTextStyle:{color: "#FFFFFF", fontName: "Arial", fontSize:8},
				colors: ['red','green', "orange", "blue", "brown"]
				})
		
		}

				
		setTimeout( refresh, 30000 );
	};
	refresh();
	});
} ());
