import { Button, Form, Modal, ModalFooter } from "react-bootstrap"
import { useForm } from "react-hook-form"
import { Note } from "../models/note"
import * as NotesApi from "../network/notes_api"
import { NoteInput } from "../network/notes_api"
import TextInputField from "./form/TextInputField"

interface AddEditNoteDialogProps {
    noteToEdit?: Note,
    onDismiss: () => void,
    onNoteSaved: (note: Note) => void
}

const AddEditNoteDialog = ({noteToEdit, onDismiss, onNoteSaved}: AddEditNoteDialogProps) => {

    const {register, handleSubmit, formState: {errors, isSubmitting}} = useForm<NoteInput>({
        defaultValues: {
            title: noteToEdit?.title || "",
            text: noteToEdit?.text || ""
        }
    })

    async function onSubmit(input: NoteInput) {
        try {
            let noteResponse: Note;

            if(noteToEdit) {
                noteResponse = await NotesApi.updateNote(noteToEdit._id, input)
            } else {
                noteResponse = await NotesApi.createNote(input);
            }
            
            onNoteSaved(noteResponse)

        } catch(error) {
            console.log(error)
            alert(error)
        }
    }

    return (
        <Modal show={true} onHide={onDismiss}>
            <Modal.Header closeButton>
                <Modal.Title>
                    {noteToEdit ?  "Edit Note" : "Add Note"}
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form id="addEditNoteForm" onSubmit={handleSubmit(onSubmit)}>

                    <TextInputField
                        name="title"
                        label="Title"
                        type="text"
                        placeholder="Title"
                        register={register}
                        registerOptions={{required: "Required"}}
                        error={errors.title}
                    />

                    <TextInputField
                        name="text"
                        label="Text"
                        placeholder="Text"
                        as="textarea" 
                        rows={5} 
                        register={register}
                    />


                    {/* <Form.Group className="mb-3">
                        <FormLabel>Title</FormLabel>
                        <FormControl 
                            type="text" 
                            placeholder="Title" 
                            isInvalid={!!errors.title}
                            {...register("title", { required: "Required"})}>
                        </FormControl>
                        <Form.Control.Feedback type="invalid">
                            {errors.title?.message}
                        </Form.Control.Feedback>
                    </Form.Group> 

                    <FormGroup className="mb-3">
                        <FormLabel>Text</FormLabel>
                        <FormControl 
                            placeholder="Text"
                            as="textarea" 
                            rows={5} 
                            {...register("text")}>
                         </FormControl>
                    </FormGroup>  */}
                </Form>
            </Modal.Body>

            <ModalFooter>
                <Button type="submit" form="addEditNoteForm" disabled={isSubmitting}>Save</Button>
            </ModalFooter>
        </Modal>
    )
}

export default AddEditNoteDialog