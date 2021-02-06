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
        option.entries = Object.entries(items[i]);
        dropdown.add(option);
        
        
        
        }
    }

    };
    request.send();


function assist(lidar){
    var output = "<h1>" + lidar.options[lidar.selectedIndex].text + "</h1>"; 
    //console.log(lidar.options[lidar.selectedIndex].entries);
    output += "<ul>"
    lidar.options[lidar.selectedIndex].entries.forEach(element => {
        let key = element[0];
        let value  = element[1];
        output += key + ": " + value;
        output += "<br>";
        if(key==="Angular range"){
            angularrange = value;
        }
    });
      
    output += "</ul";
    document.getElementById("update").innerHTML = output;
    

}