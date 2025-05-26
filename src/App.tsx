import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginModal from './components/form/LoginModal';
import SignUpModal from './components/form/SignUpModal';
import NavBar from './components/NavBar';
import { User } from './models/user';
import * as NotesApi from "./network/notes_api";
import NotesPage from './pages/NotesPage';
import NotFoundPage from './pages/NotFoundPage';
import PrivacyPage from './pages/PrivacyPage';
import styles from "./styles/App.module.css";

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
    <BrowserRouter>
    
    <div>
      <NavBar
      loggedInUser={loggedInUser}
      onLoginClick={()=>setShowLoginModal(true)}
      onSignupClick={()=>setShowSignupModal(true)}
      onLogoutSuccess={()=>setLoggedInUser(null)}
      />

      <Container className={styles.pageContainer}>
         <Routes>
            <Route 
              path ="/"
              element={<NotesPage loggedInUser={loggedInUser}/>}
            />
             <Route 
              path ="/privacy"
              element={<PrivacyPage/>}
            />
            <Route 
              path ="/*"
              element={<NotFoundPage/>}
            />
         </Routes>
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

       </BrowserRouter>
  );
}

export default App;
