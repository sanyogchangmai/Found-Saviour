import "./Appbar.css";
import { Link } from "react-router-dom";
import { Container, Navbar } from 'react-bootstrap';

const Appbar = () => {
    return (

        <Navbar className="fixed" bg="primary" expand="lg">
        <Container>
            <Navbar.Brand className="brand-name" href="/">foundSaviour</Navbar.Brand>
            <div className="appbar-options">
                <Link to="/post">
                <i className="fas fa-plus me-4"></i>
                </Link>
                <Link to="/chat-application">
                <i className="fas fa-comments pe-2"></i>
                </Link>
            </div>
        </Container>
        </Navbar>

    );
}
 
export default Appbar;