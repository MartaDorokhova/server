import {
	legacy_createStore as createStore,
	applyMiddleware,
	combineReducers,
} from 'redux';
import thunk from 'redux-thunk';
import { toDoReducer } from './reducer';

const reducer = combineReducers({ toDos: toDoReducer });
export const store = createStore(reducer, applyMiddleware(thunk));
export default store;
