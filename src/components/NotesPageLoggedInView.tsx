import { useEffect, useState } from "react";
import { Button, Col, Row, Spinner } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import { Note as NoteModel } from '../models/note';
import * as NotesApi from "../network/notes_api";
import styles from "../styles/NotesPage.module.css";
import styleUtils from "../styles/utils.module.css";
import AddEditNoteDialog from "./AddEditNoteDialogProps";
import Note from "./Note";

const NotesPageLoggedInView = () => {

  const [notes, setNotes] = useState<NoteModel[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showNotesLoadingError, setShowNotesLoadingError] = useState(false)
  const [showAddNoteDialog, setShowAddNoteDialog] = useState(false)
  const [noteToEdit, setNoteToEdit] = useState<NoteModel|null>(null)

  async function loadNotes() {
    try {
      setShowNotesLoadingError(false)
      setIsLoading(true)
      const notes = await NotesApi.fetchNotes()
      setNotes(notes)
    } catch (error) {
      console.log(error)
      setShowNotesLoadingError(true)
    } finally {
      setIsLoading(false)
    }
  }

  async function deleteNote(note: NoteModel) {
    try {
      await NotesApi.deleteNote(note._id)
      // setNotes(notes.filter(existingNote => existingNote._id !== note._id))
      loadNotes()
    } catch (error) {
      console.log(error)
      alert(error)
    }
  }

  useEffect(() => {
    loadNotes()
  }, [])

  const notesGrid = 
      <Row xs={1} md={2} xl={3} className={`g-4 ${styles.noteGrid}`}>
      {notes.map((note)=> 
        <Col key={note._id}>
          <Note 
          note={note} 
          className={styles.note}
          onDeleteClick={deleteNote}
          onNoteClick={setNoteToEdit}
          />
        </Col>
       )}
    </Row>


    return (
        <>
        <Button className={`mb-4 ${styleUtils.blockCenter} ${styleUtils.flexCenter}`} onClick={() => setShowAddNoteDialog(true)}>
        <FaPlus/>
        Add New Note
      </Button>
     
      {isLoading && <Spinner animation="border" variant="primary" /> }

      {showNotesLoadingError && <p>Something went wrong. Refresh again</p>}

      {!isLoading && !showNotesLoadingError && 
        <>
          { notes.length > 0 ?
            notesGrid :
             <p>EMPTY NOTE</p>
          }
        </>
      }

      { showAddNoteDialog && 
        <AddEditNoteDialog 
          onDismiss={()=> setShowAddNoteDialog(false)} 
          onNoteSaved={(newNote)=>{ 
            // setNotes([...notes, newNote])
            setShowAddNoteDialog(false)
            loadNotes()
          }}
        />
      }

      {noteToEdit &&
       <AddEditNoteDialog
        noteToEdit={noteToEdit}
        onDismiss={()=> setNoteToEdit(null)}
        onNoteSaved={(updatedNote)=>{
          // setNotes(notes.map(existingNote => existingNote._id === updatedNote._id ? updatedNote : existingNote))
          setShowAddNoteDialog(false)
          setNoteToEdit(null)
          loadNotes()
        }}
        />
      }
        </>
    )

}

export default NotesPageLoggedInView