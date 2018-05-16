import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { sheet } from './sheet.reducer';
import { sheets } from './sheets.reducer';
import { users } from './users.reducer';
import { alert } from './alert.reducer';

const rootReducer = combineReducers({
    form: formReducer,
    authentication,
    registration,
    sheet,
    sheets,
    users,
    alert
});

export default rootReducer;