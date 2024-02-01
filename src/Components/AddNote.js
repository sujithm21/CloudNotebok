import React, {useContext, useState} from 'react';
import NoteContext from '../Context/notes/NoteContext';

const AddNote = () => {
    const { AddNote } = useContext(NoteContext);
    const [note, setNote] = useState({ title: 'tit', description: '', tag :'default'});

    const handleClcik =(e)=>{
        e.preventDefault();
        AddNote(note.title, note.description, note.tag);
    }

    const onChange = (e)=>{
        setNote({...note, [e.target.name] : e.target.value})
    }

  return (
    <div>
        <div className="container my-3">
        <h2>Add Notes</h2>
        </div>
        <form className='my-3'>
            <div className="mb-3">
                <label htmlFor="title" className="form-label">Title</label>
                <input type="text" className="form-control" id="title" name = "title" aria-describedby="emailHelp" onChange = {onChange} />
                <div id="text" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
                <label htmlFor="description" className="form-label">Description</label>
                <input type="text" className="form-control" id="description" name ="description" onChange ={onChange} />
            </div>
            <div className="mb-3 form-check">
                <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
            </div>
            <button type="submit" className="btn btn-primary" onClick={handleClcik} >Add Note</button>
        </form>
        <div className='my-3'>
            <h2>Your Notes</h2>
        </div>
    </div>
  )
}

export default AddNote;
