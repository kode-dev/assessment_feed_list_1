import React, { Component } from 'react';
import { ListGroup } from 'react-bootstrap';
import PropTypes from 'prop-types';
import CaseListItem from './CaseListItem';

class CaseList extends Component {
  componentWillMount() {
    this.props.fetchCases();
  }

  static renderCaseItem(supportCase, index) {
    return <CaseListItem key={index} supportCase={supportCase} />;
  }

  render() {
    if (!this.props.cases || this.props.cases.length === 0) {
      return <div>No cases to render.</div>;
    }

    const cases = this.props.cases.map(CaseList.renderCaseItem);

    return (
      <div>
        <h1>Cases</h1>
        <ListGroup>{cases}</ListGroup>
      </div>
    );
  }
}

CaseList.propTypes = {
  fetchCases: PropTypes.func.isRequired,
  cases: PropTypes.arrayOf(Object).isRequired,
};

export default CaseList;
