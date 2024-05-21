// creating a comment
function createPost() {
	var myHeaders = new Headers();
	myHeaders.append("Content-Type", "application/json");

	// fetching the items
	const uid = document.getElementById("uid").value;
	const message = document.getElementById("message").value;

	// creating the payload
	const body = {
		uid: uid,
		message: message,
		likes: 0,
	};

	// request options
	const authOptions = {
		method: "POST",
		cache: "no-cache",
		headers: myHeaders,
		body: JSON.stringify(body),
		credentials: "include",
	};

	// fetching
	fetch("http://127.0.0.1:8069/api/messages/send", authOptions)
		.then((response) => {
			// error and success handling
			if (!response.ok) {
				console.error("Failed to create post:", response.status);
				return null;
			}
			const contentType = response.headers.get("Content-Type");
			if (contentType && contentType.includes("application/json")) {
				return response.json();
			} else {
				return response.text();
			}
		})
		.then((data) => {
			if (data !== null) {
				console.log("Response:", data);
				// Update the posts container with the new post
				updatePostsContainer(uid, message, 0);
			}
		})
		.catch((error) => {
			console.error("Error:", error);
		});
}

// getting the posts to display
function fetchPosts() {
	var myHeaders = new Headers();
	myHeaders.append("Content-Type", "application/json");

	// auth
	const authOptions = {
		method: "GET",
		cache: "no-cache",
		headers: myHeaders,
		credentials: "include",
	};

	// fetching
	fetch("http://127.0.0.1:8069/api/messages/", authOptions)
		.then((response) => {
			if (!response.ok) {
				console.error("Failed to fetch posts:", response.status);
				return null;
			}
			return response.json();
		})
		.then((posts) => {
			// error and success handling
			if (posts === null || posts === undefined) {
				console.warn("Received null or undefined posts.");
				alert("Please Log in first!");
				return;
			}
			console.log("Fetched Posts:", posts);

			// display the posts
			const postsContainer = document.getElementById("posts");
			postsContainer.innerHTML = ""; // Clear existing posts
			posts.forEach((post) => {
				updatePostsContainer(post.uid, post.message, post.likes);
			});
		})
		.catch((error) => {
			console.error("Error:", error);
		});
}

// each container has the content and buttons
function updatePostsContainer(uid, message, likes) {
	// container with all the other comments
	const postsContainer = document.getElementById("posts");
	const postDiv = document.createElement("div");
	postDiv.className = "post-container";
	postDiv.dataset.uid = uid; // Assigning uid as a dataset attribute

	// content
	const postContent = document.createElement("p");
	postContent.className = "post-content";
	postContent.textContent = `UID: ${uid}, Message: ${message}`;

	// replies
	const replyButton = document.createElement("button");
	replyButton.textContent = "Reply";
	replyButton.addEventListener("click", () => showReplyForm(uid));

	// editing
	const editButton = document.createElement("button"); // Edit button
	editButton.textContent = "Edit"; // Set text content to 'Edit'
	editButton.addEventListener("click", () => showEditForm(uid, message)); // Call showEditForm function

	// liking
	const likeButton = document.createElement("button"); // Like button
	likeButton.textContent = "Like";
	likeButton.addEventListener("click", () => {
		likePost(uid, message);
		// Hide the like button after clicking
		likeButton.style.display = "none";
	});

	// like counter
	const likeCountContainer = document.createElement("div");
	likeCountContainer.className = "like-count-container";

	// span (i guess)
	const likesCountSpan = document.createElement("span"); // Create the likes count span
	likesCountSpan.className = "likes-count"; // Assign the likes-count class
	likesCountSpan.textContent = `${likes} 👍`; // Display likes count
	likeCountContainer.appendChild(likesCountSpan); // Append likes count span to container

	// putting it all together
	postDiv.appendChild(postContent);
	postDiv.appendChild(replyButton);
	postDiv.appendChild(editButton);
	postDiv.appendChild(likeButton);
	postDiv.appendChild(likeCountContainer);
	postsContainer.appendChild(postDiv);
}

// reply form
function showReplyForm(parentUID) {
	const replyFormContainer = document.getElementById("replyFormContainer");
	replyFormContainer.innerHTML = ""; // Clear existing content
	const replyForm = document.createElement("form");
	replyForm.className = "reply-form-container";
	replyForm.innerHTML = `
            <h3>Reply to UID: ${parentUID}</h3>
            <textarea id="replyMessage" placeholder="Type your reply..."></textarea>
            <button type="button" onclick="postReply('${parentUID}')">Post Reply</button>
        `;
	replyFormContainer.appendChild(replyForm);
}

