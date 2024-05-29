// 400 error
function loginFailure() {
	// the login form elements
	var popupWindow401 = document.getElementById("popupWindow401");
	var closeButton401 = document.getElementById("closeButton401");

	popupWindow401.style.display = "block"; // display the window

	// close the window if you click close
	closeButton401.addEventListener("click", function () {
		popupWindow401.style.display = "none";
	});
}

// 403 error
function permissionFailure() {
	// the login form elements
	var popupwindow403 = document.getElementById("popupWindow403");
	var closeButton403 = document.getElementById("closeButton403");

	popupWindow403.style.display = "block"; // display the window

	// close the window if you click close
	closeButton403.addEventListener("click", function () {
		popupWindow403.style.display = "none";
	});
}

// 200 success
function loginSuccess() {
	// the login form elements
	var popupwindow200 = document.getElementById("popupWindow200");
	var closeButton200 = document.getElementById("closeButton200");

	popupWindow200.style.display = "block"; // display the window

	// redirect to dashboard
	closeButton200.addEventListener("click", function () {
		window.location.replace("/frontend-MKAAT/");
	});
}

async function submitForm() {
	// get the elements (username, password, etc)
	const title = document.getElementById("showField").value;
	const rating = document.getElementById("ratingField").value;

	if (
		localStorage.getItem("loggedIn") == false ||
		localStorage.getItem("loggedIn") == null
	) {
		loginFailure();
	} else {
		try {
			//const apiUrl = "https://whispbackend.duckdns.org/login";
			const apiUrl = "http://127.0.0.1:8069/api/anime/";

			// Send a POST request to your backend server
			const loginResponse = await fetch(apiUrl, {
				method: "POST",
				credentials: "include",
				headers: {
					"Content-Type": "application/json",
					"Access-Control-Allow-Origin": "http://127.0.0.1:4100",
					"Access-Control-Allow-Credentials": "true",
				},
				body: JSON.stringify({ title, rating }), // convert payload to JSON
			});

			// error occured and login didn't work
			if (!loginResponse.ok) {
				if (loginResponse.status === 400) {
					// wrong creds
					console.log(loginResponse.status);
					loginFailure(); //popup window
				} else if (loginResponse.status === 403) {
					// wrong perms
					console.log(loginResponse.status);
					permissionFailure(); //popup window
				}

				throw new Error("Login request was not successful");
			}
			// login worked
			else {
				console.log("Rating added");
				loginSuccess(); //popup window
			}
		} catch (error) {
			console.error("Error:", error);
		}
	}
}

const form = document.getElementById("myForm");
form.addEventListener("submit", function (event) {
	event.preventDefault();
	submitForm();
});
