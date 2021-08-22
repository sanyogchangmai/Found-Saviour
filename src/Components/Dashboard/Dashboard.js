import "./Dashboard.css";
import { useState, useEffect } from "react";
import { Container, Card, Carousel, Accordion, Modal, Button, Form, Alert, Spinner } from 'react-bootstrap';
import Profile from "../Profile/Profile";
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from "../../Context/AuthContext";
import { firebase } from "../../firebase";


const Dashboard = () => {

    const { currentUser } = useAuth();
    const [error, setError] = useState("");
    const [data, setData] = useState("");
    const [loading, setLoading] = useState(false);
    const history = useHistory();
    const { logout } = useAuth();

    useEffect(() => {
        setLoading(true);
        const db = firebase.firestore();
        db.collection("posts").where("user_uid","==",currentUser.uid).get()
        .then(function(snapshot){
            setData(snapshot);
            console.log(data);
            setLoading(false);
        })
        .catch(function(err){
            console.log("Failed to fetch data.")
        })
      },[]);


    function handleDelete(id){
        console.log(id);
        const db = firebase.firestore();
        db.collection("posts").doc(id).delete()
        .then(function(){
            window.location.reload();
        })
    }

    async function handleLogout() {
        setError("");
    
        try {
          await logout();
          history.push("/login");
        } catch {
          setError("Failed to log out");
        }
      }

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (

        <Container className="mt-5 mb-5 pb-5">

            <Button className="logout-btn" variant="danger" onClick={ handleLogout }>
                Logout
            </Button>

            <br />

            <Profile/>

            <br />

            <center>
            { error && 
            <Alert variant="danger">
                { error }
            </Alert>}

            { loading &&
            <Spinner animation="border" variant="primary" />
            }
            </center>

            { data &&
             <> 
            { data.docs.map( post => (
            <Card className="mt-4 post-card" key={ post.data().id }>
            <Card.Header>
                username
                <span onClick={ handleShow }>
                <i className="far fa-trash-alt"></i>
                </span>

                <Link to={`/edit/${ post.id }`}>
                <span>
                <i class="far fa-edit me-3"></i>
                </span>
                </Link>

                <Modal show={show} onHide={handleClose} className="mt-5">
                    <Modal.Header closeButton>
                    <Modal.Title>Do you really want to delete ?</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Posts once deleted cannot re recovered.</Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="danger" onClick={() => handleDelete(post.id)}>
                        Delete
                    </Button>
                    </Modal.Footer>
                </Modal>

            </Card.Header>

            <Carousel>
            <Carousel.Item>
                <img
                className="d-block w-100 post-img"
                src={ post.data().img_url}
                alt="First slide"
                />
            </Carousel.Item>
            </Carousel>

            <Card.Body>
            <span className="date">{ post.data().time.toDate().toString().substring(0,15) }</span>

                <Card.Title className="mt-3">{ post.data().title }</Card.Title>
                <Card.Text>
                { post.data().description.substring(0,100) } ....
                </Card.Text>

                <Accordion>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>
                        Read in detail.
                        </Accordion.Header>
                        <Accordion.Body>
                        { post.data().description }
                        </Accordion.Body>
                    </Accordion.Item>

                    <Accordion.Item eventKey="1">
                        <Accordion.Header>
                        Read comments
                        </Accordion.Header>
                        <Accordion.Body>

                        <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Control as="textarea" rows={2} placeholder="write comment here" />
                        </Form.Group>
                        </Form>

                        <div className="comment mb-3">
                            <h6>Elon Musk</h6>
                            <p>Hey sanyog ! this comment feauture is not working..</p>
                        </div>

                        <div className="comment mb-3">
                            <h6>Sanyog changmai</h6>
                            <p>Yes i am really sorry I will implement it later.</p>
                        </div>

                        </Accordion.Body>
                    </Accordion.Item>

                </Accordion>

            </Card.Body>
            </Card>))}
            </> }

        </Container>
    );
}
 
export default Dashboard;