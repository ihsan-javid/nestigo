let lat = lisitngDetails.geometry.coordinates[0];
let len = lisitngDetails.geometry.coordinates[1];
let lisitngTitle = lisitngDetails.title;
document.addEventListener("DOMContentLoaded", function () {
  let map = L.map("map").setView([len, lat], 10); // Centered on KPK, Pakistan

  // Adding OpenStreetMap tile layer
  L.tileLayer("https://{s}.tile.openstreetmap.de/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  const redIcon = L.icon({
    iconUrl:
      "https://cdn.jsdelivr.net/gh/pointhi/leaflet-color-markers@master/img/marker-icon-red.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  let marker = L.marker([len, lat], { icon: redIcon }).addTo(map);
  marker.bindPopup(`Exact location will be provided after bokking`).openPopup();

  let circle = L.circle([len, lat], {
    color: "#fe424d",
    fillColor: "#fe424d",
    fillOpacity: 0.5,
    radius: 11000,
  }).addTo(map);

  L.control
    .scale({
      imperial: false, // Optional: remove imperial units if you want metric only
      metric: true,
    })
    .addTo(map);
});
