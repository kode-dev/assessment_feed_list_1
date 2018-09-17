import { createSelector } from 'reselect';
// READ: https://github.com/reactjs/reselect

const selfSelector = createSelector(
  state => state.caseList,
  state => state,
);
const Selector = state => selfSelector(state);

export default Selector;
