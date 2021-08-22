import { Container, Form, Button, Alert, Spinner } from "react-bootstrap";
import "./Login.css";
import { Link, useHistory } from 'react-router-dom';
import { useRef, useState } from "react";
import { useAuth } from "../../Context/AuthContext";

const Login = () => {

    const emailRef = useRef();
    const passwordRef = useRef();
    const { login } = useAuth();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    async function handleLogin(e) {
        e.preventDefault()
        console.log("Indide handle login");
    
        try {
          setError("")
          setLoading(true)
          await login(emailRef.current.value, passwordRef.current.value)
          history.push("/")
        } catch {
          setError("Failed to log in");
        }
    
        setLoading(false)
      }

    return (

        <Container>
        <center>

            <h1 className="signup-title primary">
                Login to continue
            </h1>

            { error && 
            <Alert variant="danger">
                { error }
            </Alert>}

            { loading && 
            <Spinner animation="border" variant="primary" />
            }

            <Form className="form" onSubmit={ handleLogin }>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control type="email" ref={ emailRef } autocomplete="off" placeholder="Enter email" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="ormBasicPassword">
                <Form.Control type="password" ref={ passwordRef } placeholder="Enter password" />
                </Form.Group>

                <Button type="submit" variant="primary" className="signup-btn mb-3">Login</Button>        

            </Form>

            Create an account ? <Link className="signup-link" to="/signup">Signup</Link>
        </center>
        </Container>

    );
}
 
export default Login;