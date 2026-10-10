
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const resetBtn = document.getElementById("resetBtn");
const results = document.getElementById("results");
const statusMessage = document.getElementById("statusMessage");

const contactForm = document.getElementById("contactForm");
const contactStatus = document.getElementById("contactStatus");

// Search button
if (searchBtn && searchInput) {
  searchBtn.addEventListener("click", searchDestinations);

  searchInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      searchDestinations();
    }
  });
}

// Reset button
if (resetBtn) {
  resetBtn.addEventListener("click", function () {
    if (searchInput) searchInput.value = "";
    if (results) results.innerHTML = "";
    if (statusMessage) statusMessage.textContent = "";
  });
}

// Search destinations
async function searchDestinations() {
  const keyword = searchInput.value.trim().toLowerCase();

  if (!keyword) {
    results.innerHTML = "";
    statusMessage.textContent = "Please enter a search term.";
    return;
  }

  results.innerHTML = "";
  statusMessage.textContent = "Searching...";

  try {
    const response = await fetch("./travel_recommendation_api.json");

    if (!response.ok) {
      throw new Error("Could not load JSON data.");
    }

    const data = await response.json();
    let destinations = [];

    // Countries
    if (
      keyword.includes("country") ||
      keyword.includes("countries")
    ) {
      destinations = data.countries.map(function (country) {
        return {
          ...country,
          category: "Country"
        };
      });
    } else {
      data.countries.forEach(function (country) {
        if (country.name.toLowerCase().includes(keyword)) {
          destinations.push({
            ...country,
            category: "Country"
          });
        }
      });
    }

    // Beaches
    if (keyword.includes("beach") || keyword.includes("beaches")) {
      data.beaches.forEach(function (place) {
        destinations.push({
          ...place,
          category: "Beach"
        });
      });
    } else if (!keyword.includes("country")) {
      data.beaches.forEach(function (place) {
        if (
          place.name.toLowerCase().includes(keyword) ||
          place.description.toLowerCase().includes(keyword)
        ) {
          destinations.push({
            ...place,
            category: "Beach"
          });
        }
      });
    }

    // Temples
    if (keyword.includes("temple") || keyword.includes("temples")) {
      data.temples.forEach(function (place) {
        destinations.push({
          ...place,
          category: "Temple"
        });
      });
    } else if (!keyword.includes("country")) {
      data.temples.forEach(function (place) {
        if (
          place.name.toLowerCase().includes(keyword) ||
          place.description.toLowerCase().includes(keyword)
        ) {
          destinations.push({
            ...place,
            category: "Temple"
          });
        }
      });
    }

    displayResults(destinations);

  } catch (error) {
    console.error(error);
    statusMessage.textContent =
      "Error loading data. Check the JSON file and Live Server.";
  }
}

// Display destination cards
function displayResults(destinations) {
  results.innerHTML = "";

  if (destinations.length === 0) {
    statusMessage.textContent =
      "No destinations found. Try country, Japan, Australia, beach, or temple.";
    return;
  }

  statusMessage.textContent =
    `Found ${destinations.length} destination(s).`;

  destinations.forEach(function (place) {
    const card = document.createElement("article");
    card.className = "destination-card";

    const image = document.createElement("img");
    image.src = place.image;
    image.alt = place.name;
    image.loading = "lazy";

    image.onerror = function () {
      image.onerror = null;
      image.src = "https://placehold.co/600x400?text=Travel+Destination";
    };

    const content = document.createElement("div");
    content.className = "card-content";

    const category = document.createElement("span");
    category.className = "category";
    category.textContent = place.category;

    const title = document.createElement("h3");
    title.textContent = place.name;

    const description = document.createElement("p");
    description.textContent = place.description;

    content.append(category, title, description);
    card.append(image, content);
    results.appendChild(card);
  });
}

// Contact form
if (contactForm && contactStatus) {
  contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();

    contactStatus.textContent =
      `Thank you, ${name}! Your message was received in this demo.`;

    contactForm.reset();
  });
}




// const searchInput = document.getElementById("searchInput");
// const searchBtn = document.getElementById("searchBtn");
// const resetBtn = document.getElementById("resetBtn");
// const results = document.getElementById("results");
// const statusMessage = document.getElementById("statusMessage");

