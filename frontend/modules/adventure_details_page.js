import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  let adventure = new URLSearchParams(search);
  // Place holder for functionality to work in the Stubs
  return adventure.get("adventure");
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  try {
    let adventureDetails = await fetch(
      config.backendEndpoint + "/adventures/detail?adventure=" + adventureId
    );
    let data = await adventureDetails.json();
    // Place holder for functionality to work in the Stubs
    return data;
  } catch (error) {
    return null;
  }
  let adventureDetails = await fetch(
    config.backendEndpoint + "/adventures/detail?adventure=" + adventureId
  );
  let data = await adventureDetails.json();
  // Place holder for functionality to work in the Stubs
  return data;
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  document.getElementById("adventure-name").textContent = adventure.name;
  document.getElementById("adventure-subtitle").textContent =
    adventure.subtitle;
  adventure.images.forEach((element, index) => {
    let imgContainer = document.createElement("div");
    let img = document.createElement("img");
    img.src = element;
    img.alt = adventure.name + "image" + index;
    img.className = "activity-card-image";
    imgContainer.append(img);
    document.getElementById("photo-gallery").append(imgContainer);
  });
  document.getElementById("adventure-content").append(adventure.content);
}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  const photoGallery = document.getElementById("photo-gallery");
  photoGallery.innerHTML = "";
  const carousel = document.createElement("div");
  carousel.setAttribute("id", "carouselExampleIndicators");
  carousel.setAttribute("class", "carousel slide");
  carousel.setAttribute("data-bs-ride", "carousel");

  const carouselIndicators = document.createElement("div");
  carouselIndicators.setAttribute("class", "carousel-indicators");
  images.forEach((image, index) => {
    const indicatorBtn = document.createElement("button");

    indicatorBtn.setAttribute("type", "button");
    indicatorBtn.setAttribute("data-bs-target", "#carouselExampleIndicators");
    indicatorBtn.setAttribute("data-bs-slide-to", index);
    if (index == 0) {
      indicatorBtn.setAttribute("class", "active");
      indicatorBtn.setAttribute("aria-current", "true");
    }
    indicatorBtn.setAttribute("aria-label", `Slide ${index + 1}`);

    carouselIndicators.append(indicatorBtn);
  });

  const carouselInner = document.createElement("div");
  carouselInner.setAttribute("class", "carousel-inner");

  images.forEach((image, index) => {
    const carouselItem = document.createElement("div");
    carouselItem.classList.add("carousel-item");
    if (index == 0) carouselItem.classList.add("active");

    const imgElement = document.createElement("img");
    imgElement.setAttribute("src", image);
    imgElement.setAttribute("alt", `Image ${index + 1}`);
    imgElement.setAttribute("class", "activity-card-image d-block");

    carouselItem.append(imgElement);
    carouselInner.append(carouselItem);
  });
  carousel.append(carouselIndicators);
  carousel.append(carouselInner);

  carousel.innerHTML += `
    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  `;

  photoGallery.append(carousel);
}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  const reservationPanel = document.getElementById(
    "reservation-panel-available"
  );
  const soldOutPanel = document.getElementById("reservation-panel-sold-out");
  if (adventure.available) {
    soldOutPanel.style.display = "none";
    reservationPanel.style.display = "block";
    document.getElementById("reservation-person-cost").textContent =
      adventure.costPerHead;
  } else {
    soldOutPanel.style.display = "block";
    reservationPanel.style.display = "none";
  }
}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  let total = persons * adventure.costPerHead;
  document.getElementById("reservation-cost").textContent = total;
}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
  const form = document.getElementById("myForm");
  form.addEventListener("submit", async (event)=>{
    event.preventDefault();
    let bodyContent={
      name:form.elements["name"].value,
      date:form.elements["date"].value,
      person:form.elements["person"].value,
      adventure:adventure.id
    }
    const obj = {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json',
      },
      body: JSON.stringify(bodyContent)
      };
      try {
        let response=await fetch(config.backendEndpoint+"/reservations/new",obj);
        // console.log(response);
        if(response.ok)
        {
          alert("Success!");
          location.reload();
        }
      } catch (error) {
        alert("Failed!")
      }
  });
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  let reservedAlertBanner=document.getElementById("reserved-banner");
  if(adventure.reserved)
  {
    reservedAlertBanner.style.display="block";
  }
  else{
    reservedAlertBanner.style.display="none";
  }
}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
