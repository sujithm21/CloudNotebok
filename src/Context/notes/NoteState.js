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

  const host = "http://localhost:5000";

  const initialnotes = [];
  const [notes, setNotes] = useState(initialnotes);

  //Get all Notes
  const GetNote = async () => {
    //Fetch API
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjViNjQ5N2U0YmIzZThkNjczYWJmOGZhIn0sImlhdCI6MTcwNjUwODU5OX0.-TomOeDfJ0_E4VvTe5J3szISZsWw_n4ESqHrMIXbEtI",
      },
    });
    const json = await response.json();
    console.log(json);
    setNotes(json);
  };

  //Add a note
  const AddNote = async (title, description, tag) => {
    //Fetch API
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjViNjQ5N2U0YmIzZThkNjczYWJmOGZhIn0sImlhdCI6MTcwNjUwODU5OX0.-TomOeDfJ0_E4VvTe5J3szISZsWw_n4ESqHrMIXbEtI",
      },
      body: JSON.stringify({ title, description, tag }),
    });

    const note = {
      _id: "65bb1ff42ced091a6c4d6dc3",
      user: "65b6497e4bb3e8d673abf8fa",
      title: title,
      description: description,
      tag: tag,
      date: "2024-02-01T04:37:08.291Z",
      __v: 0,
    };
    setNotes(notes.concat(note));
  };

  //Delete a note
  const deleteNote = async (id) => {
    //API Call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjViNjQ5N2U0YmIzZThkNjczYWJmOGZhIn0sImlhdCI6MTcwNjUwODU5OX0.-TomOeDfJ0_E4VvTe5J3szISZsWw_n4ESqHrMIXbEtI",
      },
    });
    const json = response.json();
    console.log(json);

    //Logic
    console.log("Deleteing a node with id :" + id);
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  //Edit note
  const editNote = async (id, title, description, tag) => {
    //Fetch API
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjViNjQ5N2U0YmIzZThkNjczYWJmOGZhIn0sImlhdCI6MTcwNjUwODU5OX0.-TomOeDfJ0_E4VvTe5J3szISZsWw_n4ESqHrMIXbEtI",
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = response.json();

    // //Logic to edit the note
    //       for (let index = 0; index < array.length; index++) {
    //         const element = array[index];
    //         if(element._id === id){
    //           element.title = title;
    //           element.description = description;
    //           element.tag = tag;
    //         }
    //       }
    // Update the state
    const updatedNotes = notes.map((note) => {
      if (note._id === id) {
        return { ...note, title, description, tag };
      }
      return note;
    });
    setNotes(updatedNotes);
  };

  return (
    <NoteContext.Provider
      value={{ notes, AddNote, deleteNote, editNote, GetNote}}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
