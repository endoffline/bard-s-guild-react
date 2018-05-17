import {sheetConstants} from '../_constants';

const ABILITIES = [
    {id: 0, abbr: 'str', name: 'Strength'},
    {id: 1, abbr: 'dex', name: 'Dexterity'},
    {id: 2, abbr: 'con', name: 'Constitution'},
    {id: 3, abbr: 'int', name: 'Intelligence'},
    {id: 4, abbr: 'wis', name: 'Wisdom'},
    {id: 5, abbr: 'cha', name: 'Charisma'},
];
const ABILITY_TEMPLATE = {
  abbr: '',
  name: '',
  score: '10',
  score_tmp: '10',
};
const SHEET_TEMPLATE = {
    _id: '',
    created: new Date(),
    lastUpdate: new Date(),
    user: '',
    name: '',
    player: '',
    playerclass: '',
    level: '',
    race: '',
    alignment: '',
    deity: '',
    size: '',
    age: '',
    gender: '',
    height: '',
    weight: '',
    eyes: '',
    hair: '',
    skin: '',
    abilities: [
        {abbr: 'str', name: 'Strength', score: '10', score_tmp: '10',},
        {abbr: 'dex', name: 'Dexterity', score: '10', score_tmp: '10',},
        {abbr: 'con', name: 'Constitution', score: '10', score_tmp: '10',},
        {abbr: 'int', name: 'Intelligence', score: '10', score_tmp: '10',},
        {abbr: 'wis', name: 'Wisdom', score: '10', score_tmp: '10',},
        {abbr: 'cha', name: 'Charisma', score: '10', score_tmp: '10',},
    ],
};
export function sheet(state = {
    sheet: {
        ...SHEET_TEMPLATE
    }
}, action) {
    switch (action.type) {
        case sheetConstants.INITIALIZE:
            /*let abilities = [];
            for(let i = 0; i < ABILITIES.length; i++) {
                abilities.push({
                    ...ABILITY_TEMPLATE,
                    id: ABILITIES[i].id,
                    abbr: ABILITIES[i].abbr,
                    name: ABILITIES[i].name,
                });
            }*/
            return {
                sheet: {
                    ...SHEET_TEMPLATE,
                    user: action.userid,
                    /*abilities: abilities,*/
                }
            };
        case sheetConstants.CHANGE:
            return {
                sheet: {
                    ...state.sheet,
                    [action.name]: action.value
                }
            };
        case sheetConstants.CHANGE_ABILITY:
            let abilities = state.sheet.abilities;
            let i = 0, found = false, name = '', score_tmp = false;
            if (action.name.length > 3) {
                name = action.name.substring(0, 3);
                score_tmp = true;
            } else {
                name = action.name;
            }
            do {
                if (abilities[i].abbr === name) {
                    abilities[i] = {
                        ...abilities[i],
                        [((score_tmp) ? 'score_tmp' : 'score')]: action.value,
                    };

                    found = true;
                }
                i++;
            } while(!found && i < abilities.length);

            return {
                sheet: {
                    ...state.sheet,
                    abilities: abilities
                }
            }
        case sheetConstants.CREATE_REQUEST:
            return { sheet: action.sheet,
                saving: true };
        case sheetConstants.CREATE_SUCCESS:
            return { sheet: state.sheet};
        case sheetConstants.CREATE_FAILURE:
            return {};
        case sheetConstants.UPDATE_REQUEST:
            return { sheet: action.sheet,
                saving: true };
        case sheetConstants.UPDATE_SUCCESS:
            return {sheet: state.sheet};
        case sheetConstants.UPDATE_FAILURE:
            return {};
        case sheetConstants.GET_REQUEST:
            return {
                sheet: state.sheet,
                loading: true
            };
        case sheetConstants.GET_SUCCESS:
            return {
                sheet: action.sheet
            };
        case sheetConstants.GET_FAILURE:
            return {
                error: action.error
            };
        default:
            return state
    }
}