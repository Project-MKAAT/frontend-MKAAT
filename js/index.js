function loadShows(shows, query = "", genre = "") {
	const videoGrid = document.querySelector(".videoGrid");
	shows.forEach((show) => {
		const showItem = document.createElement("div");
		showItem.classList.add("grid-item");
		showItem.classList.add("video-item");

		// anime title
		const title = document.createElement("h1");
		title.textContent = show.title; // Assuming show object has a 'name' property for the title

		// release date
		const releaseDate = document.createElement("p");
		releaseDate.textContent = `Release Date: ${show.release}`;

		// genre
		const genre = document.createElement("p");
		genre.textContent = `Genre: ${show.genre}`;

		// critic rating
		const criticRating = document.createElement("p");
		criticRating.textContent = `Critic Rating: ${show.rating}`;

		// user rating
		const userRating = document.createElement("p");
		userRating.textContent = `User Rating: ${show.userRating}`;

		// putting it all together
		showItem.appendChild(title);
		showItem.appendChild(releaseDate);
		showItem.appendChild(genre);
		showItem.appendChild(criticRating);
		showItem.appendChild(userRating);

		// Append the showItem to the videoGrid
		videoGrid.appendChild(showItem);
	});
}

// Load videos when the page is loaded
document.addEventListener("DOMContentLoaded", async () => {
	try {
		const apiUrl = "http://127.0.0.1:8069/api/anime/";
		const response = await fetch(apiUrl);
		const shows = await response.json();
		loadShows(shows);
	} catch (error) {
		console.error("Error loading videos:", error);
	}
});

// getting all the buttons
async function rating() {
	try {
		const apiUrl = "http://127.0.0.1:8069/api/anime/getsorted";

		const response = await fetch(apiUrl, {
			method: "POST",
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
				"Access-Control-Allow-Origin": "http://127.0.0.1:4100",
				"Access-Control-Allow-Credentials": "true",
			},
			body: JSON.stringify({ criteria: "rating", isReversed: "True" }), // convert payload to JSON
		});

		const shows = await response.json();
		loadShows(shows);
	} catch (error) {
		console.error("Error loading videos:", error);
	}
}

async function userRating() {
	try {
		const apiUrl = "http://127.0.0.1:8069/api/anime/getsorted";

		const response = await fetch(apiUrl, {
			method: "POST",
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
				"Access-Control-Allow-Origin": "http://127.0.0.1:4100",
				"Access-Control-Allow-Credentials": "true",
			},
			body: JSON.stringify({
				criteria: "userRating",
				isReversed: "True",
			}), // convert payload to JSON
		});

		const shows = await response.json();
		loadShows(shows);
	} catch (error) {
		console.error("Error loading videos:", error);
	}
}
