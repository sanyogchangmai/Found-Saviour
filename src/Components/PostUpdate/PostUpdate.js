import "./PostUpdate.css";
import { useState, useEffect } from "react";
import { Container, Form, Button, Image } from "react-bootstrap";
import { useParams, useHistory } from 'react-router-dom';
import { useAuth } from "../../Context/AuthContext";
import { firebase } from "../../firebase";

const PostUpdate = () => {

    const { currentUser } = useAuth();
    const { id } = useParams();
    const [data, setData] = useState("");
    const [city, setCity] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const history = useHistory();

    useEffect(() => {
        const db = firebase.firestore();
        db.collection("posts").doc(id).get()
        .then(function(snapshot){     
            setData(snapshot.data());
            // setWeight(snapshot.data().data);
        })
      },[]);

    function handleUpdate(e){
        e.preventDefault();

        const db = firebase.firestore();
        db.collection("posts").doc(id).update({
            city: city,
            title: title,
            description: description,
            time: firebase.firestore.Timestamp.fromDate(new Date())
        })
        .then(function(){
          alert("Updated successfully");
          history.push("/");
        })
    }

    
    return (

        <Container className="mb-5 pb-5">

                <h1 className="post-head">
                    Update Your Post .
                </h1>    

            <center>

                { data &&
                <Form className="post-form" onSubmit={ handleUpdate }>

                <div classname="mb-5">
                <Image src={ data.img_url } fluid />
                </div>

                <br />
                <br />

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control defaultValue={ data.city } onChange={ (e) => setCity(e.target.value) } name="city" type="text"/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control defaultValue={ data.title } onChange={ (e) => setTitle(e.target.value) } name="title" type="text"/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Control defaultValue={ data.description } onChange={ (e) => setDescription(e.target.value) } name="description" as="textarea" rows={10}/>
                </Form.Group>
                <Button type="submit" className="post-btn" variant="primary" type="submit">
                    Update Post
                </Button>
                </Form>}

            </center>
        </Container>

    );
}
 
export default PostUpdate;