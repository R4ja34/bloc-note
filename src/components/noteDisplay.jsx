// NoteDisplay.jsx
import { useEffect } from "react";
import PropTypes from "prop-types";

function NoteDisplay({ selectedNotes, setSelectedNotes }) {
  const loadNotesFromLocalStorage = () => {
    const storedNotes = localStorage.getItem("notes");
    return storedNotes ? JSON.parse(storedNotes) : [];
  };

  useEffect(() => {
    setSelectedNotes(loadNotesFromLocalStorage());
  }, [setSelectedNotes]);

  return (
    <div className="note-display">
      <h2>Notes enregistrées</h2>
      <ul>
        {selectedNotes.map((note, index) => (
          <li key={index}>
            <strong>{note.title}</strong>: {note.content}
          </li>
        ))}
      </ul>
    </div>
  );
}

NoteDisplay.propTypes = {
  selectedNotes: PropTypes.array.isRequired,
  setSelectedNotes: PropTypes.func.isRequired,
};

export default NoteDisplay;
