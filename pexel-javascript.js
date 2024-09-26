const apiUrl = "https://cors-anywhere.herokuapp.com/https://api.pexels.com/v1/search?query=hamsters";

const apiKey = "DH5GzTmHLMkWlNXEpHuNStBaEzYk4NvRn0YIq7kY1Z23jbLawVLwHrjYHrjY";
const loadImage = function () {
  fetch(apiUrl, {
    method: "GET",
    headers: {
      Authorization: apiKey,
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("errore risposta server");
      }
    })

    .then((data) => {
      console.log("Immagini disponibili:", data);
      const imageGrid = document.getElementById("image-grid");
      imageGrid.innerHTML = ""; // Pulire il contenitore prima di inserire nuove immagini

      data.photos.forEach((photo) => {
        const col = document.createElement("div");
        col.classList.add("col-md-4");

        const card = `
            <div class="card mb-4 shadow-sm">
              <img src="${photo.src.medium}" class="bd-placeholder-img card-img-top" />
              <div class="card-body">
                <h5 class="card-title">${photo.photographer}</h5>
                <p class="card-text">Some description here.</p>
                <div class="d-flex justify-content-between align-items-center">
                  <div class="btn-group">
                   <button type="button" class="btn btn-sm btn-outline-secondary hide-btn">Hide</button>
                  </div>
                  <small class="text-muted">Photo ID: ${photo.id}</small>
                </div>
              </div>
            </div>
          `;
        col.innerHTML = card;
        imageGrid.appendChild(col);
      });
    })
    .catch((err) => {
      console.error("ERRORE", err);
    });
};
document.getElementById("loadImageBtn").addEventListener("click", loadImage);

// Modifica il bottone "Load Secondary Images"
const loadSecondaryImages = function () {
  const apiUrl = "https://api.pexels.com/v1/search?query=tigers";

  fetch(apiUrl, {
    method: "GET",
    headers: {
      Authorization: apiKey,
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("errore risposta server");
      }
    })
    .then((data) => {
      // codice per gestire l'inserimento delle immagini...
    })
    .catch((err) => {
      console.error("ERRORE", err);
    });
};

document.getElementById("loadSecondaryImagesBtn").addEventListener("click", loadSecondaryImages);
const hideButtons = document.querySelectorAll(".hide-btn");
hideButtons.forEach((btn) => {
  btn.addEventListener("click", function () {
    this.closest(".card").style.display = "none";
  });
});
