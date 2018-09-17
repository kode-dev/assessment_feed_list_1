import React, { Component } from 'react';
import { connect } from 'react-redux';

import CaseListSelector from 'selectors/caseListSelector';
import { actions as CaseActions } from 'reducers/caseListReducer';

const mapStateToProps = state => ({
  ...CaseListSelector(state),
});

const mapDispatchToProps = {
  ...CaseActions,
};

@connect(
  mapStateToProps,
  mapDispatchToProps,
)
class DashboardViewWrapper extends Component {
  render() {
    return (
      <div>
        <div>This is a case.</div>
      </div>
    );
  }
}

export default DashboardViewWrapper;
