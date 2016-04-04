function handleClientLoad(){
	var apiKey = "AIzaSyAKg0vtCZDoEE7zahL0oGEZD7JDp2XK1xg";
	gapi.client.setApiKey(apiKey);
	makeApiCall('108086881826934773478', '1');
	makeApiCall('103846222472267112072', '2');
}

function makeApiCall(userId, nUser){
	gapi.client.load('plus', 'v1', function(){
		var request = gapi.client.plus.people.get({
			'userId': userId
		});
		var userDiv = "user" + nUser;
		request.execute(function(resp){
			var heading = document.createElement('h1');
			var image = document.createElement('img');
			image.src = resp.image.url;
			heading.appendChild(image);
			heading.appendChild(document.createTextNode(resp.displayName));
			document.getElementById(userDiv).appendChild(heading);
		});
		request = gapi.client.plus.activities.list({
			'userId': userId,
			'collection': 'public',
			'maxResults': 15
		});
		request.execute(function(resp){
			var activities = resp.items;
			var html = "";
			var title;
			var long;
			var lat;
			for (var i = 0; i < activities.length; i++){
				if (activities[i].title == ""){
					title = "Activity without title";
				}else{
					title = activities[i].title;
				}
				html += '<li>' + title;
				if (activities[i].location != undefined){
					lat = activities[i].location.position.latitude;
					long = activities[i].location.position.longitude;
					html += "</br>Location:<ul><li>" + lat + "</li><li>" + long + "</li></ul>";
				}
				html += "</li>"
			}
			userDiv = "#" + userDiv;
			$(userDiv).append("<ul>" + html + "</ul>");
		});
	});
}