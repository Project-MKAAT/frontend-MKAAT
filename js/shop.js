var inflation = 1;
var adblock5 = 5;
var adblock10 = 10;
var adblock30 = 30;
var tenEighty = 1080;
var banana = 5000;
const body2 = {
	date: "2025-01-01",
};

const loggedinuser = localStorage.getItem("uid");
var currentItems = "";
var currentPoints = 0;

function update() {
	fetchInflation();
	document.getElementById("adblock-5min").innerText = `(${adblock5.toFixed(
		2
	)} points)`;
	document.getElementById("adblock-10min").innerText = `(${adblock10.toFixed(
		2
	)} points)`;
	document.getElementById("adblock-30min").innerText = `(${adblock30.toFixed(
		2
	)} points)`;
	document.getElementById("1080p").innerText = `(${tenEighty.toFixed(
		2
	)} points)`;
	document.getElementById("banana").innerText = `(${banana.toFixed(
		2
	)} points)`;

	let date = new Date(body2.date);
	date.setMonth(date.getMonth() + 1); // Add one month to the current date
	let year = date.getFullYear();
	let month = (date.getMonth() + 1).toString().padStart(2, "0"); // JavaScript months are 0-indexed
	let day = date.getDate().toString().padStart(2, "0");
	body2.date = `${year}-${month}-${day}`; // Update the date in body2
	console.log(body2.date); // Log the new date to the console
}

function purchaseIngredient(ingredient, cost) {
	const url = "http://127.0.0.1:8069/api/users/";
	const options = {
		method: "GET",
		mode: "cors",
		cache: "default",
		credentials: "include",
		headers: {
			"Content-Type": "application/json",
		},
	};

	fetch(url, options)
		.then((response) => response.json())
		.then((data) => {
			// Handle successful response here
			let currentItems = "";
			for (const row of data) {
				if (row.uid == localStorage.getItem("uid")) {
					currentItems = row.items;
					currentPoints = row.points;
				}
			}
			console.log(currentItems); // Logging the retrieved items

			// Manipulate and update the items here
			console.log(ingredient);
			let list = [];
			try {
				list = JSON.parse(currentItems);
				if (!Array.isArray(list)) {
					throw new Error("Parsed data is not an array");
				}
			} catch (error) {
				console.error("Error parsing currentItems:", error.message);
			}
			list.push(ingredient);
			console.log(list);
			console.log(JSON.stringify(list));

			// Now that you have updated the list, you can proceed to update the user's items
			if (currentPoints >= cost) {
				points = currentPoints - cost;
			} else {
				points = 0;
				console.log("brokie");
			}
			const body = {
				uid: localStorage.getItem("uid"),
				items: JSON.stringify(list),
				points: points,
			};
			console.log(body);
			const authoptions = {
				method: "PUT",
				mode: "cors",
				cache: "default",
				credentials: "include",
				body: JSON.stringify(body),
				headers: {
					"Content-Type": "application/json",
				},
			};
			fetch(url, authoptions);
		})
		.catch((error) => {
			// Handle error
			console.error("Error fetching user data:", error);
		});
}
function fetchInflation() {
	const inflationUrl = "http://127.0.0.1:8069/api/inflation/";
	const post_options = {
		// ...options, // This will copy all properties from options
		method: "POST", // Override the method property
		cache: "no-cache", // Set the cache property
		body: JSON.stringify(body2),
		headers: {
			"Content-Type": "application/json",
			"Access-Control-Allow-Origin": "include",
		},
	};

	fetch(inflationUrl, post_options)
		.then((response) => {
			if (response.status === 200) {
				// Handle successful response here
				return response.json();
			} else {
				throw new Error("Failed to fetch inflation data");
			}
		})
		.then((data) => {
			// Handle the fetched inflation data here
			console.log(data);
			data /= 100;
			console.log(data);
			inflation += data / 10;
			console.log(inflation);

			adblock5 *= inflation;
			adblock10 *= inflation;
			adblock30 *= inflation;
			tenEighty *= inflation;
			banana *= inflation;
		})
		.catch((error) => {
			// Handle error
			console.error("Error fetching inflation data:", error);
		});
}
fetchInflation();
setInterval(update, 10000);
