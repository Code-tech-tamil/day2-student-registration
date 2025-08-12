// ================= Welcome Alert =================
window.addEventListener("load", () => {
  alert("Welcome to the Advanced Student Registration Page!");
});

// ================= Form Validation =================
document.getElementById("registrationForm").addEventListener("submit", function(e) {
  e.preventDefault();

  let name = document.getElementById("name").value.trim();
  let email = document.getElementById("email").value.trim();
  let department = document.getElementById("department").value;
  let year = document.getElementById("year").value;
  let projectTitle = document.getElementById("projectTitle").value.trim();

  if (!name || !email || !department || !year || !projectTitle) {
    alert("All fields must be filled!");
    return;
  }

  let emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
  if (!emailPattern.test(email)) {
    alert("Invalid email format!");
    return;
  }

  alert("Registration Successful");
  document.getElementById("registrationForm").reset();
});

// ================= Click Me Button Activity =================
const colorBtn = document.getElementById("colorChangeBtn");
const colors = ["#ffcccc", "#ccffcc", "#ccccff", "#ffffcc"];
let colorIndex = 0;

colorBtn.addEventListener("click", () => {
  document.body.style.backgroundColor = colors[colorIndex];
  document.querySelector("h1").textContent = `Theme Color Changed to ${colors[colorIndex]}`;
  colorIndex = (colorIndex + 1) % colors.length;
});
