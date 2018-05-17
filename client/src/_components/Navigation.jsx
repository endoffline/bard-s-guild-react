import React from 'react';
import { connect } from 'react-redux';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    Nav,
    NavItem,
    NavLink} from 'reactstrap';

class Navigation extends React.Component {

    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        return (
            <div>
                <Navbar color="light" light expand="md">
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink href="/">Home</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/login">Login</NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>

        );
    }
}
function mapStateToProps(state) {
    const { loggingIn } = state.authentication;
    return {
        loggingIn
    };
}

const connectedNavigation = connect(mapStateToProps)(Navigation);
export { connectedNavigation as Navigation };