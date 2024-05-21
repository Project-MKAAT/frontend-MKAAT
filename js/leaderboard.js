// uri variable and options object are obtained from config.js
const uri = "http://127.0.0.1:8069/";

// Set Users endpoint (list of users)
const url = uri + "/api/users/";

// prepare HTML result container for new output
const resultContainer = document.getElementById("result");
const options = {
	method: "GET",
	mode: "cors",
	cache: "default",
	credentials: "include",
	headers: {
		"Content-Type": "application/json",
	},
};
// fetch the API
fetch(url, options)
	// response is a RESTful "promise" on any successful fetch
	.then((response) => {
		// check for response errors and display
		if (response.status !== 200) {
			if (response.status === 401) {
				// Unauthorized - Redirect to 401 error page
				window.location.href = "/lmc-frontend/lmc-login";
			} else if (response.status === 403) {
				// Forbidden - Redirect to 403 error page
				alert(response.status + " error. Redirecting you to the login");
				const errorMsg = "Database response error: " + response.status;
				console.log(errorMsg);
				const tr = document.createElement("tr");
				const td = document.createElement("td");
				td.innerHTML = errorMsg;
				tr.appendChild(td);
				resultContainer.appendChild(tr);
				window.location.href = "/lmc-frontend/lmc-login";
				return;
			}
		}
		// valid response will contain JSON data
		response.json().then((data) => {
			console.log(data);

			// Sort data by points (highest to lowest)
			data.sort((a, b) => b.points - a.points);

			for (const row of data) {
				// tr and td build out for each row
				const tr = document.createElement("tr");
				const name = document.createElement("td");
				const id = document.createElement("td");
				const points = document.createElement("td");
				// data is specific to the API
				name.innerHTML = row.name;
				id.innerHTML = row.uid;
				points.innerHTML = row.points;
				// this builds td's into tr
				tr.appendChild(name);
				tr.appendChild(id);
				tr.appendChild(points);

				// append the row to table
				resultContainer.appendChild(tr);
			}
		});
	})

	// catch fetch errors (ie ACCESS to server blocked)
	.catch((err) => {
		console.error(err);
		const tr = document.createElement("tr");
		const td = document.createElement("td");
		td.innerHTML = err + ": " + url;
		tr.appendChild(td);
		resultContainer.appendChild(tr);
	});
