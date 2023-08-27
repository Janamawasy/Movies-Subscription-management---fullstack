import {applyMiddleware} from "redux"
import { legacy_createStore as createStore } from 'redux';
import ApplyChange from './redux/rootReducer';
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from 'redux-thunk'

export const store=createStore(ApplyChange,composeWithDevTools(applyMiddleware(thunk)))

