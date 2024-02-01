import React, { useContext } from 'react';
import NoteContext from '../Context/notes/NoteContext';
import NoteItem from './Noteitem'; // Correct the import to match the actual file name convention

const Notes = () => {
  const { notes } = useContext(NoteContext);

  return (
    <>
      <div className='row my-3'>
        {notes.map((note) => (
          <NoteItem key={note._id} note={note} />
        ))}
      </div>
    </>
  );
}

export default Notes;
