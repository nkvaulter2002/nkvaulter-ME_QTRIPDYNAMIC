import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them
  try {
    let response = await await fetch(config.backendEndpoint + "/reservations/");
    let data = await response.json();
    // Place holder for functionality to work in the Stubs
    return data;
  } catch (error) {
    return null;
  }
}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table

  //Conditionally render the no-reservation-banner and reservation-table-parent
  console.log(reservations);
  if (reservations.length == 0) {
    document.getElementById("no-reservation-banner").style.display = "block";
    document.getElementById("reservation-table-parent").style.display = "none";
  } else {
    document.getElementById("no-reservation-banner").style.display = "none";
    document.getElementById("reservation-table-parent").style.display = "block";
  }
  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page

    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */
  let table = document.getElementById("reservation-table");
  reservations.forEach((element) => {
    let time = new Date(element.time);
    time = time
      .toLocaleString("en-IN", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: true,
      })
      .replace(" at", ",");

    // date.datastyle="medium";
    let tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${element.id}</td>
      <td>${element.name}</td>
      <td>${element.adventureName}</td>
      <td>${element.person}</td>
      <td>${new Date(element.date).toLocaleDateString('en-IN')}</td>
      <td>${element.price}</td>
      <td>${time}</td>
      `;
    let td = document.createElement("td");
    td.id = element.id;
    let link = document.createElement("a");
    link.href = `/frontend/pages/adventures/detail/?adventure=${element.adventure}`;
    link.className = "reservation-visit-button text-white";
    link.textContent = "Visit Adventure";
    td.append(link);
    tr.append(td);
    table.append(tr);
  });
}

export { fetchReservations, addReservationToTable };
