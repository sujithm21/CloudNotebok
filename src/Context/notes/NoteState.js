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
        // "auth-token": window.Storage.getItem("token"),
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    console.log(json);
    setNotes(json);
    localStorage.setItem("lastname", "Smith");
  };

  //Add a note
  const AddNote = async (title, description, tag) => {
    //Fetch API
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag }),
    });

    const note = await response.json();
    setNotes(notes.concat(note));
  };

  //Delete a note
  const deleteNote = async (id) => {
    //API Call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
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
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();
    console.log(json);

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
      value={{ notes, AddNote, deleteNote, editNote, GetNote }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
