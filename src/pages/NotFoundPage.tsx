import { Container } from 'react-bootstrap';
import { User } from '../models/user';
import NotesPageLoggedInView from '../components/NotesPageLoggedInView';
import NotesPageLoggedOutView from '../components/NotesPageLoggedOutView';
import styles from "./styles/NotesPage.module.css";


const NotFoundPage = () => {
    return (
        <div>
            <p>
                Page Not Found
            </p>
        </div>
    )
}

export default NotFoundPage