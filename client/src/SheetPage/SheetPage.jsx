import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {Col, Container, Jumbotron, Row} from 'reactstrap';
import './Sheet.scss';

import {sheetActions} from '../_actions';
import dnd3_5_logo from './dnd3_5_logo.png';
import {scopesEnum} from "../_constants";

class SheetPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            submitted: false
        };
        const {dispatch} = this.props;
        dispatch(sheetActions.initialize(props.user.id));
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeAbility = this.handleChangeAbility.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const {name, value} = event.target;
        const {dispatch} = this.props;

        dispatch(sheetActions.change(scopesEnum.BASIC, name, value));
    }

    handleChangeAbility(event) {
        const {name, value} = event.target;
        const {dispatch} = this.props;

        dispatch(sheetActions.change(scopesEnum.ABILITY, name, value));
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({submitted: true});
        const {dispatch, sheet} = this.props;
        if (sheet.name) {
            if (!sheet._id) {
                dispatch(sheetActions.create(sheet));
            } else {
                dispatch(sheetActions.update(sheet));
            }
        }
    }

    handleAbilityScores(event, ability) {
        this.handleChange(event);

    }


    componentDidMount() {
        const {dispatch} = this.props;
        if (this.props.match.params.id) {
            dispatch(sheetActions.get(this.props.match.params.id));
        } else {
            dispatch(sheetActions.initialize(this.props.user.id));
        }
    }


    render() {
        const {saving} = this.props;
        const {submitted} = this.state;
        const {sheet, loading} = this.props;
        const sheetid = this.props.match.params.id;
        var buttonText = (!sheetid) ? 'Create' : 'Save';
        console.log(sheet);
        return (
            <div>
                <h2 className="row">Character Sheet</h2>
                {sheetid && loading && <em className="row">Loading sheet...</em>}
                {(!sheetid || sheet._id) &&
                <form name="form" onSubmit={this.handleSubmit}>
                    <BasicInformation submitted={submitted} sheet={sheet} handleChange={this.handleChange}/>
                    <Abilities submitted={submitted} sheet={sheet} handleChangeAbility={this.handleChangeAbility}/>
                    <div className="form-group">
                        <button className="btn btn-primary">{buttonText}</button>
                        {saving &&
                        <img
                            src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=="/>
                        }
                        <Link to="/login" className="btn btn-link">Cancel</Link>
                    </div>
                </form>
                }
            </div>
        );
    }
}

function BasicInformation(props) {
    const {handleChange, sheet, submitted} = props;
    return (
        <div className="row info">
            <div className="col-md-8 order-12 order-md-1">

                <div className="row">
                    <div className="col-sm small-padding left">
                        <input type="text" id="name" name="name"
                               value={sheet.name} onChange={handleChange}/>
                        <label htmlFor="name" className="desc-md">CHARACTER NAME</label>
                    </div>
                    <div className="col-sm small-padding left">
                        <input type="text" id="player" name="player"
                               value={sheet.player} onChange={handleChange}/>
                        <label htmlFor="player" className="desc-md">PLAYER</label>
                    </div>
                </div>

                <div className="row">
                    <div className="col-8 col-md-4 small-padding left">
                        <input type="text" id="className" name="playerclass"
                               value={sheet.playerclass} onChange={handleChange}/>
                        <label htmlFor="playerclass" className="desc-md">Class</label>
                    </div>
                    <div className="col-4 col-md-2 small-padding left">
                        <input type="text" id="level" name="level"
                               value={sheet.level} onChange={handleChange}/>
                        <label htmlFor="level" className="desc-md">Level</label>
                    </div>
                    <div className="col-4 col-md-2 small-padding left">
                        <input type="text" id="race" name="race"
                               value={sheet.race} onChange={handleChange}/>
                        <label htmlFor="race" className="desc-md">Race</label>
                    </div>
                    <div className="col-4 col-md-2 small-padding left">
                        <input type="text" id="alignment" name="alignment"
                               value={sheet.alignment} onChange={handleChange}/>
                        <label htmlFor="alignment" className="desc-md">Alignment</label>
                    </div>
                    <div className="col-4 col-md-2 small-padding left">
                        <input type="text" id="deity" name="deity"
                               value={sheet.deity} onChange={handleChange}/>
                        <label htmlFor="deity" className="desc-md">Deity</label>
                    </div>
                </div>

                <div className="row">
                    <div className="col-12 col-md-6 ">
                        <div className="row">
                            <div className="col-3 col-md-3 small-padding left">
                                <select id="size" name="size" value={sheet.size} onChange={handleChange}>
                                    <option value="8">Fine</option>
                                    <option value="4">Diminutive</option>
                                    <option value="2">Tiny</option>
                                    <option value="1">Small</option>
                                    <option value="0" defaultValue>Medium</option>
                                    <option value="-1">Large</option>
                                    <option value="-2">Huge</option>
                                    <option value="-4">Gargantuan</option>
                                    <option value="-8">Colossal</option>
                                </select>
                                <label htmlFor="size" className="desc-md">Size</label>
                            </div>
                            <div className="col-3 col-md-3 small-padding left">
                                <input type="text" id="age" name="age"
                                       value={sheet.age} onChange={handleChange}/>
                                <label htmlFor="age" className="desc-md">Age</label>
                            </div>
                            <div className="col-3 col-md-3 small-padding left">
                                <input type="text" id="gender" name="gender"
                                       value={sheet.gender} onChange={handleChange}/>
                                <label htmlFor="gender" className="desc-md">Gender</label>
                            </div>
                            <div className="col-3 col-md-3 small-padding left">
                                <input type="text" id="height" name="height"
                                       value={sheet.height} onChange={handleChange}/>
                                <label htmlFor="height" className="desc-md">Height</label>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-6 ">
                        <div className="row">
                            <div className="col-3 col-md-3 small-padding left">
                                <input type="text" id="weight" name="weight"
                                       value={sheet.weight} onChange={handleChange}/>
                                <label htmlFor="weight" className="desc-md">Weight</label>
                            </div>
                            <div className="col-3 col-md-3 small-padding left">
                                <input type="text" id="eyes" name="eyes"
                                       value={sheet.eyes} onChange={handleChange}/>
                                <label htmlFor="eyes" className="desc-md">Eyes</label>
                            </div>
                            <div className="col-3 col-md-3 small-padding left">
                                <input type="text" id="hair" name="hair"
                                       value={sheet.hair} onChange={handleChange}/>
                                <label htmlFor="hair" className="desc-md">Hair</label>
                            </div>
                            <div className="col-3 col-md-3 small-padding left">
                                <input type="text" id="skin" name="skin"
                                       value={sheet.skin} onChange={handleChange}/>
                                <label htmlFor="skin" className="desc-md">Skin</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div className="col-md-4 order-1 order-md-12 small-padding">
                <img src={dnd3_5_logo} className="img-fluid" alt="Dungeons and Dragons logo"/>
            </div>
        </div>


        /*<Row className="info">
         <Col xs={{order: 12}} md={{size: 8, order: 1}}>
         <Row>
         <Col xs="auto" className={'small-padding left ' + (submitted && !sheet.name ? ' has-error' : '')}>
         <input type="text" id="name" className="" name="name" value={sheet.name} onChange={handleChange} />
         <label htmlFor="name">Name</label>
         </Col>
         </Row>
         </Col>
         </Row>*/

    )
}

