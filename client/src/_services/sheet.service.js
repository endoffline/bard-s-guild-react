import {authHeader} from '../_helpers';
import { urlConstants } from '../_constants';

export const sheetService = {

    getAll,
    delete: _delete
};

function getAll(userid) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch( urlConstants.API_URL + '/sheets/' + userid, requestOptions).then(handleResponse);
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch('/users/' + id, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    if (!response.ok) {
        return Promise.reject(response.statusText);
    }

    return response.json();
}