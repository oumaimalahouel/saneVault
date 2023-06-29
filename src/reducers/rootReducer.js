import { combineReducers } from 'redux';
import itemReducer from './itemReducer';
import foldersReducer from './foldersReducer';

export default combineReducers({
    itemReducer,
    foldersReducer
});