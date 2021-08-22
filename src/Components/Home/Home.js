import "./Home.css";
import { useState, useEffect } from "react";
import { Container, Card, Carousel, Accordion, Form, Alert, Spinner } from 'react-bootstrap';
import { useAuth } from "../../Context/AuthContext";
import { firebase } from "../../firebase";

const Home = () => {

    const { currentUser } = useAuth();
    const [error, setError] = useState("");
    const [data, setData] = useState("");
    const [loading, setLoading] = useState(false);

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

    return (

        <Container className="mt-5 mb-5 pb-4">

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
                { post.data().description.substring(0,130) } ....
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
 
export default Home;