import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { Note as NoteModel } from './models/note';
import Note from './components/Note';
import styles from "./styles/NotesPage.module.css"
import styleUtils from "./styles/utils.module.css"
import * as NotesApi from "./network/notes_api"
import AddEditNoteDialog from './components/AddEditNoteDialogProps';
import {FaPlus} from "react-icons/fa";

function App() {

  const [notes, setNotes] = useState<NoteModel[]>([])
  const [showAddNoteDialog, setShowAddNoteDialog] = useState(false)
  const [noteToEdit, setNoteToEdit] = useState<NoteModel|null>(null)

  async function loadNotes() {
    try {
      const notes = await NotesApi.fetchNotes()
      setNotes(notes)
    } catch (error) {
      console.log(error)
      alert(error)
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

  return (
    <Container>
      <Button className={`mb-4 ${styleUtils.blockCenter} ${styleUtils.flexCenter}`} onClick={() => setShowAddNoteDialog(true)}>
        <FaPlus/>
        Add New Note
      </Button>
      <Row xs={1} md={2} xl={3} className="g-4">
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

      
       </Container>
  );
}

export default App;
