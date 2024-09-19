// const Product = require("../../models/Product.js");

function displaySelectedImage(event, elementId) {
  const selectedImage = document.getElementById(elementId);
  const fileInput = event.target;

  if (fileInput.files && fileInput.files[0]) {
    const reader = new FileReader();

    reader.onload = function (e) {
      selectedImage.src = e.target.result;
    };

    reader.readAsDataURL(fileInput.files[0]);
  }
}

function deleteUser(userId) {
  fetch(`/users/${userId}/delete`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        window.location.href = "/users"; // Redirect setelah berhasil
      } else {
        console.error("Error deleting user");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
