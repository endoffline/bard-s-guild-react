import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { sheetActions } from '../_actions';

class HomePage extends React.Component {
    componentDidMount() {
        this.props.dispatch(sheetActions.getAll(this.props.user.id));
    }

    handleDeleteSheet(id) {
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
                        <li key={sheet._id}>
                            {sheet.name + ' ' + sheet.playerclass}
                            {
                                sheet.deleting ? <em> - Deleting...</em>
                                    : sheet.deleteError ? <span className="text-danger"> - ERROR: {sheet.deleteError}</span>
                                    : <span> - <a onClick={this.handleDeleteSheet(sheet._id)}>Delete</a></span>
                            }
                        </li>
                    )}
                </ul>
                }
                <p>
                    <Link to="/login">Logout</Link>
                    <Link to="/sheet">Create new Character</Link>
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