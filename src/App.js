import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import About from "./Components/About";
import NoteState from "./Context/notes/NoteState";
import Alert from "./Components/Alert";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
//import { useState } from "react";

function App() {
  // const [Alert, setAlert] = useState(null);
  // //Show Alert Function
  // const showAlert = (message, type) => {
  //   setAlert({
  //     msg: message,
  //     type: type,
  //   });
  //   setTimeout(() => {
  //   setAlert(null);
  //   }, 1500);
  // };

  return (
    <div className="App">
      <NoteState>
        <Router>
          <Navbar />
          <div className="container">
          {/* <Alert message={"you clicked!"} /> */}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login />} />
              <Route
                path="/signup"
                element={<Signup />}
              />
            </Routes>
          </div>
        </Router>
      </NoteState>
    </div>
  );
}

export default App;
