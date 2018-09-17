import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import caseList from './reducers/caseListReducer';

export default combineReducers({
  caseList,
  routing,
});
