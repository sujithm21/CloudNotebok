import React, { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
    // const initialState = {
    //     name: "Sujith",
    //     section: "A1"
    // };

    // const [state, setState] = useState(initialState);

    // const update = () => {
    //     setTimeout(() => {
    //         setState({
    //             name: "jahnavi",
    //             section: "A2"
    //         });
    //     }, 1000);
    // };

    const initialnotes = [
        {
          "_id": "65b93d0fdc55eff1872d4856",
          "user": "65b6497e4bb3e8d673abf8fa",
          "title": "To-Do",
          "description": "Yem cheyyali",
          "tag": "personal ",
          "date": "2024-01-30T18:16:47.877Z",
          "__v": 0
        },
        {
          "_id": "65bb1ff42ced091a6c4d6dc3",
          "user": "65b6497e4bb3e8d673abf8fa",
          "title": "To-Do 1",
          "description": "Yem cheyyali 1",
          "tag": "personal 1 ",
          "date": "2024-02-01T04:37:08.291Z",
          "__v": 0
        }
      ]
      const [notes, setNotes] = useState(initialnotes)

      //Add a note
        const AddNote = (title, description, tag)=>{
            const note = {
                "_id": "65bb1ff42ced091a6c4d6dc3",
                "user": "65b6497e4bb3e8d673abf8fa",
                "title": title,
                "description": description,
                "tag": tag,
                "date": "2024-02-01T04:37:08.291Z",
                "__v": 0
              }
            setNotes(notes.concat(note))
        }

      //Delete a note
      const deleteNote= (id)=>{
        console.log("Deleteing a node with id :"+id);
        const newNotes = notes.filter((note)=>{return note._id!==id});
        setNotes(newNotes);
      }

      //Edit note
      const editNote= ()=>{
            
      }

    return (
        <NoteContext.Provider value={{notes, AddNote, deleteNote, editNote}}>
            {props.children}
        </NoteContext.Provider>
    );
};

export default NoteState;
