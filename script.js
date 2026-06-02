let companiesData = [];
let rolesData = {};

loadData();

async function loadData() {
  const companiesResponse = await fetch("data/companies.json");

  companiesData = await companiesResponse.json();

  const rolesResponse = await fetch("data/roles.json");

  rolesData = await rolesResponse.json();

  populateRoles();
}

function populateRoles() {
  const roleDropdown = document.getElementById("role");

  roleDropdown.innerHTML = "";

  Object.keys(rolesData).forEach((role) => {
    const option = document.createElement("option");

    option.value = role;
    option.textContent = role;

    roleDropdown.appendChild(option);
  });

  updateSkills();

  roleDropdown.addEventListener("change", updateSkills);
}

function updateSkills() {
  const role = document.getElementById("role").value;

  const skillsContainer = document.getElementById("skillsContainer");

  skillsContainer.innerHTML = "";

  rolesData[role].forEach((skill) => {
    skillsContainer.innerHTML += `<input type="checkbox" value="${skill}">
            ${skill}<br>`;
  });

  document.getElementById("missingSkills").innerText = "";
}

function calculateScore() {
  let cgpa = Number(document.getElementById("cgpa").value);

  let dsa = Number(document.getElementById("dsa").value);

  let projects = Number(document.getElementById("projects").value);

  let score = 0;

  score += cgpa * 5;
  score += dsa * 0.5;
  score += projects * 10;

  if (score > 100) {
    score = 100;
  }

  document.getElementById("score").innerText = score.toFixed(0) + "%";
}

function checkEligibility() {
  let cgpa = Number(document.getElementById("eligibilityCgpa").value);

  let backlogs = document.getElementById("backlogs").value;

  if (backlogs === "Yes") {
    document.getElementById("companies").innerText =
      "Not Eligible Due To Active Backlogs";

    return;
  }

  let eligibleCompanies = [];

  companiesData.forEach((company) => {
    if (cgpa >= company.cgpa) {
      eligibleCompanies.push(`${company.name} (${company.package})`);
    }
  });

  if (eligibleCompanies.length === 0) {
    document.getElementById("companies").innerText =
      "No Eligible Companies Found";
  } else {
    document.getElementById("companies").innerText =
      eligibleCompanies.join(", ");
  }
}

function analyzeSkills() {
  const role = document.getElementById("role").value;

  const selectedSkills = [];

  document
    .querySelectorAll('#skillsContainer input[type="checkbox"]:checked')
    .forEach((skill) => {
      selectedSkills.push(skill.value);
    });

  const requiredSkills = rolesData[role];

  const readiness = (selectedSkills.length / requiredSkills.length) * 100;

  let status = "";

  if (readiness < 40) {
    status = "Beginner";
  } else if (readiness < 70) {
    status = "Intermediate";
  } else if (readiness < 100) {
    status = "Almost Ready";
  } else {
    status = "Ready";
  }

  document.getElementById("careerProgress").style.width = readiness + "%";

  document.getElementById("missingSkills").innerText =
    "Career Readiness: " + readiness.toFixed(0) + "% | Status: " + status;
}

function analyzeDSA() {
  let easy = Number(document.getElementById("easy").value);

  let medium = Number(document.getElementById("medium").value);

  let hard = Number(document.getElementById("hard").value);

  let score = easy + medium * 2 + hard * 3;

  let readiness = (score / 500) * 100;

  if (readiness > 100) {
    readiness = 100;
  }

  let level = "";

  if (readiness < 40) {
    level = "Beginner";
  } else if (readiness < 70) {
    level = "Intermediate";
  } else {
    level = "Advanced";
  }

  document.getElementById("dsaProgress").style.width = readiness + "%";

  document.getElementById("dsaResult").innerText =
    "DSA Score: " + score + "/500 | Level: " + level;
}

function analyzeResume() {
  let projects = Number(document.getElementById("resumeProjects").value);

  let internships = Number(document.getElementById("resumeInternships").value);

  let certifications = Number(
    document.getElementById("resumeCertifications").value,
  );

  let easy = Number(document.getElementById("easy").value);

  let medium = Number(document.getElementById("medium").value);

  let hard = Number(document.getElementById("hard").value);

  let dsaScore = easy + medium * 2 + hard * 3;

  let score = 0;

  score += Math.min(projects * 10, 30);
  score += Math.min(internships * 25, 25);
  score += Math.min(certifications * 5, 15);
  score += Math.min((dsaScore / 500) * 30, 30);

  let status = "";

  if (score < 40) {
    status = "Beginner";
  } else if (score < 70) {
    status = "Placement Ready";
  } else {
    status = "Highly Competitive";
  }

  document.getElementById("resumeProgress").style.width = score + "%";

  document.getElementById("resumeResult").innerText =
    "Resume Score: " + score.toFixed(0) + "/100 | Status: " + status;
}