// posting the reply
function postReply(parentUID) {
	const replyMessage = document.getElementById("replyMessage").value;
	var myHeaders = new Headers();
	myHeaders.append("Content-Type", "application/json");

	// payload
	const body = {
		uid: parentUID,
		message: replyMessage,
		likes: 0,
	};

	// auth
	const authOptions = {
		method: "POST",
		cache: "no-cache",
		headers: myHeaders,
		body: JSON.stringify(body),
		credentials: "include",
	};

	// fetching
	fetch("http://127.0.0.1:8069/api/messages/send", authOptions)
		.then((response) => {
			if (!response.ok) {
				console.error("Failed to create reply:", response.status);
				return null;
			}
			const contentType = response.headers.get("Content-Type");
			if (contentType && contentType.includes("application/json")) {
				return response.json();
			} else {
				return response.text();
			}
		})
		.then((data) => {
			if (data !== null) {
				console.log("Reply Response:", data);
				// Clear the reply form after posting
				const replyFormContainer =
					document.getElementById("replyFormContainer");
				replyFormContainer.innerHTML = "";
				// Fetch and update posts after posting a reply
			}
		})
		.catch((error) => {
			console.error("Error:", error);
		});
}

// liking
function likePost(uid, message) {
	// Increment the like count in the DOM immediately
	const likesCountSpan = document.querySelector(
		`.post-container[data-uid="${uid}"] .likes-count`
	);
	var currentLikes = 0;
	if (likesCountSpan) {
		currentLikes = parseInt(likesCountSpan.textContent, 10) || 0;
		likesCountSpan.textContent = `${currentLikes + 1} 👍`;
	}
	// Now, send the request to the server to update likes
	var myHeaders = new Headers();
	myHeaders.append("Content-Type", "application/json");
	// Prepare the request body
	const body = {
		message: message,
	};
	const authOptions = {
		method: "PUT", // Assuming you are using a PUT request to update likes
		cache: "no-cache",
		headers: myHeaders,
		body: JSON.stringify(body),
		credentials: "include",
	};
	fetch(`http://127.0.0.1:8069/api/messages/like`, authOptions)
		.then((response) => {
			if (!response.ok) {
				console.error("Failed to like post:", response.status);
				// Revert the like count in case of an error
				if (likesCountSpan) {
					likesCountSpan.textContent = `${currentLikes} 👍`;
				}
				return null;
			}
			const contentType = response.headers.get("Content-Type");
			if (contentType && contentType.includes("application/json")) {
				return response.json();
			} else {
				return response.text();
			}
		})
		.then((data) => {
			if (data !== null) {
				console.log("Like Response:", data);
				if (likesCountSpan) {
					likesCountSpan.textContent = `${currentLikes + 1} 👍`;
				}
			}
		})
		.catch((error) => {
			console.error("Error:", error);
		});
}

// editing
function showEditForm(uid, message) {
	const editFormContainer = document.getElementById("editFormContainer");
	editFormContainer.innerHTML = ""; // Clear existing content
	const editForm = document.createElement("form");
	editForm.className = "edit-form-container";
	editForm.innerHTML = `
            <h3>Edit Message with UID: ${uid}</h3>
            <textarea id="editMessage" placeholder="Edit your message...">${message}</textarea>
            <button type="button" onclick="editPost('${uid}')">Save Changes</button>
        `;
	editFormContainer.appendChild(editForm);
}

function editPost(uid) {
	const editedMessage = document.getElementById("editMessage").value;
	var myHeaders = new Headers();
	myHeaders.append("Content-Type", "application/json");
	const body = {
		// uid: uid,
		message: editedMessage,
	};
	console.log(body);
	const authOptions = {
		method: "DELETE", // Change method to POST
		// mode: 'cors',
		cache: "no-cache",
		headers: myHeaders,
		body: JSON.stringify(body),
		credentials: "include",
	};
	fetch("http://127.0.0.1:8069/api/messages/delete", authOptions)
		.then((response) => {
			if (!response.ok) {
				console.error("Failed to edit post:", response.status);
				return null;
			}
			const contentType = response.headers.get("Content-Type");
			if (contentType && contentType.includes("application/json")) {
				return response.json();
			} else {
				return response.text();
			}
		})
		.then((data) => {
			if (data !== null) {
				console.log("Edit Response:", data);
				// Clear the edit form after editing
				const editFormContainer =
					document.getElementById("editFormContainer");
				editFormContainer.innerHTML = "";
				// Fetch and update posts after editing a message
				fetchPosts(); // Call the fetchPosts function to update the posts
			}
		})
		.catch((error) => {
			console.error("Error:", error);
		});
}
