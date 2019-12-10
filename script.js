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

function updateLaunchHeader(launchHead,faulty){
	launchHead.innerText = "Shuttle not ready for launch";
	launchHead.style.color = 'red';
	faulty.style.visibility = "visible";
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
		}

        let launchStatusCheck = document.getElementById("launchStatusCheck");
    	let fuelOkMessage = document.getElementById("fuelStatus");
    	let cargoOkMessage = document.getElementById("cargoStatus");
    	let launchHeader = document.getElementById("launchStatus");
    	let faultyItems = document.getElementById("faultyItems");
		launchHeader.style.color = "initial";
    	faultyItems.style.visibility = "hidden";
    	
    	if (fuelLevel.value < 10000){
    		fuelOkMessage.innerText = "There is not enough fuel for the journey.";
    		updateLaunchHeader(launchHeader,faultyItems);
    	}
    	if (cargoMass.value > 10000){
    		cargoOkMessage.innerText = "There is too much mass for the shuttle to take off.";
    		updateLaunchHeader(launchHeader,faultyItems);
    	}
    	
    	launchStatusCheck.innerHTML = `
    		<h2 id="launchStatus"></h2>
            <div id="faultyItems">
                <ol>
                    <li id="pilotStatus">Pilot ${pilotName.value} Ready</li>
                    <li id="copilotStatus">Co-pilot ${copilotName.value} Ready</li>
                    <li id="fuelStatus">${fuelOkMessage}</li>
                    <li id="cargoStatus">${cargoOkMessage}</li>
                </ol>
            </div>
    	`;
        
        e.preventDefault();
    	console.log(fuelOkMessage.innerText,cargoOkMessage.innerText,launchHeader.innerText, launchHeader.style.color, faultyItems.style.visibility);
        
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
    });
});