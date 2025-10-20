/* ===========================
   SCRIPT.JS — SIGNUP + REGISTRATION LOGIC
   =========================== */

/* ===========================
   1. SIGNUP PAGE FUNCTIONALITY
   =========================== */

// Check if we're on the signup page by checking if the button exists
const signupBtn = document.querySelector(".signin_btn");

// If signup button exists, it means we are on index.html
if (signupBtn) {
  const signupForm = document.querySelector("form");

  signupForm.addEventListener("submit", function (e) {
    e.preventDefault(); // stop the page from refreshing

    // Get input values from the signup form
    const name = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm_password").value;

    // Basic password confirmation check
    if (password !== confirmPassword) {
      alert("Passwords do not match. Please try again.");
      return;
    }

    // Save signup data to localStorage
    localStorage.setItem("signup_name", name);
    localStorage.setItem("signup_email", email);
    localStorage.setItem("signup_password", password);

    // Redirect to the registration page
    window.location.href = "student_info.html";
  });
}

/* ===========================
   2. REGISTRATION PAGE FUNCTIONALITY
   =========================== */

// Check if we're on the registration page
const regForm = document.querySelector(".student-form");

if (regForm) {
  /* ========= 2.1 Populate country dropdown ========= */
  const countrySelect = document.getElementById("country");

  // If you already have static options in HTML, this is optional.
  // But here's how to fill dynamically (you can add more countries as needed):
  const countries = [
    { code: "za", name: "South Africa" },
    { code: "us", name: "United States" },
    { code: "gb", name: "United Kingdom" },
    { code: "ng", name: "Nigeria" },
    { code: "in", name: "India" },
    { code: "ca", name: "Canada" },
  ];

  countries.forEach((country) => {
    const option = document.createElement("option");
    option.value = country.code;
    option.textContent = country.name;
    countrySelect.appendChild(option);
  });

  /* ========= 2.2 Pre-fill the name & email from signup page ========= */
  const savedName = localStorage.getItem("signup_name");
  const savedEmail = localStorage.getItem("signup_email");

  // If you want to show the name or email in some input (optional)
  // For example, if you have name/email inputs in registration too:
  if (document.getElementById("name")) {
    document.getElementById("name").value = savedName || "";
  }
  if (document.getElementById("email")) {
    document.getElementById("email").value = savedEmail || "";
  }

  /* ========= 2.3 Handle form submission ========= */
  regForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Collect all registration info from inputs
    const studentInfo = {
      firstName: document.getElementById("name")?.value || "",
      lastName: document.getElementById("last_name")?.value || "",
      dob: document.getElementById("date_of_birth")?.value || "",
      gender: document.getElementById("gender")?.value || "",
      address: document.getElementById("address")?.value || "",
      city: document.getElementById("city")?.value || "",
      state: document.getElementById("state")?.value || "",
      zip: document.getElementById("zip")?.value || "",
      country: document.getElementById("country")?.value || "",
      phone: document.getElementById("phone")?.value || "",
      studentId: document.getElementById("student_id")?.value || "",
      course: document.getElementById("course")?.value || "",
      email: savedEmail || "", // from signup page
    };

    // Save the student info as one object
    localStorage.setItem("student_info", JSON.stringify(studentInfo));

    // Show confirmation
    alert("Registration successful! 🎉");

    // Optionally, redirect to another page (like a dashboard.html)
    // window.location.href = "dashboard.html";
  });
}

/* ===========================
   3. HOW TO RETRIEVE DATA LATER (example)
   ===========================
   const student = JSON.parse(localStorage.getItem("student_info"));
   console.log(student.firstName);
*/

/* ===============================
   STUDENT REGISTRATION - SAVE DATA
=============================== */
const studentForm = document.getElementById("student-form");

if (studentForm) {
  studentForm.addEventListener("submit", function (e) {
    e.preventDefault(); // prevent the page from refreshing

    // Grab values from the form inputs
    const firstName = document.getElementById("firstName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const email = document.getElementById("email").value.trim();
    const country = document.getElementById("country").value;

    // Create a student object
    const newStudent = { firstName, lastName, email, country };

    // Get any previously saved students OR create empty array
    const allStudents = JSON.parse(localStorage.getItem("allStudents")) || [];

    // Add the new student
    allStudents.push(newStudent);

    // Save updated array back to localStorage
    localStorage.setItem("allStudents", JSON.stringify(allStudents));

    // Give feedback to user
    alert("✅ Student successfully registered!");

    // Optional: clear form after submission
    studentForm.reset();
  });
}

/* ===============================
   ADMIN VIEW - DISPLAY ALL STUDENTS
=============================== */
const studentList = document.getElementById("student-list");

if (studentList) {
  const allStudents = JSON.parse(localStorage.getItem("allStudents")) || [];

  if (allStudents.length === 0) {
    const row = document.createElement("tr");
    const cell = document.createElement("td");
    cell.colSpan = 4;
    cell.textContent = "No students registered yet.";
    row.appendChild(cell);
    studentList.appendChild(row);
  } else {
    allStudents.forEach(student => {
      const row = document.createElement("tr");

      row.innerHTML = `
        <td>${student.firstName}</td>
        <td>${student.lastName}</td>
        <td>${student.email}</td>
        <td>${student.country}</td>
      `;

      studentList.appendChild(row);
    });
  }
}
