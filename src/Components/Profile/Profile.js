import { Container, Row, Col, Image, Button, Form, InputGroup } from "react-bootstrap";
import "./Profile.css";

const Profile = () => {

    function handleProfileEdit(){
        alert("Could'nt manage to implement this profile feature")
    }
    
    return (

        <Container className="mt-4">
            <Row>
                <Col md="auto">
                    <center>
                    <Image className="profile-pic" src="https://res.cloudinary.com/dwaz9dsmr/image/upload/v1629001158/igacd3cpqjpjjy3cu7hj.png" roundedCircle />
                    <br />
                    <Button onClick={ handleProfileEdit } variant="primary">Upload Profile Picture</Button>
                    </center>
                </Col>

                <Col>

                <Form>
                    <Row className="mb-3 mt-5">
                        <Form.Group as={Col} md="4" controlId="validationCustom01">
                        <Form.Label>First name</Form.Label>
                        <Form.Control
                        classname="disabled"
                            required
                            type="text"
                            placeholder="First name"
                            defaultValue="Mark"
                            disabled
                        />
                        </Form.Group>
                        <Form.Group as={Col} md="4" controlId="validationCustom02">
                        <Form.Label>Last name</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Last name"
                            defaultValue="Otto"
                            disabled
                        />
                        </Form.Group>
                        <Form.Group as={Col} md="4" controlId="validationCustomUsername">
                        <Form.Label>Username</Form.Label>
                        <InputGroup hasValidation>
                            <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                            <Form.Control
                            type="text"
                            placeholder="Username"
                            aria-describedby="inputGroupPrepend"
                            disabled
                            required
                            />
                            <Form.Control.Feedback type="invalid">
                            Please choose a username.
                            </Form.Control.Feedback>
                        </InputGroup>
                        </Form.Group>
                    </Row>

                    <Row>
                    <center>
                    {/* <Button variant="primary" className="pe-5 ps-5 mt-4 me-2">New Post</Button> */}
                    <Button onClick={ handleProfileEdit } variant="primary" className="pe-5 ps-5 mt-4">Edit Profile</Button>
                    </center>
                    </Row>

                    </Form>

                </Col>
            </Row>
        </Container>

    );
}
 
export default Profile;