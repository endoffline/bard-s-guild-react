import React, {Component} from 'react';
import { connect } from 'react-redux';
import { history } from '../_helpers';
import { Button, Col, Row, Table } from 'reactstrap';

import { sheetActions } from '../_actions';

class HomePage extends Component {
    componentDidMount() {
        const { dispatch, user } = this.props;
        dispatch(sheetActions.getAll(user.id));
    }

    handleDeleteSheet(id) {
        const { dispatch } = this.props;
        return (e) => dispatch(sheetActions.delete(id));
    }

    handleSelect(id) {
        return (e) => history.push('/sheet/' + id);
    }

    render() {
        const { user, sheets } = this.props;
        return (
            <Row>
            <Col xs={12}>
                <h1>Hi {user.username}!</h1>
                <Row>
                    <Col xs={{size: 12, order: 2}} md={{size: 8, order: 1}}><h3>Your sheets:</h3></Col>
                    <Col xs={{size: 12, order: 1}} md={{size: 4, order: 2}}><Button color="primary" onClick={(e) => history.push('/sheet')} block>Create new character</Button></Col>
                </Row>
                {sheets.loading && <em>Loading sheets...</em>}
                {sheets.error && <span className="text-danger">ERROR: {sheets.error}</span>}
                {sheets.items &&
                <Table hover>
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Class</th>
                            <th scope="col">Level</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {sheets.items.map((sheet, index) =>

                            <tr key={sheet._id}>
                                    <th scope="row">{index + 1}</th>
                                    <td onClick={this.handleSelect(sheet._id)}>{sheet.name}</td>
                                    <td onClick={this.handleSelect(sheet._id)}>{sheet.playerclass}</td>
                                    <td onClick={this.handleSelect(sheet._id)}>{sheet.level}</td>
                                    <td>
                                        <Button color="danger" onClick={this.handleDeleteSheet(sheet._id)}>Delete</Button>
                                    </td>
                            </tr>

                        )}
                    </tbody>
                </Table>
                }
            </Col>
            </Row>
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