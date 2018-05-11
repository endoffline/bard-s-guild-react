import { sheetConstants } from '../_constants';
import { sheetService } from '../_services';
export const sheetActions = {
    getOne,
    getAll,
    delete: _delete
};

function getOne(id) {

}

function getAll(userid) {
    return dispatch => {
        dispatch(request(userid));

        sheetService.getAll(userid)
            .then(
                sheets => dispatch(success(sheets)),
                error => dispatch(failure(error))
            );
    };

    function request(userid) { return { type: sheetConstants.GETALL_REQUEST, userid } }
    function success(sheets) { return { type: sheetConstants.GETALL_SUCCESS, sheets } }
    function failure(error) { return { type: sheetConstants.GETALL_FAILURE, error } }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return dispatch => {
        dispatch(request(id));

        sheetService.delete(id)
            .then(
                sheet => {
                    dispatch(success(id));
                },
                error => {
                    dispatch(failure(id, error));
                }
            );
    };

    function request(id) { return { type: sheetConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: sheetConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: sheetConstants.DELETE_FAILURE, id, error } }
}