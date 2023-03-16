import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  // let city=search.split("=");
  // return city[city.length-1];
  let city = new URLSearchParams(search);
  return city.get("city");
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  try {
    let response = await fetch(
      config.backendEndpoint + "/adventures?city=" + city
    );
    let data = await response.json();
    return data;
  } catch (error) {
    return null;
  }
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  console.log(adventures);
  adventures.forEach((element) => {
    let actCards = document.createElement("div");
    actCards.className = "col-lg-3 col-sm-6 mb-3";

    let link = document.createElement("a");
    link.id = element.id;
    link.href = "detail/?adventure=" + element.id;
    let actCard = document.createElement("div");
    actCard.className = "activity-card";
    let catBanner = document.createElement("div");
    catBanner.className = "category-banner";
    let bannerText = document.createElement("span");
    bannerText.innerText = element.category;
    catBanner.append(bannerText);
    let cardImg = document.createElement("img");
    cardImg.setAttribute("src", element.image);
    actCard.append(cardImg);
    let subContainer1 = document.createElement("div");
    subContainer1.innerHTML = `
    <h6>${element.name}</h6>
    <p>₹${element.costPerHead}</p>
    `;
    subContainer1.className = "d-flex justify-content-between w-100 px-3 pt-3";
    let subContainer2 = document.createElement("div");
    subContainer2.innerHTML = `
    <h6>Duration</h6>
    <p>${element.duration}</p>
    `;
    subContainer2.className = "d-flex justify-content-between w-100 px-3";
    actCard.append(catBanner);
    actCard.append(subContainer1);
    actCard.append(subContainer2);
    link.append(actCard);
    actCards.append(link);
    document.getElementById("data").append(actCards);
  });
}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  let tempList = list.filter((element)=> low<=element.duration && high>=element.duration);
  // list.forEach((element) => {
  //   if (low<=element.duration && high>=element.duration) 
  //   tempList.push(list);
  // });
  return tempList;
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  return list.filter((element) => categoryList.includes(element.category));
}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
  console.log(filters)
  if(filters.duration){
    let duration = filters.duration.split("-");
    console.log(duration)
    list=filterByDuration(list,duration[0],duration[1]);
  }
  if (filters.category.length) {
    list = filterByCategory(list, filters.category);
  }
  return list;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  window.localStorage.setItem("filters",JSON.stringify(filters));
  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
  let obj=window.localStorage.getItem("filters");
  // Place holder for functionality to work in the Stubs
  return JSON.parse(obj);
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  filters.category.forEach((element) => {
    let pill = document.createElement("div");
    pill.className = "category-filter";
    pill.innerText = element;
    document.getElementById("category-list").append(pill);
  });
}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
