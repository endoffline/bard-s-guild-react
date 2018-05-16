import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { Alert, Col, Container, Jumbotron, Row } from 'reactstrap';
import { history } from '../_helpers';
import { alertActions } from '../_actions';
import { PrivateRoute, Navigation } from '../_components';

import { HomePage } from '../HomePage';
import { LoginPage } from '../LoginPage';
import { RegisterPage } from '../RegisterPage';
import { SheetPage } from '../SheetPage';

class App extends React.Component {
    constructor(props) {
        super(props);

        const { dispatch } = this.props;
        history.listen((location, action) => {
            // clear alert on location change
            dispatch(alertActions.clear());
        });
    }

    render() {
        const { alert } = this.props;
        return (
            <Router history={history}>
                <div>
                    <Navigation />
                    <Jumbotron>
                        <Container>
                            <Row>
                                <Col>
                                    {alert.message &&
                                    <Alert color={alert.type}>{alert.message}</Alert>
                                    }
                                </Col>
                            </Row>

                            <PrivateRoute exact path="/" component={HomePage} />
                            <Route path="/login" component={LoginPage} />
                            <Route path="/register" component={RegisterPage} />
                            <Switch>
                                <PrivateRoute exact path="/sheet" component={SheetPage} />
                                <PrivateRoute path="/sheet/:id" component={SheetPage} />
                            </Switch>

                        </Container>
                    </Jumbotron>
                </div>
            </Router>
        );
    }
}

function mapStateToProps(state) {
    const { alert } = state;
    return {
        alert
    };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App };