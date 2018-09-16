import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Immutable from 'immutable';

import Actions from 'actions';
import CaseListSelector from 'selectors/caseListSelector';
import { actions as CaseActions } from 'reducers/caseListReducer';
import CaseListItem from 'components/CaseList'

const mapStateToProps = state => ({
  ...CaseListSelector(state)
});

const mapDispatchToProps = {
  ...CaseActions
};

@connect(mapStateToProps, mapDispatchToProps)
class DashboardViewWrapper extends Component {
    render() {
        return (
            <div>
                <div>
                    This is a case.
                </div>
            </div>
        )
    }
}

export default DashboardViewWrapper;
