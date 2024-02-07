import { Component } from "react";
import PropTypes from "prop-types";

class MarkdownInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      content: "",
      isAddingNewNote: false, // Nouvelle propriété d'état pour gérer l'affichage du formulaire
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const {
      selectedNotes,
      setSelectedNotes,
      isEditing,
      editIndex,
      setIsEditing,
      setEditIndex,
    } = this.props;
    const { title, content } = this.state;
    const newNote = { title, content };

    if (isEditing && editIndex !== null) {
      const updatedNotes = [...selectedNotes];
      updatedNotes[editIndex] = newNote;
      setSelectedNotes(updatedNotes);
      setIsEditing(false);
      setEditIndex(null);
    } else {
      setSelectedNotes([...selectedNotes, newNote]);
    }

    this.setState({
      title: "",
      content: "",
      isAddingNewNote: false, // Après soumission, réinitialiser l'état pour masquer le formulaire
    });
  };

  render() {
    const { title, content, isAddingNewNote } = this.state;
    const { isEditing } = this.props;

    return (
      <div className="markdown-input">
        <button onClick={() => this.setState({ isAddingNewNote: true })}>
          Nouvelle note
        </button>
        {isAddingNewNote ? ( // Afficher le formulaire si isAddingNewNote est vrai
          <form className="markdown-form" onSubmit={this.handleSubmit}>
            <label htmlFor="title">Titre</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(event) => this.setState({ title: event.target.value })}
            />
            <label htmlFor="content">Contenu</label>
            <textarea
              id="content"
              value={content}
              onChange={(event) =>
                this.setState({ content: event.target.value })
              }
            />
            <button type="submit">
              {isEditing ? "Modifier" : "Enregistrer"}
            </button>
          </form>
        ) : null}
      </div>
    );
  }
}

MarkdownInput.propTypes = {
  selectedNotes: PropTypes.array,
  setSelectedNotes: PropTypes.func,
  isEditing: PropTypes.bool,
  setIsEditing: PropTypes.func,
  editIndex: PropTypes.number,
  setEditIndex: PropTypes.func,
};

export default MarkdownInput;
