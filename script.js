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

  let companies = [];

  if (cgpa >= 6.0) companies.push("TCS");
  if (cgpa >= 6.5) companies.push("Infosys");
  if (cgpa >= 7.0) companies.push("Accenture");
  if (cgpa >= 8.0) companies.push("AutoRABIT");

  if (companies.length === 0) {
    document.getElementById("companies").innerText =
      "No Eligible Companies Found";
  } else {
    document.getElementById("companies").innerText =
      "Eligible Companies: " + companies.join(", ");
  }
}

function analyzeSkills() {
  const role = document.getElementById("role").value;

  const roleSkills = {
    "Software Engineer": ["Java", "DSA", "SQL", "Git", "OOP"],

    "Java Backend Developer": [
      "Java",
      "SQL",
      "Spring Boot",
      "Git",
      "REST APIs",
    ],

    "Data Analyst": ["Python", "SQL", "Excel", "Power BI", "Statistics"],

    "Data Scientist": ["Python", "SQL", "Pandas", "NumPy", "Machine Learning"],

    "Frontend Developer": ["HTML", "CSS", "JavaScript", "Git"],
  };

  const selectedSkills = [];

  document
    .querySelectorAll('.skills input[type="checkbox"]:checked')
    .forEach((skill) => {
      selectedSkills.push(skill.value);
    });

  const requiredSkills = roleSkills[role];

  const missingSkills = requiredSkills.filter(
    (skill) => !selectedSkills.includes(skill),
  );

  if (missingSkills.length === 0) {
    document.getElementById("missingSkills").innerText =
      "You Are Ready For This Career Path";
  } else {
    document.getElementById("missingSkills").innerText =
      "Missing Skills: " + missingSkills.join(", ");
  }
}

document.getElementById("role").addEventListener("change", function () {
  document
    .querySelectorAll('.skills input[type="checkbox"]')
    .forEach((skill) => {
      skill.checked = false;
    });

  document.getElementById("missingSkills").innerText = "";
});

function analyzeDSA() {
  let easy = Number(document.getElementById("easy").value);

  let medium = Number(document.getElementById("medium").value);

  let hard = Number(document.getElementById("hard").value);

  let total = easy + medium + hard;

  let level = "";

  if (total < 50) {
    level = "Beginner";
  } else if (total < 150) {
    level = "Intermediate";
  } else {
    level = "Advanced";
  }

  document.getElementById("dsaResult").innerText =
    "Total Solved: " + total + " | Level: " + level;
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

  let dsa = easy + medium + hard;

  let score = 0;

  score += Math.min(projects * 10, 30);
  score += Math.min(internships * 25, 25);
  score += Math.min(certifications * 5, 15);
  score += Math.min(dsa / 5, 30);

  let status = "";

  if (score < 40) {
    status = "Beginner";
  } else if (score < 70) {
    status = "Placement Ready";
  } else {
    status = "Highly Competitive";
  }

  document.getElementById("resumeResult").innerText =
    "Resume Score: " + score.toFixed(0) + "/100 | Status: " + status;
}
