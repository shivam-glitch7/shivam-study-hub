// ===============================
// SHIVAM STUDY HUB - script.js
// ===============================

// ---------- Dark Mode ----------
const themeBtn = document.getElementById("themeBtn");

themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    if(document.body.classList.contains("dark")){
        localStorage.setItem("theme","dark");
    }else{
        localStorage.setItem("theme","light");
    }
});

if(localStorage.getItem("theme") === "dark"){
    document.body.classList.add("dark");
}

// ---------- Notes ----------
const saveBtn = document.getElementById("saveBtn");
const noteTitle = document.getElementById("noteTitle");
const noteText = document.getElementById("noteText");
const notesContainer = document.getElementById("notesContainer");
const search = document.getElementById("search");

let notes = JSON.parse(localStorage.getItem("notes")) || [];

function saveNotes(){
    localStorage.setItem("notes", JSON.stringify(notes));
}

function displayNotes(list = notes){

    notesContainer.innerHTML = "";

    if(list.length === 0){
        notesContainer.innerHTML =
        "<p>No notes available.</p>";
        return;
    }

    list.forEach((note,index)=>{

        const div = document.createElement("div");
        div.className = "note";

        div.innerHTML = `
            <h3>${note.title}</h3>
            <p>${note.text}</p>
            <button onclick="deleteNote(${index})">
                Delete
            </button>
        `;

        notesContainer.appendChild(div);

    });

}

saveBtn.addEventListener("click",()=>{

    if(noteTitle.value.trim()==="" || noteText.value.trim()===""){
        alert("Please enter title and notes.");
        return;
    }

    notes.push({
        title:noteTitle.value,
        text:noteText.value
    });

    saveNotes();

    displayNotes();

    noteTitle.value="";
    noteText.value="";

});

function deleteNote(index){

    if(confirm("Delete this note?")){

        notes.splice(index,1);

        saveNotes();

        displayNotes();

    }

}

search.addEventListener("keyup",()=>{

    let keyword = search.value.toLowerCase();

    let filtered = notes.filter(note=>

        note.title.toLowerCase().includes(keyword) ||

        note.text.toLowerCase().includes(keyword)

    );

    displayNotes(filtered);

});

displayNotes();


// ---------- Study Planner ----------
const taskInput = document.getElementById("taskInput");
const addTask = document.getElementById("addTask");
const taskList = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks(){

    localStorage.setItem("tasks",JSON.stringify(tasks));

}

function displayTasks(){

    taskList.innerHTML="";

    tasks.forEach((task,index)=>{

        const li=document.createElement("li");

        li.innerHTML=`
        ${task}
        <button class="deleteTask"
        onclick="deleteTask(${index})">
        Delete
        </button>
        `;

        taskList.appendChild(li);

    });

}

addTask.addEventListener("click",()=>{

    if(taskInput.value.trim()===""){

        alert("Enter a task.");

        return;

    }

    tasks.push(taskInput.value);

    saveTasks();

    displayTasks();

    taskInput.value="";

});

function deleteTask(index){

    tasks.splice(index,1);

    saveTasks();

    displayTasks();

}

displayTasks();


// ---------- Welcome ----------
console.log("Welcome to Shivam Study Hub");