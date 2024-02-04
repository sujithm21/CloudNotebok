import Notes from "./Notes";
import AddNote from "./AddNote";

export const Home = (props) => {
  const {showAlert} = props
  return (
    <div>
      <AddNote />
      <Notes showAlert={showAlert} />
    </div>
  );
};

export default Home;
