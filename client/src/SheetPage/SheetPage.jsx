import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import './Sheet.scss';

import {sheetActions} from '../_actions';
import dnd3_5_logo from './dnd3_5_logo.png';
import {scopesEnum, abilitiesEnum} from "../_constants";

class SheetPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            submitted: false
        };
        const {dispatch} = this.props;
        dispatch(sheetActions.initialize(props.user.id));
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeAbility = this.handleChangeAbility.bind(this);
        this.handleChangeSkill = this.handleChangeSkill.bind(this);
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

    handleChangeSkill(event) {
        const {name, value, checked} = event.target;
        const {dispatch} = this.props;
        if (name.substring(0, 11) === 'class_skill') {
            dispatch(sheetActions.change(scopesEnum.SKILL, name, checked));
        } else {
            dispatch(sheetActions.change(scopesEnum.SKILL, name, value));
        }
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

    componentDidMount() {
        const {dispatch, match, user} = this.props;
        if (match.params.id) {
            dispatch(sheetActions.get(match.params.id));
        } else {
            dispatch(sheetActions.initialize(user.id));
        }
    }


    render() {
        const {saving} = this.props;
        const {submitted} = this.state;
        const {sheet, loading, match} = this.props;
        const sheetid = match.params.id;
        let buttonText = (!sheetid) ? 'Create' : 'Save';
        //console.log(sheet);
        return (
            <div>
                <h2 className="row">Character Sheet</h2>
                {sheetid && loading && <em className="row">Loading sheet...</em>}
                {(!sheetid || sheet._id) &&
                <form name="form" onSubmit={this.handleSubmit}>
                    <BasicInformation submitted={submitted} sheet={sheet} handleChange={this.handleChange}/>
                    <div className="row">
                        <Abilities sheet={sheet} handleChangeAbility={this.handleChangeAbility}/>
                        <HealthAC1 sheet={sheet} handleChange={this.handleChange}/>
                        <HealthAC2 sheet={sheet} handleChange={this.handleChange}/>
                    </div>
                    <div className="row">
                        <div className="saves col-12 col-md-6">
                            <Saves sheet={sheet} handleChange={this.handleChange}/>
                            <Notes />
                        </div>
                        <div className="skills col-12 col-md-6">
                            <Skills sheet={sheet} handleChangeSkill={this.handleChangeSkill}/>
                        </div>
                    </div>
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

function calcModifier(score) {
    return Math.round((score - 10) / 2);
}

function BasicInformation(props) {
    const {handleChange, sheet} = props;
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
    const {handleChangeAbility, sheet} = props;
    return (
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
                    <Ability ability={ability} handleChangeAbility={handleChangeAbility}/>
                </div>
            )}
        </div>
    );
}

function Ability(props) {
    const {handleChangeAbility, ability} = props;

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

function HealthAC1(props) {
    const {handleChange, sheet} = props;
    return (
        <div className="col-12 col-md-4">
            <div className="row">
                <span className="desc-md col-2 offset-2">Total</span>
                <span className="desc-sm col-4">Wounds / <br/>Current HP</span>
            </div>
            <div className="row">
                <div className="col-2">
                    <div className="row">
                        <span className="tag desc-lg small-padding text-center">HP</span>
                    </div>
                </div>
                <div className="col-2 small-padding">
                    <label htmlFor="hp" className="sr-only">TOTAL</label>
                    <input type="number" name="hp" id="hp"
                           value={sheet.hp} onChange={handleChange}/>
                </div>
                <div className="col-8 small-padding">
                    <label htmlFor="wounds" className="sr-only">Wounds</label>
                    <input type="text" name="wounds" id="wounds"
                           value={sheet.wounds} onChange={handleChange}/>
                </div>
            </div>

            <div className="row">
                <div className="col-2">
                    <div className="row">
                        <span className="tag desc-lg small-padding text-center">AC</span>
                    </div>
                </div>
                <div className="col-2 small-padding">
                        <span id="ac">
                            {
                                10 + parseInt(sheet.armor, 10)
                                + parseInt(sheet.shield, 10)
                                + parseInt(Math.round((sheet.abilities[abilitiesEnum.DEX].score_tmp - 10) / 2), 10)
                                + parseInt(sheet.sizemod, 10)
                                + parseInt(sheet.natural, 10)
                                + parseInt(sheet.deflect, 10)
                                + parseInt(sheet.misc, 10)
                            }
                        </span>
                </div>
                <span>=</span>
                <span>10</span>
                <span>+</span>
                <div className="col-2 small-padding">
                    <input type="number" name="armor" id="armor"
                           value={sheet.armor} onChange={handleChange}/>
                    <label htmlFor="armor" className="desc-sm">Armor</label>
                </div>
                <span>+</span>
                <div className="col-2 small-padding">
                    <input type="number" name="shield" id="shield"
                           value={sheet.shield} onChange={handleChange}/>
                    <label htmlFor="shield" className="desc-sm">Shield</label>
                </div>
                <span>+</span>

            </div>
        </div>
    );
}

function HealthAC2(props) {
    const {handleChange, sheet} = props;
    return (
        <div className="col-12 col-md-4">
            <div className="row">
                <span className="desc-sm col-4">Nonlethal <br/> damage</span>
                <span className="desc-md col-8">Speed</span>
            </div>
            <div className="row">
                <div className="col-4 small-padding">
                    <label htmlFor="sub" className="sr-only">Nonlethal Damage</label>
                    <input type="text" name="sub" id="sub"
                           value={sheet.sub} onChange={handleChange}/>
                </div>
                <div className="col-8 small-padding">
                    <label htmlFor="speed" className="sr-only">Speed</label>
                    <input type="text" name="speed" id="speed"
                           value={sheet.speed} onChange={handleChange}/>
                </div>
            </div>

            <div className="row">
                <div className="col small-padding">
                    <span id="ac_dex">{Math.round((sheet.abilities[abilitiesEnum.DEX].score - 10) / 2)}</span>
                </div>
                <span>+</span>
                <div className="col small-padding">
                    <input type="number" name="sizemod" id="sizemod"
                           value={sheet.sizemod} onChange={handleChange}/>
                    <label htmlFor="sizemod" className="desc-sm">Size</label>
                </div>
                <span>+</span>
                <div className="col small-padding">
                    <input type="number" name="natural" id="natural"
                           value={sheet.natural} onChange={handleChange}/>
                    <label htmlFor="natural" className="desc-sm">Natural</label>
                </div>
                <span>+</span>
                <div className="col small-padding">
                    <input type="number" name="deflect" id="deflect"
                           value={sheet.deflect} onChange={handleChange}/>
                    <label htmlFor="deflect" className="desc-sm">Deflect</label>
                </div>
                <span className="dark">+</span>
                <div className="col small-padding">
                    <input type="number" name="misc" id="misc"
                           value={sheet.misc} onChange={handleChange}/>
                    <label htmlFor="misc" className="desc-sm">Misc</label>
                </div>
            </div>
        </div>
    );
}

function Saves(props) {
    const {handleChange, sheet} = props;
    return (
        <div>
            <div className="row">
                <div className="col-3">
                    <div className="row">
                        <span className="desc-md col">Saving Throws</span>
                    </div>
                </div>
                <div className="col-9">
                    <div className="row">
                        <span className="desc-sm col-2 small-padding text-center">Total</span>
                        <span className="desc-sm col-2 small-padding text-center">Base save</span>
                        <span className="desc-sm col-2 small-padding text-center">Ability mod.</span>
                        <span className="desc-sm col-2 small-padding text-center">Magic mod.</span>
                        <span className="desc-sm col-2 small-padding text-center">Misc mod.</span>
                        <span className="desc-sm col-2 small-padding text-center">Temp. mod.</span>
                    </div>
                </div>
            </div>
            {/* Fortitude */}
            <div className="row">
                <div className="col-3">
                    <div className="row text-center">
                        <div className="tag desc-lg">FORTITUDE</div>
                    </div>
                </div>
                <div className="col-9">
                    <div className="row">
                        <div className="col small-padding text-center" id="fort">
                            {
                                parseInt(sheet.fort_base, 10)
                                + parseInt(calcModifier(sheet.abilities[abilitiesEnum.CON].score), 10)
                                + parseInt(sheet.fort_magic, 10)
                                + parseInt(sheet.fort_misc, 10)
                                + parseInt(sheet.fort_temp, 10)
                            }
                        </div>
                        <span className="small-padding align-baseline">=</span>
                        <div className="col small-padding text-center">
                            <label htmlFor="fort_base" className="sr-only">Fortitude Base</label>
                            <input type="number" name="fort_base" id="fort_base" className="no-spin"
                                   value={sheet.fort_base} onChange={handleChange}/>
                        </div>
                        <span className="small-padding align-baseline">+</span>
                        <span className="col small-padding text-center"
                              id="fort_ability">{calcModifier(sheet.abilities[abilitiesEnum.CON].score)}</span>
                        <span className="small-padding align-baseline">+</span>
                        <div className="col small-padding text-center">
                            <label htmlFor="fort_magic" className="sr-only">Fortitude Magic</label>
                            <input type="number" name="fort_magic" id="fort_magic" className="no-spin"
                                   value={sheet.fort_magic} onChange={handleChange}/>
                        </div>
                        <span className="small-padding align-baseline">+</span>
                        <div className="col small-padding text-center">
                            <label htmlFor="fort_misc" className="sr-only">Fortitude Misc</label>
                            <input type="number" name="fort_misc" id="fort_misc" className="no-spin"
                                   value={sheet.fort_misc} onChange={handleChange}/>
                        </div>
                        <span className="small-padding align-baseline">+</span>
                        <div className="col small-padding text-center">
                            <label htmlFor="fort_temp" className="sr-only">Fortitude Temp</label>
                            <input type="number" name="fort_temp" id="fort_temp" className="no-spin"
                                   value={sheet.fort_temp} onChange={handleChange}/>
                        </div>
                    </div>
                </div>
            </div>
            {/* Reflex */}
            <div className="row">
                <div className="col-3">
                    <div className="row text-center">
                        <div className="tag desc-lg">Reflex</div>
                    </div>
                </div>
                <div className="col-9">
                    <div className="row">
                        <div className="col small-padding text-center" id="reflex">
                            {
                                parseInt(sheet.reflex_base, 10)
                                + parseInt(calcModifier(sheet.abilities[abilitiesEnum.DEX].score), 10)
                                + parseInt(sheet.reflex_magic, 10)
                                + parseInt(sheet.reflex_misc, 10)
                                + parseInt(sheet.reflex_temp, 10)
                            }
                        </div>
                        <span className="small-padding align-baseline">=</span>
                        <div className="col small-padding text-center">
                            <label htmlFor="reflex_base" className="sr-only">Reflex Base</label>
                            <input type="number" name="reflex_base" id="reflex_base" className="no-spin"
                                   value={sheet.reflex_base} onChange={handleChange}/>
                        </div>
                        <span className="small-padding align-baseline">+</span>
                        <span className="col small-padding text-center"
                              id="reflex_ability">{calcModifier(sheet.abilities[abilitiesEnum.DEX].score)}</span>
                        <span className="small-padding align-baseline">+</span>
                        <div className="col small-padding text-center">
                            <label htmlFor="reflex_magic" className="sr-only">Reflex Magic</label>
                            <input type="number" name="reflex_magic" id="reflex_magic" className="no-spin"
                                   value={sheet.reflex_magic} onChange={handleChange}/>
                        </div>
                        <span className="small-padding align-baseline">+</span>
                        <div className="col small-padding text-center">
                            <label htmlFor="reflex_misc" className="sr-only">Reflex Misc</label>
                            <input type="number" name="reflex_misc" id="reflex_misc" className="no-spin"
                                   value={sheet.reflex_misc} onChange={handleChange}/>
                        </div>
                        <span className="small-padding align-baseline">+</span>
                        <div className="col small-padding text-center">
                            <label htmlFor="reflex_temp" className="sr-only">Reflex Temp</label>
                            <input type="number" name="reflex_temp" id="reflex_temp" className="no-spin"
                                   value={sheet.reflex_temp} onChange={handleChange}/>
                        </div>
                    </div>
                </div>
            </div>
            {/* Will */}
            <div className="row">
                <div className="col-3">
                    <div className="row text-center">
                        <div className="tag desc-lg">Will</div>
                    </div>
                </div>
                <div className="col-9">
                    <div className="row">
                        <div className="col small-padding text-center" id="will">
                            {
                                parseInt(sheet.will_base, 10)
                                + parseInt(calcModifier(sheet.abilities[abilitiesEnum.WIS].score), 10)
                                + parseInt(sheet.will_magic, 10)
                                + parseInt(sheet.will_misc, 10)
                                + parseInt(sheet.will_temp, 10)
                            }
                        </div>
                        <span className="small-padding align-baseline">=</span>
                        <div className="col small-padding text-center">
                            <label htmlFor="will_base" className="sr-only">Will Base</label>
                            <input type="number" name="will_base" id="will_base" className="no-spin"
                                   value={sheet.will_base} onChange={handleChange}/>
                        </div>
                        <span className="small-padding align-baseline">+</span>
                        <span className="col small-padding text-center"
                              id="will_ability">{calcModifier(sheet.abilities[abilitiesEnum.WIS].score)}</span>
                        <span className="small-padding align-baseline">+</span>
                        <div className="col small-padding text-center">
                            <label htmlFor="will_magic" className="sr-only">Will Magic</label>
                            <input type="number" name="will_magic" id="will_magic" className="no-spin"
                                   value={sheet.will_magic} onChange={handleChange}/>
                        </div>
                        <span className="small-padding align-baseline">+</span>
                        <div className="col small-padding text-center">
                            <label htmlFor="will_misc" className="sr-only">Will Misc</label>
                            <input type="number" name="will_misc" id="will_misc" className="no-spin"
                                   value={sheet.will_misc} onChange={handleChange}/>
                        </div>
                        <span className="small-padding align-baseline">+</span>
                        <div className="col small-padding text-center">
                            <label htmlFor="will_temp" className="sr-only">Will Temp</label>
                            <input type="number" name="will_temp" id="will_temp" className="no-spin"
                                   value={sheet.will_temp} onChange={handleChange}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function Skills(props) {
    const {handleChangeSkill, sheet} = props;

    return (
        <div>
            <div className="row">
                <div className="col-12 tag desc-lg">
                    <span>Skills</span>
                </div>
            </div>
            <div className="row">
                <div className="col-6">
                    <div className="row">
                        <span className="desc-lg col-10">Skill name</span>
                        <span className="desc-sm col-2 small-padding text-center">Key ability</span>
                    </div>
                </div>

                <div className="col-6">
                    <div className="row">
                        <span className="desc-sm col-2 small-padding text-center ">Skill mod.</span>
                        <div className="col-1 small-padding"/>
                        <span className="desc-sm col-2 small-padding text-center">Ability mod.</span>
                        <div className="col-1 small-padding"/>
                        <span className="desc-sm col-2 small-padding text-center">Ranks</span>
                        <div className="col-1 small-padding"/>
                        <span className="desc-sm col-2 small-padding text-center">Misc mod.</span>
                    </div>
                </div>
            </div>
            {sheet.skills && sheet.skills.map((skill, index) =>
                <div key={skill.name}>
                    <Skill abilities={sheet.abilities} skill={skill} handleChangeSkill={handleChangeSkill}/>
                </div>
            )}
        </div>
    );
}

function Skill(props) {
    const {abilities, handleChangeSkill, skill} = props;
    console.log(calcModifier(abilities[skill.key_ability].score));
    return (
        <div className="row">
            <div className="col-6">
                <div className="row">
                    <div className="col-2 small-padding">
                        <label htmlFor={'class_skill_' + skill.name} className="sr-only">{skill.name}</label>
                        <input type="checkbox" className="" name={'class_skill_' + skill.name}
                               id={'class_skill_' + skill.name} checked={skill.class_skill}
                               onChange={handleChangeSkill}/>
                    </div>
                    <span className="desc-lg col-8">{skill.name}</span>
                    <span
                        className="desc-lg col-2 small-padding text-center">{abilitiesEnum.properties[skill.key_ability]}</span>
                </div>
            </div>

            <div className="col-6">
                <div className="row">
                    <label htmlFor={'skill_mod_' + skill.name} className="sr-only">skill modifier
                        {skill.name}</label>
                    <input disabled type="number" name={'skill_mod_' + skill.name}
                           id={'skill_mod_' + skill.name} className="col-2 no-spin"
                           value={
                               parseInt(calcModifier(abilities[skill.key_ability].score), 10)
                               + parseInt(skill.ranks, 10)
                               + parseInt(skill.misc_mod, 10)
                           }/>
                    <span className="small-padding align-baseline">=</span>
                    <div className="col-2 small-padding">
                        <div className="text-center">{calcModifier(abilities[skill.key_ability].score)}</div>
                    </div>
                    <span className="small-padding align-baseline">+</span>
                    <div className="col-2 small-padding">
                        <label htmlFor={'ranks_' + skill.name} className="sr-only">Ranks</label>
                        <input type="number" name={'ranks_' + skill.name} id={'ranks_' + skill.name}
                               className="no-spin" value={skill.ranks} onChange={handleChangeSkill}/>
                    </div>
                    <span className="small-padding align-baseline">+</span>
                    <div className="col-2 small-padding">
                        <label htmlFor={'misc_mod_' + skill.name} className=" sr-only">Misc modifier</label>
                        <input type="number" name={'misc_mod_' + skill.name} id={'misc_mod_' + skill.name}
                               className="no-spin"
                               value={skill.misc_mod} onChange={handleChangeSkill}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

function Notes() {
    let rows = [];

    for (let i = 0; i < 35; i++) {
        rows.push(
            <div key={i} className="row notes">
                <div className="col-sm small-padding left">
                    <input type="text"/>
                </div>
            </div>);
    }
    return rows;
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