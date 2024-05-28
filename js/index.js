// thumbnail link thing
function clearVideos() {
	const videoGrid = document.querySelector(".videoGrid");
	// Remove all child elements from the videoGrid
	while (videoGrid.firstChild) {
		videoGrid.removeChild(videoGrid.firstChild);
	}
}

function renderVideos(videos, query = "", genre = "") {
	const videoGrid = document.querySelector(".videoGrid");
	videos.forEach((video) => {
		if (video["genre"] == null) {
			return;
		}
		if (video["genre"].toLowerCase() == genre) {
			const videoItem = document.createElement("div");
			videoItem.classList.add("grid-item");
			videoItem.classList.add("video-item");

			// anime title
			const title = document.createElement("h1");
			title.textContent = video.name; // Assuming video object has a 'name' property for the title

			// release date
			const releaseDate = document.createElement("p");
			releaseDate.textContent = `Release Date: ${video.views}`; // Assuming video object has a 'views' property
			releaseDate.classList.add("releaseDate"); // Add a class for styling

			// genre
			const genre = document.createElement("p");
			genre.textContent = `Genre: ${video.views}`; // Assuming video object has a 'views' property
			genre.classList.add("genre"); // Add a class for styling

			// critic rating
			const criticRating = document.createElement("p");
			criticRating.textContent = `Critic Rating: ${video.views}`; // Assuming video object has a 'views' property
			criticRating.classList.add("criticRating"); // Add a class for styling

			// user rating
			const userRating = document.createElement("p");
			userRating.textContent = `User Rating: ${video.views}`; // Assuming video object has a 'views' property
			userRating.classList.add("userRating"); // Add a class for styling

			// putting it all together
			videoItem.appendChild(title);
			videoItem.appendChild(releaseDate);
			videoItem.appendChild(genre);
			videoItem.appendChild(criticRating);
			videoItem.appendChild(userRating);

			// Append the videoItem to the videoGrid
			videoGrid.appendChild(videoItem);
		}
	});
}

// Load videos when the page is loaded
document.addEventListener("DOMContentLoaded", async () => {
	try {
		const apiUrl = "http://127.0.0.1:8069/api/video";
		const response = await fetch(apiUrl);
		const videos = await response.json();
		renderVideos(videos);
	} catch (error) {
		console.error("Error loading videos:", error);
	}
	uid = localStorage.getItem("uid");
	console.log(uid);
});

const form = document.getElementById("query");
form.addEventListener("keypress", async (event) => {
	if (event.key === "Enter") {
		event.preventDefault(); // Prevent default form submission behavior
		try {
			const apiUrl = "http://127.0.0.1:8069/api/video";
			const response = await fetch(apiUrl);
			const videos = await response.json();
			const query = document.getElementById("query").value;
			clearVideos();
			renderVideos(videos, query);
		} catch (error) {
			console.error("Error loading videos:", error);
		}
	}
});
