import { authHeader, authHeaderJSON } from '../_helpers';
import { urlConstants } from '../_constants';

export const sheetService = {
    create,
    getAll,
    delete: _delete
};

function create(sheet) {
    const requestOptions = {
        method: 'POST',
        headers: authHeaderJSON(),
        body: JSON.stringify(sheet)
    };
    console.log(sheet);
    return fetch(urlConstants.SHEET_API_URL, requestOptions).then(handleResponse);
}

function getAll(userid) {
    const requestOptions = {
        method: 'GET',
        headers: authHeaderJSON()
    };

    return fetch( urlConstants.SHEETS_API_URL + '/' + userid, requestOptions).then(handleResponse);
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(urlConstants.SHEET_API_URL + '/' + id, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    if (!response.ok) {
        return Promise.reject(response.statusText);
    }

    return response.json();
}