import { Button } from "react-bootstrap"

interface NavBarLoggedOutViewProps {
    onSignupClick: () => void,
    onLoginClick: () => void,
}

const NavBarLoggedOutView = ({onSignupClick, onLoginClick}: NavBarLoggedOutViewProps) => {
    return (
        <>
            <Button onClick={onSignupClick}>Sign Up</Button>
            <Button onClick={onLoginClick}>Login</Button>
        </>
    )
}

export default NavBarLoggedOutView