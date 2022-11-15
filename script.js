const list = document.getElementById("notes");
const noteIdEl = document.getElementById("note-id");
const noteTextEl = document.getElementById("note-text");
const noteForm = document.getElementById("note-form");

let notes = [];

function getNotesFromLocalStorage() {
    if(localStorage.getItem("notes")) {
        notes =  JSON.parse(localStorage.getItem('notes'));
    }
}

function setNotesToLocalStorage() {
    localStorage.setItem("notes", JSON.stringify(notes));
}

function addNote() {
    const text = noteTextEl.value;
    const id = noteIdEl.value;

    if(text && id) {
        notes.push({id, text});
        setNotesToLocalStorage();
        renderNotes();
    }
}

function deleteNote(deleteBtn) {
    const noteItem = deleteBtn.parentElement.parentElement;
    const noteId = noteItem.id;
    notes = notes.filter((note) => note.id !== noteId);
    setNotesToLocalStorage();
    renderNotes();
}

function editNote(editBtn) {
    const noteItem = editBtn.parentElement.parentElement;
    const noteId = noteItem.id;

    const selectedNote = notes.find((note) => note.id === noteId);

    notes = notes.filter((note) => note.id !== noteId);
    setNotesToLocalStorage();
    renderNotes();
    
    noteIdEl.value = selectedNote.id;
    noteTextEl.value = selectedNote.text;
}

function renderNotes() {

    while(list.firstChild) {
        list.firstChild.remove();
    }

    if(notes.length === 0) {
        list.innerHTML = `
            <h2>No Notes Available!</h2>
        `
    }

    notes.map((note) => {
        const div = document.createElement("div");
        div.classList.add("note");
        div.id = note.id;
        div.innerHTML = `
        <div class="note-text">${note.text}</div>
        <div class="note-options">
            <button class="edit-btn"><i class="bi bi-pen"></i></button>
            <button class="delete-btn"><i class="bi bi-trash"></i></button>
        </div>
        `
        list.append(div);
    })

    let deleteBtns = document.getElementsByClassName("delete-btn");
    for(let deleteBtn of deleteBtns) {
        deleteBtn.addEventListener('click',function() {
            deleteNote(this);
        });
    }

    let editBtns = document.getElementsByClassName("edit-btn");
    for(let editBtn of editBtns) {
        editBtn.addEventListener('click',function() {
            editNote(this);
        });
    }
}

noteForm.addEventListener('submit', (e) => {
    e.preventDefault();
    addNote();
    noteForm.reset();
})

getNotesFromLocalStorage();
renderNotes();


