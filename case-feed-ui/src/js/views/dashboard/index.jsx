import React, { Component } from 'react';
import { connect } from 'react-redux';
import CaseListSelector from 'selectors/caseListSelector';
import { actions as CaseActions } from 'reducers/caseListReducer';
import CaseList from 'components/CaseList';

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
        <CaseList {...this.props} />
      </div>
    );
  }
}

export default DashboardViewWrapper;
