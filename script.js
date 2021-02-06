var angularrange = 360;
let dropdown = document.getElementById("lidar");
dropdown.length = 0;

let defaultOption = document.createElement('option');
defaultOption.text = 'Choose Lidar Type';
dropdown.add(defaultOption);
dropdown.selectedIndex = 0;

var request;

request = new XMLHttpRequest();

request.open('GET','data.json');
request.onreadystatechange = function(){
    if((request.readyState === 4) && (request.status === 200)){
        var items = JSON.parse(request.responseText);
        let option;
        
        for(let i=0;i<items.length;i++){
        option = document.createElement('option');
        option.text = items[i].name;
        option.value = items[i].name;
        option.frequency = items[i].scanningfrequency;
        option.angularrange = items[i].Angularrange;
        option.angleresolution = items[i].Angularresolution;
        option.accuracy = items[i].Accuracy;
        option.detectiondistance = items[i].DetectionDistance;
        dropdown.add(option);
        
        }
    }

    };
    request.send();


function assist(lidar){
    var output = "<h1>" + lidar.options[lidar.selectedIndex].text + "</h1>"; 
    output += "<ul>";
    output += "ACCURACY:" + "<li>" + lidar.options[lidar.selectedIndex].accuracy + "</li>" + "<br>";
    output += "DETECTION DISTANCE:" + "<li>" + lidar.options[lidar.selectedIndex].detectiondistance + "</li>" + "<br>";
    output += "Scanning Frequency" + "<li>" + lidar.options[lidar.selectedIndex].frequency + "</li>" + "<br>";
    output += "</ul>";
    document.getElementById("update").innerHTML = output;
    angularrange = lidar.options[lidar.selectedIndex].angularrange;
            

}