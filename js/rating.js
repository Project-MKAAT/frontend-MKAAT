const uid = localStorage.getItem("uid")
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
    // get the elements (title and rating)
    const title = document.getElementById("showField").value;
    const rating = document.getElementById("ratingField").value;
    const uid = localStorage.getItem("uid"); // Assuming you have a user ID stored in localStorage

    if (!uid || localStorage.getItem("loggedIn") === "false" || localStorage.getItem("loggedIn") === null) {
        loginFailure();
    } else {
        try {
            const apiUrl = "http://127.0.0.1:8069/api/trending/userRating";

            // Send a POST request to your backend server
            const response = await fetch(apiUrl, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ uid, name: title, rating: parseFloat(rating) }) // convert payload to JSON
            });

            // error occurred and login didn't work
            if (!response.ok) {
                if (response.status === 400) {
                    // wrong creds
                    console.log(response.status);
                    loginFailure(); //popup window
                } else if (response.status === 403) {
                    // wrong perms
                    console.log(response.status);
                    permissionFailure(); //popup window
                } else {
                    console.log("Unexpected status:", response.status);
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
