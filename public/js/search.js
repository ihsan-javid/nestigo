// let allListings = allListings;
let inputBox = document.getElementById("input-box");
let suggestionsBox = document.querySelector(".suggestions");
let search = document.querySelector("form");

// Hide suggestions initially
suggestionsBox.style.display = "none";

// Search functionality
inputBox.onkeyup = () => {
  let result = [];
  let input = inputBox.value;

  if (input.length) {
    // Filter titles that match input
    result = allTitles.filter((item) => {
      return (
        item.title.toLowerCase().includes(input.toLowerCase()) ||
        item.country.toLowerCase().includes(input.toLowerCase())
      );
    });

    // Show suggestions box if we have results
    suggestionsBox.style.display = result.length ? "block" : "none";
  } else {
    // Hide suggestions if input is empty
    suggestionsBox.style.display = "none";
  }

  display(result);
};

function display(result) {
  const content = result
    .map((item) => {
      return `<li>${item.title} - ${item.country}</li>`;
    })
    .join("");

  const suggestionsList = suggestionsBox.querySelector("ul");
  suggestionsList.innerHTML = content;

  // Add click handlers for suggestions
  const suggestions = suggestionsList.querySelectorAll("li");
  suggestions.forEach((li) => {
    li.addEventListener("click", () => {
      inputBox.value = li.textContent.split(" - ")[0]; // Set input to selected title
      suggestionsBox.style.display = "none"; // Hide suggestions
    });
  });
}

// Hide suggestions when clicking outside
document.addEventListener("click", (e) => {
  if (!suggestionsBox.contains(e.target) && e.target !== inputBox) {
    suggestionsBox.style.display = "none";
  }
});

// Handle search form submission
search.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchTerm = inputBox.value.toLowerCase();

  // Find the matching listing
  const matchingListing = allTitles.find(
    (item) => item.title.toLowerCase() === searchTerm
  );

  if (matchingListing) {
    // Redirect to the listing page
    window.location.href = `/listings/${matchingListing._id}`;
  }
});
