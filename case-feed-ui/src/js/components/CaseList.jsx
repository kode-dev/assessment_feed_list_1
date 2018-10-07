import React, { Component } from 'react';
import { ListGroup, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import CaseListItem from './CaseListItem';

class CaseList extends Component {
  componentWillMount() {
    let now = (new Date()).getTime();
    this.props.getUpToDateCases(now);
  }

  static renderCaseItem(supportCase, index) {
    return <CaseListItem key={index} supportCase={supportCase} />;
  }

  // getUpToDate() {
  //   let now = (new Date()).getTime();
  //   this.props.getUpToDateCases(now);
  // }

  render() {
    if (!this.props.cases || this.props.cases.length === 0) {
      return <div>No cases to render.</div>;
    }

    const cases = this.props.cases.map(CaseList.renderCaseItem);

    return (
      <div>
        <h1>Cases</h1>
        <Button bsStyle="primary" onClick={this.getUpToDate.bind(this)}>Get Up-to-date cases</Button>
        <ListGroup>{cases}</ListGroup>
      </div>
    );
  }
}

CaseList.propTypes = {
  // fetchCases: PropTypes.func.isRequired,
  cases: PropTypes.arrayOf(Object).isRequired,
  getUpToDateCases: PropTypes.func.isRequired
};

export default CaseList;
