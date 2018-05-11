import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { sheetActions } from '../_actions';

class HomePage extends React.Component {
    componentDidMount() {
        this.props.dispatch(sheetActions.getAll(this.props.user.id));
    }

    handleDeleteUser(id) {
        return (e) => this.props.dispatch(sheetActions.delete(id));
    }

    render() {
        const { user, sheets } = this.props;
        return (
            <div className="col-md-6 col-md-offset-3">
                <h1>Hi {user.username}!</h1>
                <p>You're logged in with React!!</p>
                <h3>Your sheets:</h3>
                {sheets.loading && <em>Loading sheets...</em>}
                {sheets.error && <span className="text-danger">ERROR: {sheets.error}</span>}
                {sheets.items &&
                <ul>
                    {sheets.items.map((sheet, index) =>
                        <li key={sheet.id}>
                            {sheet.name + ' ' + user.playerclass}
                            {
                                user.deleting ? <em> - Deleting...</em>
                                    : user.deleteError ? <span className="text-danger"> - ERROR: {user.deleteError}</span>
                                    : <span> - <a onClick={this.handleDeleteUser(user.id)}>Delete</a></span>
                            }
                        </li>
                    )}
                </ul>
                }
                <p>
                    <Link to="/login">Logout</Link>
                </p>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { sheets, authentication } = state;
    const { user } = authentication;
    return {
        user,
        sheets
    };
}

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };