import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Col, Container, Jumbotron, Row } from 'reactstrap';
import './Sheet.scss';
import { sheetActions } from '../_actions';

class SheetPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            submitted: false
        };
        const { dispatch } = this.props;
        dispatch(sheetActions.initialize(props.user.id));
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { dispatch } = this.props;


        dispatch(sheetActions.change(name, value));
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({ submitted: true });
        const { dispatch, sheet } = this.props;
        if (sheet.name) {
            if (!sheet._id) {
                dispatch(sheetActions.create(sheet));
            } else {
                dispatch(sheetActions.update(sheet));
            }
        }
    }

    componentDidMount() {
        const { dispatch } = this.props;
        if (this.props.match.params.id) {
            dispatch(sheetActions.get(this.props.match.params.id));
        } else {
            dispatch(sheetActions.initialize(this.props.user.id));
        }
    }


    render() {
        const { saving  } = this.props;
        const { submitted } = this.state;
        const { sheet, loading } = this.props;
        const sheetid = this.props.match.params.id;
        var buttonText = (!sheetid) ? 'Create' : 'Save';

        return (
            <div className="col-md-6 col-md-offset-3">
                <h2>Character Sheet</h2>
                {sheetid && loading && <em>Loading sheet...</em>}
                {(!sheetid || sheet._id) &&
                <form name="form" onSubmit={this.handleSubmit}>
                    <BasicInformation submitted={submitted} sheet={sheet} handleChange={this.handleChange} />
                    <div className="form-group">
                        <button className="btn btn-primary">{buttonText}</button>
                        {saving &&
                        <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                        }
                        <Link to="/login" className="btn btn-link">Cancel</Link>
                    </div>
                </form>
                }
            </div>
        );
    }
}

class BaseInformation extends React.Component {
    render() {
        return (
            <div></div>
        );
    }
}
function BasicInformation(props) {
    const { handleChange, sheet, submitted } = props;
    return (

        <Row className="info">
            <Col xs={{order: 12}} md={{size: 8, order: 1}}>
                <Row>
                    <Col xs="auto" className={'small-padding left form-group' + (submitted && !sheet.name ? ' has-error' : '')}>
                        <input type="text" id="name" className="form-control" name="name" value={sheet.name} onChange={handleChange} />
                        <label htmlFor="name">Name</label>
                    </Col>
                </Row>
            </Col>
        </Row>

    )
};

function mapStateToProps(state) {
    const { saving } = state.sheet;
    const { user } = state.authentication;
    const { sheet, loading } = state.sheet;

    return {
        saving,
        user,
        sheet,
        loading
    };
}

const connectedSheetPage = connect(mapStateToProps)(SheetPage);
export { connectedSheetPage as SheetPage };