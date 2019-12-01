import React from 'react';
import { Jumbotron, Container } from 'react-bootstrap';

import SignupForm from './SignupForm';

class SignUpPage extends React.Component {
    render() {
        return (
            <Jumbotron >
                <Container fluid>
                    <SignupForm />
                </Container>
            </Jumbotron>
        );
    }
}

export default SignUpPage;