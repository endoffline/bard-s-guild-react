import {sheetConstants, abilitiesEnum} from '../_constants';

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
        {abbr: 'str', name: 'Strength', score: 10, score_tmp: 10,},
        {abbr: 'dex', name: 'Dexterity', score: 10, score_tmp: 10,},
        {abbr: 'con', name: 'Constitution', score: 10, score_tmp: 10,},
        {abbr: 'int', name: 'Intelligence', score: 10, score_tmp: 10,},
        {abbr: 'wis', name: 'Wisdom', score: 10, score_tmp: 10,},
        {abbr: 'cha', name: 'Charisma', score: 10, score_tmp: 10,},
    ],
    hp: 0,
    wounds: 0,
    armor: 0,
    shield: 0,
    sub: 0,
    speed: '',
    sizemod: 0,
    natural: 0,
    deflect: 0,
    misc: 0,
    fort_base: 0,
    fort_magic: 0,
    fort_misc: 0,
    fort_temp: 0,
    reflex_base: 0,
    reflex_magic: 0,
    reflex_misc: 0,
    reflex_temp: 0,
    will_base: 0,
    will_magic: 0,
    will_misc: 0,
    will_temp: 0,
    skills: [
        {name: 'appraise',              key_ability: abilitiesEnum.INT, class_skill: false, ranks: 0, misc_mod: 0},
        {name: 'balance',               key_ability: abilitiesEnum.DEX, class_skill: false, ranks: 0, misc_mod: 0},
        {name: 'bluff',                 key_ability: abilitiesEnum.CHA, class_skill: false, ranks: 0, misc_mod: 0},
        {name: 'climb',                 key_ability: abilitiesEnum.STR, class_skill: false, ranks: 0, misc_mod: 0},
        {name: 'concentration',         key_ability: abilitiesEnum.CON, class_skill: false, ranks: 0, misc_mod: 0},
        {name: 'craft',                 key_ability: abilitiesEnum.INT, class_skill: false, ranks: 0, misc_mod: 0},
        {name: 'deceipher script',      key_ability: abilitiesEnum.INT, class_skill: false, ranks: 0, misc_mod: 0},
        {name: 'diplomacy',             key_ability: abilitiesEnum.CHA, class_skill: false, ranks: 0, misc_mod: 0},
        {name: 'disable device',        key_ability: abilitiesEnum.INT, class_skill: false, ranks: 0, misc_mod: 0},
        {name: 'disguise',              key_ability: abilitiesEnum.CHA, class_skill: false, ranks: 0, misc_mod: 0},
        {name: 'escape artist',         key_ability: abilitiesEnum.DEX, class_skill: false, ranks: 0, misc_mod: 0},
        {name: 'forgery',               key_ability: abilitiesEnum.INT, class_skill: false, ranks: 0, misc_mod: 0},
        {name: 'gather information',    key_ability: abilitiesEnum.CHA, class_skill: false, ranks: 0, misc_mod: 0},
        {name: 'handle animal',         key_ability: abilitiesEnum.CHA, class_skill: false, ranks: 0, misc_mod: 0},
        {name: 'heal',                  key_ability: abilitiesEnum.WIS, class_skill: false, ranks: 0, misc_mod: 0},
        {name: 'hide',                  key_ability: abilitiesEnum.DEX, class_skill: false, ranks: 0, misc_mod: 0},
        {name: 'imtimidate',            key_ability: abilitiesEnum.CHA, class_skill: false, ranks: 0, misc_mod: 0},
        {name: 'jump',                  key_ability: abilitiesEnum.STR, class_skill: false, ranks: 0, misc_mod: 0},
        {name: 'knowledge',             key_ability: abilitiesEnum.INT, class_skill: false, ranks: 0, misc_mod: 0},
        {name: 'listen',                key_ability: abilitiesEnum.WIS, class_skill: false, ranks: 0, misc_mod: 0},
        {name: 'move silently',         key_ability: abilitiesEnum.DEX, class_skill: false, ranks: 0, misc_mod: 0},
        {name: 'open lock',             key_ability: abilitiesEnum.DEX, class_skill: false, ranks: 0, misc_mod: 0},
        {name: 'perform',               key_ability: abilitiesEnum.CHA, class_skill: false, ranks: 0, misc_mod: 0},
        {name: 'profession',            key_ability: abilitiesEnum.WIS, class_skill: false, ranks: 0, misc_mod: 0},
        {name: 'ride',                  key_ability: abilitiesEnum.DEX, class_skill: false, ranks: 0, misc_mod: 0},
        {name: 'search',                key_ability: abilitiesEnum.INT, class_skill: false, ranks: 0, misc_mod: 0},
        {name: 'sense motive',          key_ability: abilitiesEnum.WIS, class_skill: false, ranks: 0, misc_mod: 0},
        {name: 'sleight of hand',       key_ability: abilitiesEnum.DEX, class_skill: false, ranks: 0, misc_mod: 0},
        {name: 'spellcraft',            key_ability: abilitiesEnum.INT, class_skill: false, ranks: 0, misc_mod: 0},
        {name: 'spot',                  key_ability: abilitiesEnum.WIS, class_skill: false, ranks: 0, misc_mod: 0},
        {name: 'survival',              key_ability: abilitiesEnum.WIS, class_skill: false, ranks: 0, misc_mod: 0},
        {name: 'swim',                  key_ability: abilitiesEnum.STR, class_skill: false, ranks: 0, misc_mod: 0},
        {name: 'tumble',                key_ability: abilitiesEnum.DEX, class_skill: false, ranks: 0, misc_mod: 0},
        {name: 'use magic device',      key_ability: abilitiesEnum.CHA, class_skill: false, ranks: 0, misc_mod: 0},
        {name: 'use rope',              key_ability: abilitiesEnum.DEX, class_skill: false, ranks: 0, misc_mod: 0},
    ]
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
            let i = 0, foundAbility = false, abilityName = '', isScore_tmp = false;
            if (action.name.length > 3) {
                abilityName = action.name.substring(0, 3);
                isScore_tmp = true;
            } else {
                abilityName = action.name;
            }
            do {
                if (abilities[i].abbr === abilityName) {
                    abilities[i] = {
                        ...abilities[i],
                        [((isScore_tmp) ? 'score_tmp' : 'score')]: action.value,
                    };

                    foundAbility = true;
                }
                i++;
            } while(!foundAbility && i < abilities.length);

            return {
                sheet: {
                    ...state.sheet,
                    abilities: abilities
                }
            };
        case sheetConstants.CHANGE_SKILL:
            let skills = state.sheet.skills;
            let j = 0, foundSkill = false, skillName = '', skillProp = '';
            if (action.name.substring(0, 8) === 'misc_mod') {
                skillName = action.name.substring(9);
                skillProp = 'misc_mod';
            } else if (action.name.substring(0, 5) === 'ranks') {
                skillName = action.name.substring(6);
                skillProp = 'ranks';
            } else {
                skillName = action.name.substring(12);
                skillProp = 'class_skill';
            }
            do {
                if (skills[j].name === skillName) {
                    skills[j] = {
                        ...skills[j],
                        [skillProp]: (skillProp === 'class_skill') ? !skills[j].class_skill : action.value,
                    };

                    foundSkill = true;
                }
                j++;
            } while(!foundSkill && j < skills.length);

            return {
                sheet: {
                    ...state.sheet,
                    skills: skills
                }
            };

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