function Abilities(props) {
    const {handleChangeAbility, sheet, submitted} = props;
    return (
        <div className="row">
            <div className="abilities col-12 col-md-4">
                <div className="row">
                    <div className="col-3">
                        <div className="row">
                            <span className="desc-sm col">Ability Name</span>
                        </div>
                    </div>
                    <div className="col-9">
                        <div className="row">
                            <span className="desc-sm col-3 small-padding">Ability Score</span>
                            <span className="desc-sm col-3 small-padding">Ability Modifier</span>
                            <span className="desc-sm col-3 small-padding">Temp. Score</span>
                            <span className="desc-sm col-3 small-padding">Temp. Modifier</span>
                        </div>
                    </div>
                </div>
                {sheet.abilities && sheet.abilities.map((ability, index) =>
                    <div key={ability.name}>
                        <Ability submitted={submitted} sheet={sheet} ability={ability} handleChangeAbility={handleChangeAbility} />
                    </div>
                )}
            </div>
        </div>
    );
}

function Ability(props) {
    const {handleChangeAbility, sheet, ability, submitted} = props;
    //console.log(ability);
    return (
        <div className="row">
            <div className="col-3 text-center">
                <div className="row text-center">
                    <span className="tag desc-lg small-padding text-center">{ability.abbr}</span>
                </div>
            </div>
            <div className="col-9">
                <div className="row">
                    <div className="col-3 small-padding">
                        <label htmlFor={ability.abbr} className="sr-only">{ability.abbr}</label>
                        <input type="number" name={ability.abbr} id={ability.abbr}
                               value={ability.score} onChange={handleChangeAbility}/>
                    </div>

                    <div className="col-3 small-padding">
                        <input disabled type="number" id={ability.abbr + '_am'} name={ability.abbr + '_am'}
                               value={Math.round((ability.score - 10) / 2)}/>
                    </div>
                    <div className="col-3 small-padding">
                        <label htmlFor={ability.abbr + '_tmp'} className="sr-only">{ability.abbr} Temp</label>
                        <input type="number" name={ability.abbr + '_tmp'} id={ability.abbr + '_tmp'}
                               value={ability.score_tmp} onChange={handleChangeAbility}/>
                    </div>
                    <div className="col-3 small-padding">
                        <input disabled type="number" id={ability.abbr + '_tm'} name={ability.abbr + '_tm'}
                               value={Math.round((ability.score_tmp - 10) / 2)}/>
                    </div>
                </div>
            </div>
        </div>

    );
}

function mapStateToProps(state) {
    const {saving} = state.sheet;
    const {user} = state.authentication;
    const {sheet, loading} = state.sheet;

    return {
        saving,
        user,
        sheet,
        loading
    };
}

const connectedSheetPage = connect(mapStateToProps)(SheetPage);
export {connectedSheetPage as SheetPage};