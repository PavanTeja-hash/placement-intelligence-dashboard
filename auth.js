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
        password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      document.getElementById("registerError").innerText = data.message;
      return;
    }

    document.getElementById("registerSuccess").innerText = data.message;
  } catch (error) {
    document.getElementById("registerError").innerText =
      "Unable to connect to server";
  }
}

async function loginUser() {
  const email = document.getElementById("loginEmail").value.trim();

  const password = document.getElementById("loginPassword").value;

  document.getElementById("loginError").innerText = "";

  try {
    const response = await fetch("http://localhost:3000/login", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      document.getElementById("loginError").innerText = data.message;
      return;
    }

    localStorage.setItem("isLoggedIn", "true");

    window.location.href = "index.html";
  } catch (error) {
    document.getElementById("loginError").innerText =
      "Unable to connect to server";
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
