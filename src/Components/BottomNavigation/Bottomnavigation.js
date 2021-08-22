import "./Bottomnavigation.css";
import { Link } from "react-router-dom";
import { Container, Col, Row } from 'react-bootstrap';
import IconButton from '@material-ui/core/IconButton';

const BottomNavigation = () => {
    return (

        <Container className="bottom-nav bg-primary">
            
            <Row className="bottom-navigation-options">
                <Col>
                <Link to="/">
                <center>
                <i className="fas fa-home"></i>
                </center>
                </Link>
                </Col>
                
                <Col>
                <Link to="/search">
                <center>
                <i className="fas fa-search"></i>
                </center>
                </Link>
                </Col>
                
                <Col>
                <Link to="/post">
                <center>
                <i className="far fa-plus-square"></i>
                </center>
                </Link>
                </Col>
                
                <Col>
                <Link to="/notification">
                <center>
                <i className="far fa-bell"></i>
                </center>
                </Link>
                </Col>
                
                <Col>
                <Link to="/dashboard">
                <center>
                <i class="far fa-user-circle"></i>
                </center>
                </Link>
                </Col>

            </Row>
        </Container>

    );
}
 
export default BottomNavigation;