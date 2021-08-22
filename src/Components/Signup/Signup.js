import { Container, Form, Button, Alert, Spinner } from "react-bootstrap";
import "./Signup.css";
// import "./bootstrap-social.css";
import { Link, useHistory } from "react-router-dom";
import { useRef, useState } from "react";
import { useAuth } from "../../Context/AuthContext";


const Signup = () => {

    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const { signup, currentUser } = useAuth();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    async function handleSubmit(e) {
        e.preventDefault();
        console.log("Inside handleSubmit");
        console.log(emailRef.current.value);
    
        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
          return setError("Passwords do not match");
        }
    
        try {
          setError("");
          console.log("inside try 1");
          setLoading(true);
          console.log("inside try 2");
          await signup(emailRef.current.value, passwordRef.current.value)
          console.log("inside try 3");
          history.push("/");
          console.log("inside try");
        } catch {
          setError("Failed to create an account");
        }
    
        setLoading(false);
      }


    return (

        <Container>
        <center>

            <h1 className="signup-title primary">
                Create account
            </h1>

            { error && 
            <Alert variant="danger">
                { error }
            </Alert>}

            { loading && 
            <Spinner animation="border" variant="primary" />
            }

            <Form className="form" onSubmit={ handleSubmit }>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control type="email" ref={emailRef} autocomplete="off" placeholder="Enter email" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Control type="password" ref={passwordRef} placeholder="Enter password" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                <Form.Control type="password" ref={passwordConfirmRef} placeholder="Confirm password" />
                </Form.Group>

                <Button type="submit" variant="primary" className="signup-btn mb-3">Create account</Button>        

            </Form>

            Already have an account ? <Link className="login-link" to="/login">Login</Link>

        </center>
        </Container>

    );
}
 
export default Signup;