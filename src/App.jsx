// App.jsx
import { useState, useEffect } from "react";
import "./App.css";
import MarkdownInput from "./components/markdownInput.jsx";
import NoteDisplay from "./components/noteDisplay.jsx";

function App() {
  const [selectedNote, setSelectedNote] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(selectedNote));
  }, [selectedNote]);

  useEffect(() => {
    const loadNotesFromLocalStorage = () => {
      const storedNotes = localStorage.getItem("notes");
      return storedNotes ? JSON.parse(storedNotes) : [];
    };
    setSelectedNote(loadNotesFromLocalStorage());
  }, []);

  return (
    <div className="App">
      <h1>Notes</h1>
      <section className="section">
        <NoteDisplay
          selectedNotes={selectedNote}
          setSelectedNotes={setSelectedNote}
        />
        <MarkdownInput
          selectedNotes={selectedNote}
          setSelectedNotes={setSelectedNote}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
        />
      </section>
    </div>
  );
}

export default App;
