// thumbnail link thing
function clearShows() {
	const videoGrid = document.querySelector(".videoGrid");
	// Remove all child elements from the videoGrid
	while (videoGrid.firstChild) {
		videoGrid.removeChild(videoGrid.firstChild);
	}
}

function loadShows(shows) {
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

		// popularity
		const popularity = document.createElement("p");
		popularity.textContent = `Popularity Score: ${show.popularity}`;

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
		// major metadata
		showItem.appendChild(title);
		showItem.appendChild(releaseDate);
		// showItem.appendChild(genre);

		// ratings and what-not
		showItem.appendChild(popularity);
		if (show.criticRating == 0) {
			showItem.appendChild(criticRating);
		}

		if (show.userRating.length != 0) {
			console.log(show.userRating);
			showItem.appendChild(userRating);
		}

		// Append the showItem to the videoGrid
		videoGrid.appendChild(showItem);
	});
}

// Load videos when the page is loaded
document.addEventListener("DOMContentLoaded", async () => {
	try {
		const apiUrl = "http://127.0.0.1:8069/api/trending/";
		const response = await fetch(apiUrl);
		const shows = await response.json();
		console.log(shows);
		loadShows(shows);
	} catch (error) {
		console.error("Error loading videos:", error);
	}
});

// sort shows
async function sort(criteria, isReversed) {
	try {
		clearShows();

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
				criteria: criteria,
				isReversed: isReversed,
			}), // convert payload to JSON
		});

		const shows = await response.json();
		loadShows(shows);
	} catch (error) {
		console.error("Error loading videos:", error);
	}
}
