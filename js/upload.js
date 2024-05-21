window.addEventListener("load", function () {
	// Reset the form on page load
	document.getElementById("myForm").reset();
});
// 200 success
function success(uploadSuccessful) {
	const messageElement = document.createElement("p");
	messageElement.textContent = uploadSuccessful
		? "Upload successful!"
		: "Upload failed. Please try again.";
	messageElement.style.color = uploadSuccessful ? "green" : "red";
	document.body.appendChild(messageElement);
	// Optionally, you can reset the form or do other actions here
}

// Assuming you have an input element with id="imageInput" where users can select an image file

// Function to handle the image conversion
function convertImageToBase64(thumbnail) {
	return new Promise((resolve, reject) => {
		// Make sure a file is selected
		if (thumbnail.files.length > 0) {
			var file = thumbnail.files[0];
			// Create a FileReader object
			var reader = new FileReader();
			// Set up a function to be called once the file is loaded
			reader.onload = function (event) {
				// event.target.result contains the base64 encoded image
				base64String = event.target.result.split(",")[1]; // Remove the data URL prefix
				resolve(base64String);
			};

			reader.readAsDataURL(file);
		} else {
			reject("Please select an image file.");
		}
	});
}

async function submitForm() {
	// get the elements (username, password, etc)
	const uid = localStorage.getItem("uid");
	const name = document.getElementById("nameField").value; // full name
	const description = document.getElementById("descField").value; // date of birth // username
	const vid = document.getElementById("videoField"); // email
	var formData = new FormData();
	var thumb = document.getElementById("thumbnailField");
	var base64String = "";
	var form = document.getElementById("myForm");
	var video = null;
	var thumb_name = thumb.files[0].name;
	var genre = document.getElementById("genre").value;
	if (uid == null) {
		console.log("LOG IN PRIOR TO UPLOAD");
		return "SIGN IN";
	}

	formData.append("video", vid.files[0]);
	try {
		const apiUrl = "http://127.0.0.1:8069/api/video/";
		console.log(genre.value2);
		var formData = new FormData(form);
		video = vid.files[0].name;
		convertImageToBase64(thumb)
			.then((base64String) => {
				const base64 = "data:image/png;base64," + base64String;
				fetch(apiUrl, {
					mode: "cors",
					method: "POST",
					credentials: "include",
					headers: {
						"Content-Type": "application/json",
						"Access-Control-Allow-Origin": "http://127.0.0.1:4100",
						"Access-Control-Allow-Credentials": "true",
					},
					body: JSON.stringify({
						name: name,
						description: description,
						thumbnail: thumb_name,
						base64: base64String,
						video: video,
						uid: uid,
						genre: genre,
					}), // convert payload to JSON
				});
				// Do something with the base64String, such as sending it to a server or displaying it
			})
			.catch((error) => {
				console.error(error);
			});
		//upload desc, name, and thumbnail

		//upload video
		fetch(apiUrl, {
			mode: "cors",
			method: "POST",
			credentials: "include",
			headers: {
				"Access-Control-Allow-Origin": "http://127.0.0.1:4100",
				"Access-Control-Allow-Credentials": "true",
			},
			body: formData,
		}).catch((error) => {
			// Handle any errors
			console.error("Error uploading video:", error);
		});
		if (!uploadResponse.ok) {
			throw new Error("Upload request was not successful");
		}
		success(true);
	} catch {
		console.log("TRY FAILED");
	}
}
const form = document.getElementById("myForm");
form.addEventListener("submit", function (event) {
	event.preventDefault();
	submitForm();
});
