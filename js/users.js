document.addEventListener("DOMContentLoaded", function () {
	// reference to the buttons
	var deleteAccount = document.getElementById("deleteAccount");
	var changeEmail = document.getElementById("changeEmail");

	// reference to the uid's to use

	// listen for delete button clicked
	deleteAccount.addEventListener("click", async function (event) {
		const uid = document.getElementById("uidAccountField").value;
		console.log(uid);
		event.preventDefault();
		try {
			const apiUrl = "http://127.0.0.1:8069/api/users/update";

			// post request to backend
			const deleteAccount = await fetch(apiUrl, {
				mode: "cors",
				method: "DELETE",
				credentials: "include",
				headers: {
					"Content-Type": "application/json",
					"Access-Control-Allow-Origin": "http://127.0.0.1:4100",
					"Access-Control-Allow-Credentials": "true",
				},
				body: JSON.stringify({ uid }), //JSON data
			});
		} catch (error) {
			console.error("Error:", error);
		}
	});

	// listen for email change button clicked
	changeEmail.addEventListener("click", async function (event) {
		event.preventDefault();
		try {
			const apiUrl = "http://127.0.0.1:8069/api/users/update";
			const email = document.getElementById("emailField").value; // the new email to change
			const uid = document.getElementById("uidEmailField").value; // the uid to make the change

			// post request to backend
			const changeEmail = await fetch(apiUrl, {
				mode: "cors",
				method: "POST",
				credentials: "include",
				headers: {
					"Content-Type": "application/json",
					"Access-Control-Allow-Origin": "http://127.0.0.1:4100",
					"Access-Control-Allow-Credentials": "true",
				},
				body: JSON.stringify({ uid, email }), //JSON data
			});
			if (changeEmail.status === 400) {
				window.location.href = "./403.html";
				window.location.replace("./403.html");
			}

			// wait for response and log whatever it says
			const responseData = await changeEmail.json();
			console.log(responseData);
		} catch (error) {
			console.error("Error:", error);
		}
	});
});

// Function to send a GET request to the URL
function fetchData(url) {
	return fetch(url, {
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
			formatDataIntoTable(data);
		})
		.catch((error) => {
			// Handle other errors
			console.error("Error fetching data:", error);
		});
}

// Function to format JSON data into a table
function formatDataIntoTable(data) {
	const table = document.getElementById("data-table");
	// Clear existing table content
	table.innerHTML = "";

	// Create table headers
	const headers = ["Name", "UID", "ID #", "Email", "DOB", "Role"];
	const headerRow = table.insertRow();
	headers.forEach((headerText) => {
		const th = document.createElement("th");
		th.textContent = headerText;
		headerRow.appendChild(th);
	});

	// Iterate over each user's data
	data.forEach((userData) => {
		const row = table.insertRow();
		// Insert data into cells
		row.insertCell().textContent = userData.name;
		row.insertCell().textContent = userData.uid;
		row.insertCell().textContent = userData.id;
		row.insertCell().textContent = userData.email;
		row.insertCell().textContent = userData.dob;
		row.insertCell().textContent = userData.role;
	});
}

// URL to fetch JSON data from
const apiUrl = "http://127.0.0.1:8069/api/users";

// Call fetchData function with the API URL
fetchData(apiUrl);
