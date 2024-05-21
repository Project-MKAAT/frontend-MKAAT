// Function to send a GET request to the URL
function fetchVideo(url, objectId) {
	const params = new URLSearchParams(window.location.search);
	const apiUrl = new URL(url) + params.get("videoID");
	console.log(apiUrl);
	var index = -1;
	return fetch(apiUrl, {
		mode: "cors",
		credentials: "include",
	})
		.then((response) => {
			if (response.status === 403) {
				window.location.href = "403.html"; // Redirect to 403 page
				throw new Error("Forbidden"); // Throw an error to stop further execution
			} else if (response.status === 401) {
				window.location.href = "401.html"; // Redirect to 403 page
				throw new Error("Forbidden"); // Throw an error to stop further execution
			} else {
				return response.json(); // Proceed with normal data processing
			}
		})
		.then((data) => {
			// Call function to format data into a table
			formatVideo(data, index);
		})
		.catch((error) => {
			// Handle other errors
			console.error("Error fetching data:", error);
		});
}

// Function to format JSON data into a table
function formatVideo(data, index) {
	console.log(data);
	// Clear existing table content
	var title = document.getElementById("title");
	var description = document.getElementById("description");
	var creator = document.getElementById("creator");
	var follow = document.getElementById("follow");
	//var like = document.getElementById('like');
	//var dislike = document.getElementById('dislike');
	var video = document.getElementById("video");
	var views = document.getElementById("views");
	var source = video.querySelector("source");
	var likes = document.getElementById("like-count");
	var dislikes = document.getElementById("dislike-count");
	var genre = document.getElementById("genre");

	videoID = data["videoID"];
	title.innerText = data["name"];
	description.innerText = data["description"];
	creator.innerText = data["userID"];
	views.innerText = data["views"] + " views";
	source.src = data["video"];
	likes.innerText += data["likes"];
	dislikes.innerText += data["dislikes"];
	genre.innerText += data["genre"];

	video.load();
	try {
		const url = "http://127.0.0.1:8069/api/video/";
		fetch(url, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ type: 0, videoID: videoID }), //JSON data
		});
	} catch (error) {
		console.error("Error:", error);
	}
}

// Call fetchData function with the API URL
const apiUrl = "http://127.0.0.1:8069/api/video/";
const objectId = "1"; // Replace 'your_object_id_here' with the actual object ID
fetchVideo(apiUrl, objectId);

// thumbnail link thing
function renderVideos(videos) {
	const videoGrid = document.querySelector(".videoGrid");

	videos.forEach((video) => {
		const videoItem = document.createElement("div");
		videoItem.classList.add("grid-item");
		videoItem.classList.add("video-item");

		const videoLink = document.createElement("a");
		videoLink.href =
			"http://127.0.0.1:4100/MKAAT-frontend/video" +
			"?videoID=" +
			video["videoID"]; // Assuming video object has a 'video' property for the URL

		const videoImage = document.createElement("img");
		videoImage.classList.add("video");
		var encode = `${video.base64}`;
		var step1 = encode.replace(/\\n/g, "");
		var step2 = step1.replace(/b'/g, "");
		var base64String = step2.replace(/[-:'\\]/g, "");
		videoImage.src = `data:image/png;base64,${base64String}`;

		const title = document.createElement("span");
		title.textContent = video.name; // Assuming video object has a 'name' property for the title

		const viewCount = document.createElement("span");
		viewCount.textContent = `Views: ${video.views}`; // Assuming video object has a 'views' property
		viewCount.classList.add("view-count"); // Add a class for styling

		const lineBreak = document.createElement("br");

		// Append the videoLink to the videoItem
		videoItem.appendChild(videoLink);

		// Append the videoImage inside the videoLink
		videoLink.appendChild(videoImage);

		// Append the title, view count, and line break to the videoItem
		videoItem.appendChild(title);
		videoItem.appendChild(lineBreak);
		// videoItem.appendChild(viewCount);

		// Append the videoItem to the videoGrid
		videoGrid.appendChild(videoItem);
	});
}

const like = document.getElementById("like");
like.addEventListener("click", async () => {
	event.preventDefault(); // Prevent default form submission behavior
	try {
		const url = "http://127.0.0.1:8069/api/video/";
		fetch(url, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ type: 1, videoID: videoID }), //JSON data
		});
	} catch (error) {
		console.error("Error:", error);
	}
});

const dislike = document.getElementById("dislike");
dislike.addEventListener("click", async () => {
	event.preventDefault(); // Prevent default form submission behavior
	try {
		const url = "http://127.0.0.1:8069/api/video/";
		fetch(url, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ type: 2, videoID: videoID }), //JSON data
		});
	} catch (error) {
		console.error("Error:", error);
	}
});

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
});
