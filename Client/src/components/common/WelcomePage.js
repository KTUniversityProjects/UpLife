import React from 'react';
import { Jumbotron, Container, } from 'react-bootstrap';

class WelcomePage extends React.Component {
    render() {
        return (
            <Jumbotron>
                <Container fluid>
                    <h1><i>Welcome to BIDERIS</i></h1>
                    <p>
                        The worlds #1 app - if Aruodas.lt and Tinder had a child, and then would give it away to an orphanage,
                        this would be it.
                    </p>
                </Container>
            </Jumbotron>
        );
    }
}

export default WelcomePage;