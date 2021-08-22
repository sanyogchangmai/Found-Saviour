import { Container, Form, Button, Col, Image } from "react-bootstrap";
import "./Post.css";
import { useState } from "react";
import Axios from 'axios';
import { useHistory } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import { firebase } from "../../firebase";

const Post = () => {

    const { currentUser } = useAuth();
    const [file, setFiles] = useState('');
    const [image, setImage] = useState('');
    const [city, setCity] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const history = useHistory();

    

    function handleUpload(e) {
        e.preventDefault();
        // setLoading(true);
        console.log(file);
        const formData = new FormData();

        formData.append("file", file);
        formData.append("upload_preset", "jee6awcx");
    
        Axios.post("https://api.cloudinary.com/v1_1/dwaz9dsmr/image/upload", formData)
          .then(function (response) {
            console.log(response);
            console.log("Image url is " + response.data.secure_url);
            setImage(response.data.secure_url);
            // setLoading(false);
          })
          .catch(function(err){
              console.log(err);
          });
      }


      function handleSubmit(e){
          e.preventDefault();

          const db = firebase.firestore();
          db.collection("posts").add({
              user_uid: currentUser.uid,
              img_url: image,
              city: city,
              title: title,
              description: description,
              time: firebase.firestore.Timestamp.fromDate(new Date())
          })
          .then(function(res){
              alert("Added successfully");
              console.log(res);
              history.push("/");
          })


      }


    return (

        <Container className="mb-5 pb-5">

                <h1 className="post-head">
                    Create Post
                </h1>  


            <center>
                
                <Form onSubmit={ handleSubmit } className="post-form">
                
                <div classname="mb-5">
                { image && 
                <Image src={ image } fluid />}
                </div>

                <Form.Group controlId="formFile" className="mb-3 mt-5">
                    <Form.Control multiple onChange={(e) => setFiles(e.target.files[0])} type="file" />
                </Form.Group>

                <Button onClick={ handleUpload } type="button" className="post-btn inline mb-5" variant="primary" type="submit">
                    Done
                </Button>

                    <Col>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control onChange={ (e) => setCity(e.target.value) } name="city" type="text" placeholder="Enter city" />
                    </Form.Group>
                    </Col>

                <Form.Group className="mb-3" controlId="formBasicTitle">
                    <Form.Control onChange={ (e) => setTitle(e.target.value) } name="title" type="text" placeholder="Give a title to your post." />
                </Form.Group>

                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Control onChange={ (e) => setDescription(e.target.value) } name="description" as="textarea" rows={10} placeholder="Explain about your post in detail...." />
                </Form.Group>

                <Button className="post-btn" variant="primary" type="submit">
                    Post
                </Button>

                </Form>

            </center>
        </Container>
    );
}
 
export default Post;