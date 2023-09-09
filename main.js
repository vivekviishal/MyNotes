function getNotesFromLocalStorage() {
        return JSON.parse(localStorage.getItem('notes')) || [];
}

function saveNotesToLocalStorage(notes) {
    localStorage.setItem('notes', JSON.stringify(notes));
}

function displayNotes() {
    const notesList = document.getElementById('notes-list');
    notesList.innerHTML = '';

    const notes = getNotesFromLocalStorage();

    notes.forEach((note, index) => {
        const noteDiv = document.createElement('div');
        noteDiv.className = "container-div";
        noteDiv.classList.add('note');

        const deleteButton = document.createElement('span');
        deleteButton.classList.add('delete-btn', 'text-danger', `delete-btn-${index}`); // Add 'text-danger' class for red color
        deleteButton.innerHTML = '<i class="delete-icon fa-solid fa-trash"style="font-size: 15px;"></i>'; // Font Awesome trash icon
        deleteButton.addEventListener('click', () => deleteNote(index));
        deleteButton.addEventListener('mouseenter', () => handleDeleteButtonHover(index));
        deleteButton.addEventListener('mouseleave', () => handleDeleteButtonUnhover(index));

        const noteContent = document.createElement('span');
        noteContent.classList.add('content-div');
        noteContent.textContent = note;

        noteDiv.appendChild(deleteButton);
        noteDiv.appendChild(noteContent);
        notesList.appendChild(noteDiv);
    });
}

function addNote() {
    const noteInput = document.getElementById('note-input');
    const noteText = noteInput.value.trim();

    if (noteText === '') {
        alert('Please enter a valid note.');
        return;
    }

    const notes = getNotesFromLocalStorage();
    notes.push(noteText);
    saveNotesToLocalStorage(notes);

    noteInput.value = '';
    displayNotes();
}

function deleteNote(index) {
    const notes = getNotesFromLocalStorage();
    notes.splice(index, 1);
    saveNotesToLocalStorage(notes);
    displayNotes();
}
function handleDeleteButtonHover(index) {
    const deleteButton = document.querySelector(`.delete-btn-${index}`);
    deleteButton.classList.add('fa-bounce');
}

function handleDeleteButtonUnhover(index) {
    const deleteButton = document.querySelector(`.delete-btn-${index}`);
    deleteButton.classList.remove('fa-bounce');
}

document.getElementById('add-note-btn').addEventListener('click', addNote);
displayNotes();