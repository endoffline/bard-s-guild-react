import {sheetConstants} from '../_constants';


export function sheet(state = {
    sheet: {
        _id: '',
        created: new Date(),
        lastUpdate: new Date(),
        user: '',
        name: '',
        player: '',
        playerclass: '',
    }
}, action) {
    switch (action.type) {
        case sheetConstants.INITIALIZE:
            return {
                sheet: {
                    _id: '',
                    created: new Date(),
                    lastUpdate: new Date(),
                    user: action.userid,
                    name: '',
                    player: '',
                    playerclass: '',
                }
            };
        case sheetConstants.CHANGE:
            return {
                sheet: {
                    ...state.sheet,
                    [action.name]: action.value
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