// const contactForm = document.getElementById("contactForm");
// const contactStatus = document.getElementById("contactStatus");

// // Search button
// if (searchBtn) {
//   searchBtn.addEventListener("click", searchDestinations);

//   searchInput.addEventListener("keydown", function (event) {
//     if (event.key === "Enter") {
//       searchDestinations();
//     }
//   });
// }

// // Reset button
// if (resetBtn) {
//   resetBtn.addEventListener("click", function () {
//     searchInput.value = "";
//     results.innerHTML = "";
//     statusMessage.textContent = "Search cleared. Try another destination.";
//   });
// }

// // Search destinations
// async function searchDestinations() {
//   const keyword = searchInput.value.trim().toLowerCase();

//   if (keyword === "") {
//     results.innerHTML = "";
//     statusMessage.textContent = "Please enter a destination to search.";
//     return;
//   }

//   results.innerHTML = "";
//   statusMessage.textContent = "Searching...";

//   try {
//     const response = await fetch("travel_recommendation_api.json");

//     if (!response.ok) {
//       throw new Error("Unable to load travel data.");
//     }

//     const data = await response.json();
//     const destinations = [];

//     // Search countries and cities
//     data.countries.forEach(function (country) {
//       if (country.name.toLowerCase().includes(keyword)) {
//         country.cities.forEach(function (city) {
//           destinations.push({
//             ...city,
//             category: country.name
//           });
//         });
//       } else {
//         country.cities.forEach(function (city) {
//           if (
//             city.name.toLowerCase().includes(keyword) ||
//             city.description.toLowerCase().includes(keyword)
//           ) {
//             destinations.push({
//               ...city,
//               category: country.name
//             });
//           }
//         });
//       }
//     });

//     // Search beaches and temples
//     data.beaches.forEach(function (place) {
//       if (
//         "beach".includes(keyword) ||
//         place.name.toLowerCase().includes(keyword) ||
//         place.description.toLowerCase().includes(keyword)
//       ) {
//         destinations.push({
//           ...place,
//           category: "Beach"
//         });
//       }
//     });

//     data.temples.forEach(function (place) {
//       if (
//         "temple".includes(keyword) ||
//         place.name.toLowerCase().includes(keyword) ||
//         place.description.toLowerCase().includes(keyword)
//       ) {
//         destinations.push({
//           ...place,
//           category: "Temple"
//         });
//       }
//     });

//     displayResults(destinations);

//   } catch (error) {
//     statusMessage.textContent =
//       "Unable to load destinations. Please try again.";
//     console.error(error);
//   }
// }

// // Display destination cards
// function displayResults(destinations) {
//   results.innerHTML = "";

//   if (destinations.length === 0) {
//     statusMessage.textContent =
//       "No destinations found. Try Japan, Australia, beach, or temple.";
//     return;
//   }

//   statusMessage.textContent =
//     `Found ${destinations.length} destination(s).`;

//   destinations.forEach(function (place) {
//     const card = document.createElement("article");
//     card.className = "destination-card";

//     const image = document.createElement("img");
//     image.src = place.image;
//     image.alt = place.name;
//     image.loading = "lazy";

//     image.onerror = function () {
//       image.onerror = null;
//       image.src =
//         "https://placehold.co/600x400?text=Travel+Destination";
//     };

//     const content = document.createElement("div");
//     content.className = "card-content";

//     const category = document.createElement("span");
//     category.className = "category";
//     category.textContent = place.category;

//     const title = document.createElement("h3");
//     title.textContent = place.name;

//     const description = document.createElement("p");
//     description.textContent = place.description;

//     content.append(category, title, description);
//     card.append(image, content);
//     results.appendChild(card);
//   });
// }

// // Contact form
// if (contactForm) {
//   contactForm.addEventListener("submit", function (event) {
//     event.preventDefault();

//     const name = document.getElementById("name").value.trim();

//     contactStatus.textContent =
//       `Thank you, ${name}! Your message was received in this demo.`;

//     contactForm.reset();
//   });
// }
