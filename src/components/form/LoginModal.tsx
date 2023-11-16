import { useState } from "react";
import { Button, Form, Modal, Alert } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { ConflictError, UnauthorizedError } from "../../errors/http_errors";
import { User } from "../../models/user";
import * as NotesApi from "../../network/notes_api";
import { LoginCredentials } from "../../network/notes_api";
import styleUtils from "../../styles/utils.module.css";
import TextInputField from "./TextInputField";

interface LoginModalProps {
    onDismiss: () => void,
    onLoginSuccess: (user: User) => void,
}

const LoginModal = ({onDismiss, onLoginSuccess}: LoginModalProps) => {

    const [errorText, setErrorText] = useState<string | null> (null)

    const {register, handleSubmit, formState: {errors, isSubmitting}} = useForm<LoginCredentials>()

    async function onSubmit(credentials: LoginCredentials) {
        try {
            const user = await NotesApi.login(credentials)
            onLoginSuccess(user)
        } catch (error) {
            if (error instanceof UnauthorizedError) {
                setErrorText(error.message)
            } else {
                alert(error)
            }
            console.error(error)
        }
    }

    return(
        <Modal show onHide={onDismiss}>
            <Modal.Header closeButton>
                <Modal.Title>
                    Log In
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {errorText && 
                <Alert variant="danger">
                    {errorText}
                </Alert>
                    }
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <TextInputField
                        name="username"
                        label="Username"
                        type="text"
                        placeholder="Username"
                        register={register}
                        registerOptions={{required: "Required"}}
                        error={errors.username}
                    />
                    <TextInputField
                        name="password"
                        label="Password"
                        type="password"
                        placeholder="Password"
                        register={register}
                        registerOptions={{required: "Required"}}
                        error={errors.password}
                    />

                    <Button
                        type="submit"
                        disabled={isSubmitting}
                        className={styleUtils.width100}
                        >
                        Login
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    )
}

export default LoginModal;