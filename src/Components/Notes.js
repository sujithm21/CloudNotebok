import React, { useContext } from 'react';
import NoteContext from '../Context/notes/NoteContext';
import NoteState from '../Context/notes/NoteState';
import Noteitem from './Noteitem';

const Notes = () => {
  const context = useContext(NoteContext);
  const {notes, setNotes} = context;

  return (
    <div className='row my-3'>
      {notes.map((note) => {
          return <Noteitem note = {note} />
        })}
    </div>
  )
}

export default Notes
