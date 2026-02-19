"use strict";

let students = [];
const STORAGE_KEY = "lab3_students";
const DEFAULT_STUDENTS = [
    { id: 1, name: "John", age: 21, course: "CS" },
    { id: 2, name: "Jim", age: 22, course: "IT" },
    { id: 3, name: "Joe", age: 20, course: "SE" }
];

function escapeHtml(str = "") {
    return String(str)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

function renderList(data) {
    const container = document.getElementById("Home");
    if (!container) return;
    container.innerHTML = "";

    if (!Array.isArray(data) || data.length === 0) {
        container.textContent = "No students available.";
        return;
    }

    const wrapper = document.createElement("div");
    wrapper.className = "students-list";

    data.forEach((student) => {
        const card = document.createElement("div");
        card.className = "student-card";
        card.style.border = "1px solid #ccc";
        card.style.padding = "8px";
        card.style.margin = "8px 0";
        card.style.borderRadius = "4px";
        card.style.boxShadow = "0 2px 4px rgba(61, 44, 44, 0.77)";

        const name = document.createElement("h3");
        name.textContent = student.name ?? "Unnamed";

        const details = document.createElement("div");
        details.innerHTML =
            `<div><strong>ID:</strong> ${escapeHtml(student.id)}</div>` +
            `<div><strong>Age:</strong> ${escapeHtml(student.age)}</div>` +
            `<div><strong>Course:</strong> ${escapeHtml(student.course)}</div>`;

        card.appendChild(name);
        card.appendChild(details);
        wrapper.appendChild(card);
    });

    container.appendChild(wrapper);
}

function clearList() {
    const container = document.getElementById("Home");
    if (container) container.innerHTML = "";
}

function filterStudents(query) {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return students;

    return students.filter((student) => {
        const name = String(student.name ?? "").toLowerCase();
        const id = String(student.id ?? "").toLowerCase();
        const course = String(student.course ?? "").toLowerCase();
        return name.includes(normalizedQuery) || 
        id.includes(normalizedQuery) || course.includes(normalizedQuery);
    });
}

function setupSearch() {
    const searchForm = document.getElementById("searchForm");
    const searchInput = document.getElementById("searchInput");
    const searchResult = document.getElementById("searchResult");
    const clearButton = document.getElementById("clearSearch");

    if (!searchForm || !searchInput) return;

    searchForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const query = searchInput.value;
        if (query.trim() === "") {
            clearList();
            if (searchResult) searchResult.textContent = "Enter a search term.";
            return;
        }

        const filtered = filterStudents(query);
        renderList(filtered);

        if (searchResult) {
            if (query.trim() === "") {
                searchResult.textContent = "Showing all students.";
            } else {
                searchResult.textContent = `Found ${filtered.length} student(s).`;
            }
        }
    });

    if (clearButton) {
        clearButton.addEventListener("click", () => {
            searchInput.value = "";
            renderList(students);
            if (searchResult) searchResult.textContent = "Showing all students.";
        });
    }
}

function readStoredStudents() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return null;
        const parsed = JSON.parse(raw);
        return Array.isArray(parsed) ? parsed : null;
    } catch {
        return null;
    }
}

function saveStoredStudents(data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function createStudent(student) {
    const newId = String(student.id).trim().toLowerCase();
    if (students.some((existingStudent) => String(existingStudent.id).trim().toLowerCase() === newId)) {
        throw new Error("ID already exists.");
    }

    students.push(student);
    saveStoredStudents(students);
    return student;
}

function setupAddForm() {
    const form = document.getElementById("addStudentForm");
    const result = document.getElementById("addResult");
    if (!form) return;

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        if (result) result.textContent = "";

        const id = form.id.value.trim();
        const name = form.name.value.trim();
        const age = Number(form.age.value);
        const course = form.course.value.trim();

        if (id === "" || !name || !age || !course) {
            if (result) result.textContent = "Please fill out all fields correctly.";
            return;
        }

        try {
            createStudent({ id, name, age, course });
            renderList(students);
            if (result) result.textContent = "Student added successfully.";
            form.reset();
            form.id.focus();
        } catch (error) {
            if (result) result.textContent = error.message;
            console.error(error);
        }
    });
}

async function loadStudents() {
    try {
        const stored = readStoredStudents();
        students = stored ?? [...DEFAULT_STUDENTS];
        if (!stored) saveStoredStudents(students);
        renderList(students);
    } catch {
        const container = document.getElementById("Home");
        if (container) container.textContent = "Error loading students from local storage.";
    }
}

document.addEventListener("DOMContentLoaded", async () => {
    setupSearch();
    setupAddForm();
    await loadStudents();
});