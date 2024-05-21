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
	const qlist = query.split(" ");
	if (genre != "") {
		videos.forEach((video) => {
			if (video["genre"] == null) {
				return;
			}
			if (video["genre"].toLowerCase() == genre) {
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
				videoItem.appendChild(viewCount);

				// Append the videoItem to the videoGrid
				videoGrid.appendChild(videoItem);
			}
		});
	} else if (query != "") {
		console.log("query");
		videos.forEach((video) => {
			for (let word = 0; word < qlist.length; word++) {
				console.log(qlist[word]);
				console.log(
					video["name"]
						.toLowerCase()
						.includes(qlist[word].toLowerCase())
				);
				if (
					video["name"]
						.toLowerCase()
						.includes(qlist[word].toLowerCase())
				) {
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
					videoItem.appendChild(viewCount);

					// Append the videoItem to the videoGrid
					videoGrid.appendChild(videoItem);
					break;
				}
			}
		});
	} else {
		if (localStorage.getItem("uid") === null) {
			console.log("not logged in");
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
				videoItem.appendChild(viewCount);

				// Append the videoItem to the videoGrid
				videoGrid.appendChild(videoItem);
			});
		} else {
			console.log("should recommend");
			try {
				console.log("recommend");
				const apiUrl =
					"http://127.0.0.1:8069/api/video/recommend/" +
					localStorage.getItem("uid");
				fetch(apiUrl)
					.then((response) => {
						if (!response.ok) {
							throw new Error("Network response was not ok");
						}
						return response.json();
					})
					.then((preferences) => {
						preferences.forEach((video) => {
							console.log(preferences);
							const videoItem = document.createElement("div");
							videoItem.classList.add("grid-item");
							videoItem.classList.add("video-item");

							const videoLink = document.createElement("a");
							videoLink.href =
								"http://127.0.0.1:4100/MKAAT-frontend/video" +
								"?videoID=" +
								video["videoID"];

							const videoImage = document.createElement("img");
							videoImage.classList.add("video");
							var encode = `${video.base64}`;
							var step1 = encode.replace(/\\n/g, "");
							var step2 = step1.replace(/b'/g, "");
							var base64String = step2.replace(/[-:'\\]/g, "");
							videoImage.src = `data:image/png;base64,${base64String}`;

							const title = document.createElement("span");
							title.textContent = video.name;

							const viewCount = document.createElement("span");
							viewCount.textContent = `Views: ${video.views}`;
							viewCount.classList.add("view-count");

							const lineBreak = document.createElement("br");

							videoItem.appendChild(videoLink);
							videoLink.appendChild(videoImage);
							videoItem.appendChild(title);
							videoItem.appendChild(lineBreak);
							videoItem.appendChild(viewCount);

							videoGrid.appendChild(videoItem);
						});
					})
					.catch((error) => {
						console.error("Error loading preferred videos:", error);
					});
			} catch (error) {
				console.error("Error loading preferred videos:", error);
			}
		}
	}
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
const gaming = document.getElementById("gaming");
gaming.addEventListener("click", async () => {
	event.preventDefault(); // Prevent default form submission behavior
	try {
		const apiUrl = "http://127.0.0.1:8069/api/video";
		const response = await fetch(apiUrl);
		const videos = await response.json();
		const genre = "gaming";
		clearVideos();
		renderVideos(videos, "", genre);
	} catch (error) {
		console.error("Error loading videos:", error);
	}
});
const music = document.getElementById("music");
music.addEventListener("click", async () => {
	event.preventDefault(); // Prevent default form submission behavior
	try {
		const apiUrl = "http://127.0.0.1:8069/api/video";
		const response = await fetch(apiUrl);
		const videos = await response.json();
		const genre = "music";
		clearVideos();
		renderVideos(videos, "", genre);
	} catch (error) {
		console.error("Error loading videos:", error);
	}
});
const sports = document.getElementById("sports");
sports.addEventListener("click", async () => {
	event.preventDefault(); // Prevent default form submission behavior
	try {
		const apiUrl = "http://127.0.0.1:8069/api/video";
		const response = await fetch(apiUrl);
		const videos = await response.json();
		const genre = "sports";
		clearVideos();
		renderVideos(videos, "", genre);
	} catch (error) {
		console.error("Error loading videos:", error);
	}
});
const edu = document.getElementById("edu");
edu.addEventListener("click", async () => {
	event.preventDefault(); // Prevent default form submission behavior
	try {
		const apiUrl = "http://127.0.0.1:8069/api/video";
		const response = await fetch(apiUrl);
		const videos = await response.json();
		const genre = "educational";
		clearVideos();
		renderVideos(videos, "", genre);
	} catch (error) {
		console.error("Error loading videos:", error);
	}
});
