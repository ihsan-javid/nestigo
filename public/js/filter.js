// togle button

let taxSwitch = document.getElementById("flexSwitchCheckDefault");
taxSwitch.addEventListener("click", () => {
  let taxInfo = document.getElementsByClassName("tax-info");
  for (let info of taxInfo) {
    if (info.style.display !== "inline") {
      info.style.display = "inline";
    } else {
      info.style.display = "none";
    }
  }
});

// filters
const slider = document.getElementById("slider");
const leftArrow = document.querySelector(".left-arrow");
const rightArrow = document.querySelector(".right-arrow");

let isDown = false;
let startX, scrollLeft;

// Scroll the slider left when clicking the left button
leftArrow.addEventListener("click", () => {
  slider.scrollBy({
    left: 300,
    behavior: "smooth",
  });
});

// Scroll the slider right when clicking the right button
rightArrow.addEventListener("click", () => {
  slider.scrollBy({
    left: -300,
    behavior: "smooth",
  });
});

// Enable touch-based sliding (mobile & desktop)
slider.addEventListener("mousedown", (e) => {
  isDown = true;
  startX = e.pageX;
  scrollLeft = slider.scrollLeft;
});

slider.addEventListener("mouseleave", () => {
  isDown = false;
});

slider.addEventListener("mouseup", () => {
  isDown = false;
});

slider.addEventListener("mousemove", (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX;
  const walk = (startX - x) * 2; // Speed multiplier
  slider.scrollLeft = scrollLeft + walk;
});

// Touch sliding support for mobile devices
slider.addEventListener("touchstart", (e) => {
  isDown = true;
  startX = e.touches[0].pageX;
  scrollLeft = slider.scrollLeft;
});

slider.addEventListener("touchmove", (e) => {
  if (!isDown) return;
  const x = e.touches[0].pageX;
  const walk = (startX - x) * 2; // Speed multiplier
  slider.scrollLeft = scrollLeft + walk;
});

slider.addEventListener("touchend", () => {
  isDown = false;
});

function showingCategory() {
  let categories = document.getElementById(".categories");
  categories.addEventListener("change", async function () {
    const category = this.value;
  });
}
