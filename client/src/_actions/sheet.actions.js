import { sheetConstants, scopesEnum } from '../_constants';
import { sheetService } from '../_services';
import {alertActions} from './';
import {history} from '../_helpers';

export const sheetActions = {
    initialize,
    change,
create,
    update,
    get,
    getAll,
    delete: _delete
};

function initialize(userid) {
    return {type: sheetConstants.INITIALIZE, userid}
}

function change(scope, name, value) {
    if (scope === scopesEnum.ABILITY) {
        return {type: sheetConstants.CHANGE_ABILITY, name, value};
    }
    return {type: sheetConstants.CHANGE, name, value}
}

function create(sheet) {
    return dispatch => {
        dispatch(request(sheet));

        sheetService.create(sheet)
            .then(
                sheet => {
                    dispatch(success());
                    history.push('/');
                    dispatch(alertActions.success('Character was created successfully'));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request(sheet) {
        return {type: sheetConstants.CREATE_REQUEST, sheet}
    }

    function success(sheet) {
        return {type: sheetConstants.CREATE_SUCCESS, sheet}
    }

    function failure(error) {
        return {type: sheetConstants.CREATE_FAILURE, error}
    }
}

function update(sheet) {
    return dispatch => {
        dispatch(request(sheet));

        sheetService.update(sheet)
            .then(
                sheet => {
                    dispatch(success());
                    history.push('/');
                    dispatch(alertActions.success('Character was updated successfully'));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request(sheet) {
        return {type: sheetConstants.UPDATE_REQUEST, sheet}
    }

    function success(sheet) {
        return {type: sheetConstants.UPDATE_SUCCESS, sheet}
    }

    function failure(error) {
        return {type: sheetConstants.UPDATE_FAILURE, error}
    }
}

function get(id) {
    return dispatch => {
        dispatch(request(id));

        sheetService.get(id)
            .then(
                sheet => dispatch(success(sheet)),
                error => dispatch(failure(error))
            );
    };

    function request(id) { return { type: sheetConstants.GET_REQUEST, id } }
    function success(sheet) { return { type: sheetConstants.GET_SUCCESS, sheet } }
    function failure(error) { return { type: sheetConstants.GET_FAILURE, error } }
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