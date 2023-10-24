import React from 'react';
import noteContext from './NoteContext';
import { useState } from 'react';
const NoteState = (props) => {
    const host = 'http://localhost:8085'
    let notesInitial = []
    const [notes, setNotes] = useState(notesInitial);

    // Fetch all Note

    const getNotes = async () => {
        // API call

        const response = await fetch(`${host}/api/notes/getallnotes`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            }
        });
        const json = await response.json();
        console.log(json);
        setNotes(json);
    }

    // Add a Note

    const addNote = async (title, description, tag, id) => {
        // API CALL

        const response = await fetch(`${host}/api/notes/addnote`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag }),
        });

        const note = await response.json();
        setNotes(notes.concat(note));
    }

    // Delete a Note 

    const DeleteNote = async (id) => {

        // TODO: API CALL
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
        });
        const json = await response.json();
        console.log(json);

        const newNote = notes.filter((note) => { return note._id !== id })
        setNotes(newNote)
    }

    // Edit a Note

    const editNote = async (id, title, description, tag) => {
        // TODO: API CALL
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag }),
        });
        const json = await response.json();
        console.log(json);
        const newNotes = JSON.parse(JSON.stringify(notes));
        // Logic to edit in client
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if (element._id === id) {
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break;
            }
        }
        setNotes(newNotes);
    }


    return (
        <noteContext.Provider value={{ notes, addNote, DeleteNote, editNote, getNotes }} >
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState;