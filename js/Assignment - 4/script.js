// ====== GLOBAL DATA ======
let employees = JSON.parse(localStorage.getItem("employees")) || [];

// ====== DOM REFERENCES ======
const form = document.getElementById("employeeForm");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const deptInput = document.getElementById("department");
const certifiedInput = document.getElementById("certified");
const tableBody = document.getElementById("employeeTable");

const totalCount = document.getElementById("totalCount");
const certifiedCount = document.getElementById("certifiedCount");
const commonSkill = document.getElementById("commonSkill");

// ====== VALIDATION ======
function showError(input, message) {
  input.parentElement.querySelector(".error").textContent = message;
}

function clearError(input) {
  input.parentElement.querySelector(".error").textContent = "";
}

function validateName() {
  if (nameInput.value.trim().length < 3) {
    showError(nameInput, "Minimum 3 characters required");
    return false;
  }
  clearError(nameInput);
  return true;
}

function validateEmail() {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regex.test(emailInput.value.trim())) {
    showError(emailInput, "Invalid email format");
    return false;
  }
  clearError(emailInput);
  return true;
}

function validateDepartment() {
  if (deptInput.value === "") {
    showError(deptInput, "Please select a department");
    return false;
  }
  clearError(deptInput);
  return true;
}

function validateSkills() {
  const checked = document.querySelectorAll(".checkbox-group input:checked");
  if (checked.length === 0) {
    showError(document.querySelector(".checkbox-group").parentElement, "Select at least one skill");
    return false;
  }
  clearError(document.querySelector(".checkbox-group").parentElement);
  return true;
}

// ====== FORM SUBMIT ======
form.addEventListener("submit", function(e) {
  e.preventDefault();

  const isValid =
    validateName() &
    validateEmail() &
    validateDepartment() &
    validateSkills();

  if (!isValid) return;

  const skills = [...document.querySelectorAll(".checkbox-group input:checked")]
    .map(cb => cb.value);

  const employee = {
    id: Date.now(),
    name: nameInput.value.trim(),
    email: emailInput.value.trim(),
    department: deptInput.value,
    skills,
    certified: certifiedInput.checked
  };

  employees.push(employee);
  saveToStorage();
  renderTable(employees);
  updateStats();
  form.reset();

  document.getElementById("successMsg").textContent = "Employee added successfully!";
  setTimeout(() => document.getElementById("successMsg").textContent = "", 3000);
});

// ====== BLUR VALIDATION ======
nameInput.addEventListener("blur", validateName);
emailInput.addEventListener("blur", validateEmail);
deptInput.addEventListener("blur", validateDepartment);

// ====== RENDER TABLE ======
function renderTable(data) {
  tableBody.innerHTML = "";

  data.forEach(emp => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${emp.name}</td>
      <td>${emp.email}</td>
      <td>${emp.department}</td>
      <td>${emp.skills.join(", ")}</td>
      <td>${emp.certified ? "Yes" : "No"}</td>
      <td><button onclick="deleteEmployee(${emp.id})">Delete</button></td>
    `;

    tableBody.appendChild(row);
  });
}

// ====== DELETE ======
function deleteEmployee(id) {
  employees = employees.filter(emp => emp.id !== id);
  saveToStorage();
  renderTable(employees);
  updateStats();
}

// ====== FILTERS ======
document.querySelectorAll(".filter").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".filter").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const filter = btn.dataset.filter;

    let filtered = employees;

    if (filter === "certified") {
      filtered = employees.filter(emp => emp.certified);
    } else if (filter !== "all") {
      filtered = employees.filter(emp => emp.department === filter);
    }

    renderTable(filtered);
  });
});

// ====== STATS ======
function updateStats() {
  totalCount.textContent = employees.length;

  const certifiedTotal = employees.filter(emp => emp.certified).length;
  certifiedCount.textContent = certifiedTotal;

  const skillMap = employees.reduce((acc, emp) => {
    emp.skills.forEach(skill => {
      acc[skill] = (acc[skill] || 0) + 1;
    });
    return acc;
  }, {});

  let maxSkill = "-";
  let maxCount = 0;

  for (let skill in skillMap) {
    if (skillMap[skill] > maxCount) {
      maxCount = skillMap[skill];
      maxSkill = skill;
    }
  }

  commonSkill.textContent = maxSkill;
}

// ====== STORAGE ======
function saveToStorage() {
  localStorage.setItem("employees", JSON.stringify(employees));
}

// ====== INITIAL LOAD ======
renderTable(employees);
updateStats();
