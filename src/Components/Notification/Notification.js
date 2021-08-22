import { Alert, Container } from "react-bootstrap";

const Notification = () => {
    return ( 

        <Container className="mt-5 mb-5">

            <h1 className="mb-5">Notifications.</h1>

            <Alert>
                Delhi police shared a post recently. 
            </Alert>

            <Alert>
                Elon commented on your post 
            </Alert>

            <Alert variant="success">
                Notification feature will appear here.
                The notifications above displayed is hard coded. 
            </Alert>

        </Container>

    );
}
 
export default Notification;