

const app = document.getElementById('app');
// I chose the NBA-teams 
const API_BASE = 'https://www.balldontlie.io/api/v1/teams';

// I initializeג globals to know what are the chosen values Of filter and sort and later I sorted and filtered by them/
let chosenSort = "a-z";
let chosenFilter = "all";

// rendring the App
const data = await getData();
await renderUI(data);


//The user clicked on sort drop box
const dataSort = document.getElementById("data-sort");
dataSort.addEventListener("change", async (event) => {
  console.log("Data Sort Change");
  chosenSort = event.target.value;
  const myData = await getData();
  const sortedData = sortData(myData, event.target.value);
  const filteredData = filterData(sortedData, chosenFilter);
  clearUI();
  await renderUI(sortedData);
})

//The user clicked on filter drop box
const dataFilter = document.getElementById("data-filter");
dataFilter.addEventListener("change", async (e) => {
  console.log("Data Filter Change");
  console.log(e.target.value);
  chosenFilter = e.target.value;
  const data = await getData();
  const sortedData = sortData(data, chosenSort);
  const filteredData = filterData(sortedData, e.target.value);
  clearUI();
  await renderUI(filteredData);
})


//fatch the data
async function getData() {
  const response = await fetch(API_BASE);
  let data = await response.json();
  return data;
}


//sorting the teams data acording to 2 keys  

function sortData(data, key) {
  data.data = data.data.sort((a, b) => {
    if (a.name > b.name) {
      return key === "a-z" ? 1 : -1;
    }
    if (a.name < b.name) {
      return key === "a-z" ? -1 : 1;
    }
    return 0;
  })
  return data;
}

//filtring the data acording to 3 keys 
function filterData(data, key) {
  data.data = data.data.filter((team) => {
    if (key === "all") {
      return data.data;
    } else {
      return key === "West" ? team.conference == "West" : team.conference == "East";
    }
  });
  return data;
}

//clears the UI 
function clearUI() {
  while (app.firstChild) {
    app.removeChild(app.firstChild);
  }
}

async function renderUI(data) {
  clearUI();
    const teams = data.data;
    for(let i = 0; i<teams.length; i++){
      console.log(teams[i]);

      const abb = teams[i]["abbreviation"]
      const nameOfTeam = teams[i]["name"];
      const cityOfTeam = teams[i]["city"];
      const conference = teams[i]["conference"];

      //Making thw objects
      const itemElement = Object.assign(document.createElement("div"), { className: "item" })
      const div = Object.assign(document.createElement("div"), { className: "check" })
      const contentElement = Object.assign(document.createElement("div"), { className: "content" })
      const pElement = Object.assign(document.createElement("p"));
      const p2Element = Object.assign(document.createElement("p"));

      //changing the HTML
      div.innerHTML = "<em><strong>" +" "+abb + "</strong></em>";
      contentElement.innerHTML = "Team Name: " +  nameOfTeam;
      pElement.innerHTML = "City: " + cityOfTeam;
      p2Element.innerHTML = "Conference: " + conference;

      //making the structure 
      itemElement.appendChild(div);
      itemElement.appendChild(contentElement);
      contentElement.appendChild(pElement)
      contentElement.appendChild(p2Element)
      app.appendChild(itemElement);
    }
  }
  




