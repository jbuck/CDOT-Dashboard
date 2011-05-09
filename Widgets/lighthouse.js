// Lighthouse Widget
(function() {

	dashBoard.widget( "lighthouseWidget" , function( id, options ){

		var open, closed, title, dueOn;

		// JQuery used to get the JSON data from our server, values stored in arrays named accordingly
		$.getJSON(
			"http://scotland.proximity.on.ca/sdowne/sqlite/jsonp.php?callback=?&service=lighthouse",
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
		
		dashBoard.milestone( options.timeDiv, {
            what: title[options.milestone-1],
            when: dueOn[options.milestone-1],
            gradient: "days"
          });
			
			// Create new Google Visualization data table
			var data = new google.visualization.DataTable();				
				
			// Check to make sure a milestone was entered, if not, default to last milestone
			options.milestone = options.milestone || open.length-1;
				
			// Store the data for all the open and closed tickets
			var raw_data = [['Open Tickets', open[options.milestone-1]],
											['Closed Tickets', closed[options.milestone-1]]];
				
			data.addColumn('string', 'Ticket');
			
			for (var i = 0; i  < raw_data.length; ++i) {
				data.addColumn('number', raw_data[i][0]);    
			}   
  
			data.addRows(1);
				
			// Set the values for all the ticket data
			for (var i = 0; i  < raw_data.length; ++i) {
				for (var j = 1; j  < raw_data[i].length; ++j) {
					data.setValue(j-1, i+1, raw_data[i][j]);    
				}
			}
 
			// Create and draw the visualization, as well as set all options
			
			new google.visualization.BarChart(document.getElementById(id)).
			draw(data,{
				width:400, height:200,
				title: 					 "Milestone: " + title[options.milestone-1],
				titleTextStyle:	 {color:"#000000", fontSize:24},
				isStacked: 			 true,
				chartArea:			 {width:"100%"},
				showValueLabels: false,
				backgroundColor: "#FFFFFF",
				gridlineColor:   "#FFFFFF",
				hAxis:					 {baselineColor: "#FFFFFF", textStyle:{color:"#FFFFFF"}},
				legend: 				 "none",
				vAxis:					 {baselineColor: "#FFFFFF"},
				colors:					 ['red','green']
			})
		}
	});
} ());