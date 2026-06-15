const currentPage = window.location.pathname;

if (
  currentPage.includes("login.html") &&
  localStorage.getItem("isLoggedIn") === "true"
) {
  window.location.href = "index.html";
}

async function registerUser() {
  const name = document.getElementById("registerName").value.trim();

  const email = document.getElementById("registerEmail").value.trim();

  const password = document.getElementById("registerPassword").value;

  const confirmPassword = document.getElementById("confirmPassword").value;

  document.getElementById("registerError").innerText = "";

  document.getElementById("registerSuccess").innerText = "";

  if (!name || !email || !password || !confirmPassword) {
    document.getElementById("registerError").innerText =
      "All fields are required";
    return;
  }

  if (password !== confirmPassword) {
    document.getElementById("registerError").innerText =
      "Passwords do not match";
    return;
  }

  try {
    const response = await fetch("http://localhost:3000/register", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        name,
        email,
      }),
    });

    const data = await response.json();

    localStorage.setItem(
      "placementIQUser",
      JSON.stringify({
        name,
        email,
        password,
      }),
    );

    document.getElementById("registerSuccess").innerText = data.message;
  } catch (error) {
    document.getElementById("registerError").innerText =
      "Unable to connect to server";
  }
}

function loginUser() {
  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value;

  document.getElementById("loginError").innerText = "";

  const storedUser = JSON.parse(localStorage.getItem("placementIQUser"));
  console.log("Entered Email:", email);
  console.log("Entered Password:", password);
  console.log("Stored User:", storedUser);

  if (!storedUser) {
    document.getElementById("loginError").innerText =
      "No account found. Please register first.";
    return;
  }

  if (email === storedUser.email && password === storedUser.password) {
    localStorage.setItem("isLoggedIn", "true");

    window.location.href = "index.html";
  } else {
    document.getElementById("loginError").innerText =
      "Invalid email or password";
  }
}

function logoutUser() {
  const fieldsToClear = [
    "cgpa",
    "dsa",
    "projects",
    "eligibilityCgpa",
    "backlogs",
    "easy",
    "medium",
    "hard",
    "resumeProjects",
    "resumeInternships",
    "resumeCertifications",
    "appliedCompanies",
    "oaCleared",
    "interviewsCleared",
    "offersReceived",
    "studyHours",
  ];

  fieldsToClear.forEach((field) => {
    localStorage.removeItem(field);
  });

  localStorage.removeItem("isLoggedIn");

  window.location.href = "login.html";
}
