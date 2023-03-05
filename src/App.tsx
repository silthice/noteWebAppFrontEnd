import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import LoginModal from './components/form/LoginModal';
import SignUpModal from './components/form/SignUpModal';
import NavBar from './components/NavBar';
import NotesPageLoggedInView from './components/NotesPageLoggedInView';
import NotesPageLoggedOutView from './components/NotesPageLoggedOutView';
import { User } from './models/user';
import * as NotesApi from "./network/notes_api";
import styles from "./styles/NotesPage.module.css";

function App() {
  
  const [loggedInUser, setLoggedInUser] = useState<User|null>(null)
  const [showSignupModal, setShowSignupModal] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false)

  async function fetchLoggedInUser() {
    try {
      const user = await NotesApi.getLoggedInUser()
      setLoggedInUser(user)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(()=>{
    fetchLoggedInUser()
  }, [])


  return (
    <div>
      <NavBar
      loggedInUser={loggedInUser}
      onLoginClick={()=>setShowLoginModal(true)}
      onSignupClick={()=>setShowSignupModal(true)}
      onLogoutSuccess={()=>setLoggedInUser(null)}
      />
   
    <Container className={styles.notesPage}>
      
      <>
        {loggedInUser ? 
        <NotesPageLoggedInView /> 
      :
          <NotesPageLoggedOutView />
      }
      </>
       </Container>

       { showSignupModal &&
       <SignUpModal
       onDismiss={()=>setShowSignupModal(false)}
       onSignupSuccess={(user)=>{
        setLoggedInUser(user)
        setShowSignupModal(false)
       }}
       />

      }

      { showLoginModal &&
       <LoginModal
       onDismiss={()=>setShowLoginModal(false)}
       onLoginSuccess={(user)=>{
        setLoggedInUser(user)
        setShowLoginModal(false)
       }}
       />

      }
       </div>
  );
}

export default App;
