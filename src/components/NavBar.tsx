import { Container, Nav, Navbar } from "react-bootstrap"
import { User } from "../models/user"
import NavBarLoggedOutView from "./NavBarLoggedOutView"
import NavBarLoggedInView from "./NavBarLoggedInView"
import { Link } from "react-router-dom"

interface NavBarProps {
    loggedInUser: User | null,
    onSignupClick: () => void,
    onLoginClick: () => void,
    onLogoutSuccess: () => void
}

const NavBar = ({loggedInUser, onSignupClick, onLoginClick, onLogoutSuccess}: NavBarProps) => {

    return (
        <Navbar bg="primary" variant="dark" expand="sm" sticky="top">
            <Container>
                <Navbar.Brand as={Link} to={"/"}>
                    Cool Notes App
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="main-navbar" />
                <Navbar.Collapse id="main-navbar">
                    <Nav>
                        <Nav.Link as={Link} to={"/privacy"}>
                            Privacy
                        </Nav.Link>
                    </Nav>
                    <Nav className="ms-auto">
                        {loggedInUser ? 
                            <NavBarLoggedInView user={loggedInUser} onLogoutSuccess={onLogoutSuccess} />
                            :
                            <NavBarLoggedOutView onLoginClick={onLoginClick} onSignupClick={onSignupClick}/>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )

}

export default NavBar