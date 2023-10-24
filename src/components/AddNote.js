import React, { useContext, useState } from 'react';
import noteContext from '../context/notes/NoteContext';

const AddNote = (props) => {
    const context = useContext(noteContext);
    const { addNote } = context;
    const [note, setNote] = useState({ title: "", description: "", tag: "" });

    const handleClick = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({ title: "", description: "", tag: "" })
        props.ShowAlert("Added Successfully ", 'success');
    }
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    }
    return (
        <div>
            <div className='container my-3'>
                <h2 className='text-center'>Add Notes</h2>
                <form className='my-3'>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" id="title" name="title" minLength={5} value={note.title} onChange={onChange} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input type="text" className="form-control" id="description" name="description" minLength={5} value={note.description} onChange={onChange} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label" >Tag</label>
                        <input type="text" className="form-control" id="tag" name="tag" onChange={onChange} minLength={5} value={note.tag} required />
                        {/* <select class="form-select mb-3" aria-label=".form-select-lg example" id="tag" name="tag" onChange={onChange}>
                            <option selected>Select your tag</option>
                            <option value={"General"}>General</option>
                            <option value={"Personal"}>Personal</option>
                            <option value={"Professional"}>Professional</option>
                            <option value={"Education"}>Education</option>
                            <option value={"others"}>Others</option>
                        </select> */}
                    </div>
                    <button disabled={note.title.length <= 5 || note.description.length <= 5} type="submit" className="btn btn-primary" onClick={handleClick} >ADD</button>
                </form>

            </div>
        </div>
    )
}

export default AddNote
