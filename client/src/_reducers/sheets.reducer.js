import {sheetConstants} from '../_constants';

export function sheets(state = {}, action) {
    switch (action.type) {
       
        case sheetConstants.GETALL_REQUEST:
            return {
                loading: true
            };
        case sheetConstants.GETALL_SUCCESS:
            return {
                items: action.sheets
            };
        case sheetConstants.GETALL_FAILURE:
            return {
                error: action.error
            };
        case sheetConstants.DELETE_REQUEST:
            // add 'deleting:true' property to sheet being deleted
            return {
                ...state,
                items: state.items.map(sheet =>
                    sheet._id === action.id
                        ? {...sheet, deleting: true}
                        : sheet
                )
            };
        case sheetConstants.DELETE_SUCCESS:
            // remove deleted sheet from state
            return {
                items: state.items.filter(sheet => sheet._id !== action.id)
            };
        case sheetConstants.DELETE_FAILURE:
            // remove 'deleting:true' property and add 'deleteError:[error]' property to user
            return {
                ...state,
                items: state.items.map(sheet => {
                    if (sheet._id === action.id) {
                        // make copy of sheet without 'deleting:true' property
                        const {...sheetCopy} = sheet;
                        // return copy of sheet with 'deleteError:[error]' property
                        return {...sheetCopy, deleteError: action.error};
                    }

                    return sheet;
                })
            };
        default:
            return state
    }
}