"use strict";

let students = [];
let mostRecentlyAddedStudentId = null;

const STORAGE_KEY = "lab3_students";
const DEFAULT_STUDENTS = fetch("Students.json")
    .then((response) => response.json())
    .catch((err) => {
        console.error("Error fetching JSON:", err);
        return [];
    });

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
        // if (
        //     mostRecentlyAddedStudentId &&
        //     studentId === mostRecentlyAddedStudentId
        // ) {
        //     card.style.border = "2px solid #2e7d32";
        //     card.style.backgroundColor = "#e8f5e9";
        //     card.style.boxShadow = "0 0 0 2px rgba(46,125,50,0.2)";
        // }
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

function sortStudentsData(data, sortBy = "name") {
    return [...data].sort((a, b) => {
        if (sortBy === "age") {
            const firstAge = Number(a.age) || 0;
            const secondAge = Number(b.age) || 0;
            return firstAge - secondAge;
        }

        const firstName = String(a.name ?? "").toLowerCase();
        const secondName = String(b.name ?? "").toLowerCase();
        return firstName.localeCompare(secondName);
    });
}

function setupSearch() {
    const searchForm = document.getElementById("searchForm");
    const searchInput = document.getElementById("searchInput");
    const sortByInput = document.getElementById("sortBy");
    // const sortOrderInput = document.getElementById("sortOrder");
    const searchResult = document.getElementById("searchResult");
    const clearButton = document.getElementById("clearSearch");

    if (!searchForm || !searchInput) return;

    const applySearchAndSort = (requireQuery = true) => {
        const query = searchInput.value;
        const trimmedQuery = query.trim();

        if (requireQuery && trimmedQuery === "") {
            clearList();
            if (searchResult) searchResult.textContent = "Enter a search term.";
            return;
        }

        const filtered = trimmedQuery === "" ? students : filterStudents(query);
        const sorted = sortStudentsData(
            filtered,
            sortByInput ? sortByInput.value : "name"
        );

        renderList(sorted);

        if (searchResult) {
            searchResult.textContent = trimmedQuery === ""
                ? "Showing all students."
                : `Found ${sorted.length} student(s).`;
        }
    };

    searchForm.addEventListener("submit", (event) => {
        event.preventDefault();
        applySearchAndSort(true);
    });

    if (sortByInput) {
        sortByInput.addEventListener("change", () => {
            applySearchAndSort(false);
        });
    }

    if (clearButton) {
        clearButton.addEventListener("click", () => {
            searchInput.value = "";
            if (sortByInput) sortByInput.value = "name";
            // if (sortOrderInput) sortOrderInput.value = "asc";
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

function saveStoredStudents(data) { //puts data into local array storage
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function createStudent(student) { // creates the student
    const newId = String(student.id).trim().toLowerCase();
    if (
        students.some(
            (existingStudent) =>
                String(existingStudent.id).trim().toLowerCase() === newId
        )
    ) {
        throw new Error("ID already exists.");
    }
    // students.json.push(student);
    students.push(student);
    mostRecentlyAddedStudentId = newId;
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
        if(/\d/.test(name)){
            if (result) result.textContent = "Name cannot contain numbers.";
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
        const defaultStudents = await DEFAULT_STUDENTS;
        students = stored ?? [...defaultStudents];
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