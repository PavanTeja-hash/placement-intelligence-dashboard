let companiesData = [];
let rolesData = {};

function clearErrors() {
  const errors = document.querySelectorAll(".error-message");

  errors.forEach((error) => {
    error.innerText = "";
  });
}

loadData();

async function loadData() {
  const companiesResponse = await fetch("data/companies.json");

  companiesData = await companiesResponse.json();

  const rolesResponse = await fetch("data/roles.json");

  rolesData = await rolesResponse.json();

  populateRoles();

  document.getElementById("companyCount").innerText = companiesData.length;
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

  clearErrors();

  if (cgpa < 0 || cgpa > 10) {
    document.getElementById("cgpaError").innerText =
      "CGPA must be between 0 and 10";
    return;
  }

  if (dsa < 0 || projects < 0) {
    document.getElementById("cgpaError").innerText =
      "Values cannot be negative";
    return;
  }

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

  clearErrors();

  if (cgpa < 0 || cgpa > 10) {
    document.getElementById("eligibilityError").innerText =
      "CGPA must be between 0 and 10";
    return;
  }

  if (backlogs === "Yes") {
    document.getElementById("companies").innerHTML =
      "<p>Not Eligible Due To Active Backlogs</p>";

    return;
  }

  let output = "";

  companiesData.forEach((company) => {
    if (cgpa >= company.cgpa) {
      output += `
      <div class="company-card">
        <h5>${company.name}</h5>
        <p><strong>Package:</strong> ${company.package}</p>
        <p><strong>Branches:</strong> ${company.branches.join(", ")}</p>
        <p><strong>Minimum CGPA:</strong> ${company.cgpa}</p>
      </div>
      `;
    }
  });

  if (output === "") {
    output = "<p>No Eligible Companies Found</p>";
  }

  document.getElementById("companies").innerHTML = output;
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

  clearErrors();

  if (easy < 0 || medium < 0 || hard < 0) {
    document.getElementById("dsaError").innerText =
      "Problem counts cannot be negative";
    return;
  }

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

  clearErrors();

  if (projects < 0 || internships < 0 || certifications < 0) {
    document.getElementById("resumeError").innerText =
      "Values cannot be negative";
    return;
  }

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

function generateRoadmap() {
  const role = document.getElementById("role").value;

  let roadmap = [];

  switch (role) {
    case "Software Engineer":
      roadmap = [
        "Master Java and OOP",
        "Solve 200+ DSA Problems",
        "Learn SQL and DBMS",
        "Build 2 Major Projects",
        "Practice Mock Interviews",
      ];
      break;

    case "Java Backend Developer":
      roadmap = [
        "Strengthen Core Java",
        "Learn Advanced SQL",
        "Learn Spring Boot",
        "Build REST APIs",
        "Deploy a Backend Project",
      ];
      break;

    case "Frontend Developer":
      roadmap = [
        "Master HTML, CSS, JavaScript",
        "Learn React",
        "Build Responsive Websites",
        "Create Portfolio Projects",
        "Deploy Projects Online",
      ];
      break;

    case "Data Analyst":
      roadmap = [
        "Learn Excel",
        "Master SQL",
        "Learn Power BI",
        "Practice Data Cleaning",
        "Build Analytics Dashboards",
      ];
      break;

    case "Data Scientist":
      roadmap = [
        "Learn Python",
        "Master Pandas and NumPy",
        "Study Machine Learning",
        "Work on Datasets",
        "Build ML Projects",
      ];
      break;

    case "Cloud Engineer":
      roadmap = [
        "Learn Linux",
        "Master Networking Basics",
        "Learn AWS",
        "Study Docker",
        "Learn Terraform",
      ];
      break;

    case "DevOps Engineer":
      roadmap = [
        "Learn Linux",
        "Master Git",
        "Learn Docker",
        "Study Kubernetes",
        "Build CI/CD Pipelines",
      ];
      break;
  }

  let output = "";

  roadmap.forEach((step, index) => {
    output += `
      <div class="roadmap-step">
        Step ${index + 1}: ${step}
      </div>
    `;
  });

  document.getElementById("roadmap").innerHTML = output;
}

function analyzePlacementTracker() {
  let applied = Number(document.getElementById("appliedCompanies").value);

  let oa = Number(document.getElementById("oaCleared").value);

  let interviews = Number(document.getElementById("interviewsCleared").value);

  let offers = Number(document.getElementById("offersReceived").value);

  clearErrors();

  if (applied < 0 || oa < 0 || interviews < 0 || offers < 0) {
    document.getElementById("placementError").innerText =
      "Values cannot be negative";
    return;
  }

  if (oa > applied) {
    document.getElementById("placementError").innerText =
      "OA Cleared cannot exceed Applied Companies";
    return;
  }

  if (interviews > oa) {
    document.getElementById("placementError").innerText =
      "Interviews Cleared cannot exceed OA Cleared";
    return;
  }

  if (offers > interviews) {
    document.getElementById("placementError").innerText =
      "Offers Received cannot exceed Interviews Cleared";
    return;
  }

  let score = 0;

  score += Math.min(applied * 2, 20);
  score += Math.min(oa * 5, 30);
  score += Math.min(interviews * 10, 30);
  score += Math.min(offers * 20, 20);

  if (score > 100) {
    score = 100;
  }

  let status = "";

  if (score < 30) {
    status = "Getting Started";
  } else if (score < 60) {
    status = "Actively Preparing";
  } else if (score < 90) {
    status = "Interview Ready";
  } else {
    status = "Placement Achieved";
  }

  document.getElementById("placementProgress").style.width = score + "%";

  document.getElementById("placementResult").innerText =
    "Placement Progress: " + score.toFixed(0) + "% | Status: " + status;
}

function generateDailyPlan() {
  const hours = Number(document.getElementById("studyHours").value);

  let plan = [];

  clearErrors();

  if (hours <= 0) {
    document.getElementById("plannerError").innerText =
      "Study hours must be greater than 0";
    return;
  }

  if (hours <= 2) {
    plan = [
      "Solve 2 DSA Problems",
      "Revise Java Concepts",
      "Practice 10 Aptitude Questions",
    ];
  } else if (hours <= 4) {
    plan = [
      "Solve 4 DSA Problems",
      "Revise Java + OOP",
      "Practice 20 Aptitude Questions",
      "Work on PlacementIQ Project",
    ];
  } else if (hours <= 6) {
    plan = [
      "Solve 5 DSA Problems",
      "Revise Java + SQL",
      "Practice 25 Aptitude Questions",
      "Work on PlacementIQ Project",
      "Apply to Companies",
    ];
  } else {
    plan = [
      "Solve 6 DSA Problems",
      "Revise Java + SQL + DBMS",
      "Practice 30 Aptitude Questions",
      "Work on PlacementIQ Project",
      "Apply to Companies",
      "Practice Interview Questions",
    ];
  }

  let output = "";

  plan.forEach((step, index) => {
    output += `
      <div class="plan-step">
        Task ${index + 1}: ${step}
      </div>
    `;
  });

  document.getElementById("dailyPlan").innerHTML = output;
}

const allInputs = document.querySelectorAll("input, select");

allInputs.forEach((input) => {
  const savedValue = localStorage.getItem(input.id);

  if (savedValue !== null) {
    input.value = savedValue;
  }

  input.addEventListener("input", () => {
    localStorage.setItem(input.id, input.value);
  });

  input.addEventListener("change", () => {
    localStorage.setItem(input.id, input.value);
  });
});

function clearSavedData() {
  localStorage.clear();

  location.reload();
}
