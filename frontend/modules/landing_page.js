import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();
  // console.log(config.backendEndpoint);
  //Updates the DOM with the cities
  if (cities) {
    cities.forEach((key) => {
      addCityToDOM(key.id, key.city, key.description, key.image);
    });
  }
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data

  let url = config.backendEndpoint + "/cities";
  try {
    let response = await fetch(url);
    let data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    return null;
  }
}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM

  //   <div class="col-12 col-sm-6 col-lg-3 mb-4">
  //   <a href="pages/adventures/">
  //     <div class="tile">
  //       <img src="assets/bengaluru.jpg" />
  //       <div class="tile-text text-center">
  //         <h5>Bengaluru</h5>
  //         <p>100+ places</p>
  //       </div>
  //     </div>
  //   </a>
  // </div>
  let card = document.createElement("div");
  card.className = "col-sm-6 col-lg-3 mb-4";
  let link=document.createElement("a");
  link.setAttribute("href","/frontend/pages/adventures/?city="+id);
  link.setAttribute("id",id);
  let tile = document.createElement("div");
  tile.setAttribute("class", "tile");
  tile.innerHTML = `<img src="${image}" />
 <div class="tile-text text-center">
 <h5>${city}</h5>
  <p>100+ places</p>
  </div>`;
  link.append(tile);
  card.append(link);
  document.getElementById("data").append(card);
}

export { init, fetchCities, addCityToDOM };
