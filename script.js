// Write your JavaScript code here!

/* This block of code shows how to format the HTML once you fetch some planetary JSON!
<h2>Mission Destination</h2>
<ol>
   <li>Name: ${}</li>
   <li>Diameter: ${}</li>
   <li>Star: ${}</li>
   <li>Distance from Earth: ${}</li>
   <li>Number of Moons: ${}</li>
</ol>
<img src="${}">
*/
function validateBeforeSubmit(pilot,copilot,fuel,cargo){
    if (pilot.value === "" || copilot.value === "" || fuel.value === "" || cargo.value === "") {
        alert("All fields are required!");
        return true;
    } else if (isNaN(cargo.value) || isNaN(fuel.value) || !isNaN(copilot.value)|| !isNaN(pilot.value)){
        alert("Make sure to enter valid information for each field!");
        return true;
    }
    return false;
}

window.addEventListener("load", function(){
	let form = document.querySelector("form");
	form.addEventListener("submit", function(e) {
        let pilotName = document.querySelector("input[name=pilotName]");
	    let copilotName = document.querySelector("input[name=copilotName]");
	    let fuelLevel = document.querySelector("input[name=fuelLevel]");
	    let cargoMass = document.querySelector("input[name=cargoMass]");
        let badInput = validateBeforeSubmit(pilotName,copilotName,fuelLevel,cargoMass);
        if (badInput){
            e.preventDefault();
        } else {
            let fetchURL = fetch("https://handlers.education.launchcode.org/static/planets.json");
            fetchURL.then(function(response){
                response.json().then(function(json){
                    const missionTargetDiv = document.getElementById("missionTarget");
                    let destinationIndex = Math.floor(Math.random()*json.length);
                    missionTargetDiv.innerHTML = `
                        <h2>Mission Destination</h2>
                            <ol>
                               <li>Name: ${json[destinationIndex].name}</li>
                               <li>Diameter: ${json[destinationIndex].diameter}</li>
                               <li>Star: ${json[destinationIndex].star}</li>
                               <li>Distance from Earth: ${json[destinationIndex].distance}</li>
                               <li>Number of Moons: ${json[destinationIndex].moons}</li>
                            </ol>
                            <img src="${json[destinationIndex].image}">
                    `;
                });
            });
        }

        function updateLaunchHeader(launchHead,faulty){
            launchHead.innerText = "Shuttle not ready for launch";
            launchHead.style.color = "red";
            faulty.style.visibility = "visible";
        }
        function resetLaunchHeader(launchHead,faulty){
            launchHead.innerText = "Awaiting Information Before Launch";
            launchHead.style.color = "initial";
            faulty.style.visibility = "hidden";
        }

    	let fuelOkMessage = document.getElementById("fuelStatus");
    	let cargoOkMessage = document.getElementById("cargoStatus");
    	let launchHeader = document.getElementById("launchStatus");
    	let faultyItems = document.getElementById("faultyItems");
        let pilotStatus = document.getElementById("pilotStatus");
        let copilotStatus = document.getElementById("copilotStatus");

        // resets values and formatting each time form is submitted w/o refreshing page
        resetLaunchHeader(launchHeader,faultyItems);

        if (fuelLevel.value < 10000){
    		fuelOkMessage.innerText = "There is not enough fuel for the journey.";
    		updateLaunchHeader(launchHeader,faultyItems);
    	} else {
            fuelOkMessage.innerText = "Fuel level high enough for launch";
        }
    	if (cargoMass.value > 10000){
    		cargoOkMessage.innerText = "There is too much mass for the shuttle to take off.";
    		updateLaunchHeader(launchHeader,faultyItems);
    	} else {
            cargoOkMessage.innerText = "Cargo mass low enough for launch";
        }
    	
        pilotStatus.innerText = `Pilot ${pilotName.value} Ready`;
        copilotStatus.innerText = `Co-pilot ${copilotName.value} Ready`;
        e.preventDefault();
    });
});