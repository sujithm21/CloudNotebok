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

    return (
        <NoteContext.Provider value={{notes, setNotes}}>
            {props.children}
        </NoteContext.Provider>
    );
};

export default NoteState;
