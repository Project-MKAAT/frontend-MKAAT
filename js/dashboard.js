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

// const loggedIn = localStorage.getItem("loggedIn"); //logged in?
const uid = localStorage.getItem("uid"); //who just logged in?
const password = localStorage.getItem("password");

document.addEventListener("DOMContentLoaded", function () {
	// reference to the buttons
	var deleteAccount = document.getElementById("deleteAccount");
	var changeEmail = document.getElementById("changeEmail");
	var userPanel = document.getElementById("userPanel");
	var home = document.getElementById("home");

	// listen for delete button clicked
	deleteAccount.addEventListener("click", async function (event) {
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

			// wait for response and log whatever it says
			const responseData = await deleteAccount.json();
			if (responseData == null) {
				// POPUP version
				permissionFailure(); //popup window
			}
			console.log(responseData);
		} catch (error) {
			console.error("Error:", error);
		}
	});

	// listen for email change button clicked
	changeEmail.addEventListener("click", async function (event) {
		event.preventDefault();
		try {
			// const apiUrl = "http://127.0.0.1:8069"
			const apiUrl = "http://127.0.0.1:8069/api/users/update";
			const email = document.getElementById("emailField").value; // the new email to change

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

		// user tries to change email but not logged in
		if (deleteAccount.status == 403) {
			console.log(loginResponse.status);
			permissionFailure(); //popup window
		}
	});

	// WHY WONT THIS WORK
	// WHY WONT THIS WORK
	// WHY WONT THIS WORK
	// WHY WONT THIS WORK
	// WHY WONT THIS WORK
	// WHY WONT THIS WORK
	// WHY WONT THIS WORK
	// WHY WONT THIS WORK
	userPanel.addEventListener("click", function () {
		window.location.replace("/MKAAT-frontend/users");
	});

	home.addEventListener("click", function () {
		window.location.replace("/MKAAT-frontend/");
	});
});
