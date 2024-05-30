// 200 success
function sucess() {
	// the login form elements
	var popupwindow200 = document.getElementById("popupWindow200");
	var closeButton200 = document.getElementById("closeButton200");

	popupWindow200.style.display = "block"; // display the window

	// redirect to dashboard
	closeButton200.addEventListener("click", function () {
		window.location.replace("/MKAAT-frontend/users");
	});
}

async function submitForm() {
	// get the elements (username, password, etc)
	const name = document.getElementById("nameField").value; // full name
	const uid = document.getElementById("usernameField").value; // username
	const email = document.getElementById("emailField").value; // email
	const password = document.getElementById("passwordField").value; // password
	const preferences = document.getElementById("preferences").value;
	var form = document.getElementById("myForm");

	try {
		//const apiUrl = "https://whispbackend.duckdns.org/login";
		const apiUrl = "http://anime.stu.nighthawkcodingsociety.com/api/users/";

		// Get the form data
		const formData = new FormData(form);
		console.log(form);

		// Send a POST request to your backend server
		const loginResponse = await fetch(apiUrl, {
			mode: "cors",
			method: "POST",
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
				"Access-Control-Allow-Origin": "http://127.0.0.1:4100",
				"Access-Control-Allow-Credentials": "true",
			},
			body: JSON.stringify({
				name,
				uid,
				password,
				email,
				preferences,
			}), // convert payload to JSON
		});

		// error occured and login didn't work
		if (!loginResponse.ok) {
			throw new Error("Login request was not successful");
		}

		const loginData = await loginResponse.json();
		console.log(loginData);
		if (loginData) {
			localStorage.setItem("uid", loginData.uid);
			sucess();

			localStorage.setItem("usernameData", uid);
			localStorage.setItem("flagData", 1);
		} else {
			// Login failed, show an error message or take appropriate action
			console.error("login failed");
		}
	} catch (error) {
		console.error("Error:", error);
	}
}

const form = document.getElementById("myForm");
form.addEventListener("submit", function (event) {
	event.preventDefault();
	submitForm();
});
