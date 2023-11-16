import { Container } from 'react-bootstrap';
import { User } from '../models/user';
import NotesPageLoggedInView from '../components/NotesPageLoggedInView';
import NotesPageLoggedOutView from '../components/NotesPageLoggedOutView';
import styles from "./styles/NotesPage.module.css";


const PrivacyPage = () => {
    return (
        <div>
            <p>
                We care about your privacy...
            </p>
        </div>
    )
}

export default PrivacyPage