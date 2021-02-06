var angularrange = 360;

document.getElementById("lidar1").onclick = function(){

    var request;

		if(window.XMLHttpRequest){
			request = new XMLHttpRequest();
		}
		else {
			request = new  ActiveXObject("Microsoft.XMLHTTP");
        }
        request.open('GET','data.json');

    request.onreadystatechange = function(){
        if((request.readyState === 4) && (request.status === 200)){
            var items = JSON.parse(request.responseText);
            var output = "<h1>" + items[0].name + "</h1>"; 
            output += "<ul>";
            output += "ACCURACY:" + "<li>" + items[0].Accuracy + "</li>" + "<br>";
            output += "DETECTION DISTANCE:" + "<li>" + items[0].DetectionDistance + "</li>" + "<br>";
            output += "Scanning Frequency" + "<li>" + items[0].scanningfrequency + "</li>" + "<br>";
            output += "</ul>";
            document.getElementById("update").innerHTML = output;
            angularrange = items[0].Angularrange;
            
        }
    };
    request.send();
}

