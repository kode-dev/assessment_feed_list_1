import { createAction, handleActions } from 'redux-actions';
import CaseApi from 'api/caseApi';
import Actions from '../actions';

import _ from 'lodash'

export function createAsyncAction (type, fn) {
  return (...args) => async(dispatch, getState) => {
    dispatch({
      type: type,
      payload: args
    });
    let result;
    try {
      result = await fn(...args);
    } catch (error) {
      dispatch({
        type: `${type}_ERROR`,
        error: true,
        payload: error
      });
      throw error;
    }
    dispatch({
      type: `${type}_SUCCESS`,
      payload: result
    });
    return result;
  }
}

export const fetchCases = createAsyncAction(
	Actions.Case.list.FETCH_CASES,
	() => {
		console.log('fetchCases()')
		return CaseApi.getCaseList().then(
			response => {
				if (response.error) {
					return null;
				}
				return response;
			}, error => {
				throw error;
			}
		)
	}
);

export const addCase = createAsyncAction(
	Actions.Case.list.ADD_CASE,
	(newCase) => {
		return CaseApi.addCase(newCase).then(
			response => {
				if (response.error) {
					return null;
				}
				return response;
			}, error => {
				throw error;
			}
		)
	}
);

export const actions = {
    fetchCases,
  	addCase
};

export const reducers = {
	[Actions.Case.list.FETCH_CASES]: (state, { payload }) => {
	    return {
			...state,
			fetchingCases: true
	    };
	},
	[Actions.Case.list.FETCH_CASES + '_SUCCESS']: (state, { payload }) => {
		console.log('received cases: ' + payload)
		return {
			...state,
			cases: payload,
			fetchingCases: false
	    };
	},
	[Actions.Case.list.FETCH_CASES + '_ERROR']: (state, { payload }) => {
		console.log('received cases error: ' + payload)
		return {
			...state,
			fetchingCases: false
	    };
	}
};

export const initialState = {
	cases: [],
	fetchingCases: false,
};

export default handleActions(reducers, initialState);