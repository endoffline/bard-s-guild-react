export function authHeader(headers = {'Content-Type': 'application/json'}) {
    // return authorization header with jwt token
    let user = JSON.parse(localStorage.getItem('user'));

    if (user && user.token) {
        headers['Authorization'] = user.token;
    }
    return headers;
}

export function authHeaderJSON() {
    return authHeader({'Content-Type': 'application/json'});
}