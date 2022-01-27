var container = document.querySelector('.main');
var new_note_btn = document.querySelector('.add-btn');
var delete_btn = document.querySelector('.remove-all');

window.onload = () => {
    get_notes().forEach(note => {
        new_note(note.id, note.content)
        
    });
}

if(localStorage == "") {
    delete_btn.disabled = true;
}

function get_notes() {
    return JSON.parse(localStorage.getItem("sticky_notes") || "[]");
}

function save_notes(notes_arr) {
    localStorage.setItem("sticky_notes", JSON.stringify(notes_arr))
}


new_note_btn.onclick = () => {
    note_obj()
    delete_btn.disabled = false;
    
}


function new_note(id, content) {
    var element = document.createElement("textarea")
    element.classList.add("text")
    element.value = content
    element.placeholder = "double click to delete"
    container.append(element)
    
    element.onchange = () => {
        update_note(id , element.value)        
    }

    element.ondblclick = () => {
        var x = confirm("are you sure you want to delete this note ??");
        if(x) {
            delete_note(id, element)
        }
        
    }
    
    return element
}   

function note_obj() {
    var notes = get_notes();
    var obj = {
        id: Math.floor(Math.random() * 1000),
        content: ""
    }
    
    notes.push(obj)
    save_notes(notes)
    new_note(obj.id, obj.content)

    return obj
}

function update_note(id, newContent) {
    var notes = get_notes()
    var selected_note = notes.filter(note => note.id == id)[0];
    selected_note.content = newContent
    save_notes(notes)
    
    
}
function delete_note(id, element) {
    var notes = get_notes().filter(note => note.id != id);
   
    save_notes(notes)
    container.removeChild(element)
}


delete_btn.onclick = delete_all;
function delete_all() {
    var x = confirm("are you sure you want to delete all your notes ?");
    if(x) {
        localStorage.clear();
    }
    container.innerHTML = ""
    delete_btn.disabled = true
}