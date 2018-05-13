import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { sheetActions } from '../_actions';

class SheetPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            sheet: {
                id: '',
                created: new Date(),
                lastUpdate: new Date(),
                user: props.user.id,
                name: '',
                player: '',
                playerclass: '',
            },
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { sheet } = this.state;
        this.setState({
            sheet: {
                ...sheet,
                [name]: value
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({ submitted: true });
        const { sheet } = this.state;
        const { dispatch } = this.props;
        if (!sheet.id) {
            dispatch(sheetActions.create(sheet));
        } else {
            dispatch(sheetActions.update(sheet));
        }
    }

    render() {
        const { saving  } = this.props;
        const { sheet, submitted } = this.state;
        return (
            <div className="col-md-6 col-md-offset-3">
                <h2>Character Sheet</h2>
                <form name="form" onSubmit={this.handleSubmit}>
                    <div className={'form-group' + (submitted && !sheet.name ? ' has-error' : '')}>
                        <label htmlFor="name">Name</label>
                        <input type="text" className="form-control" name="name" value={sheet.name} onChange={this.handleChange} />
                        {submitted && !sheet.name &&
                        <div className="help-block">Name is required</div>
                        }
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary">{( !sheet.id ) ? 'Create' : 'Save' }</button>
                        {saving &&
                        <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                        }
                        <Link to="/login" className="btn btn-link">Cancel</Link>
                    </div>
                </form>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { saving } = state.sheets;
    const { user } = state.authentication;
    return {
        saving,
        user
    };
}

const connectedSheetPage = connect(mapStateToProps)(SheetPage);
export { connectedSheetPage as SheetPage };