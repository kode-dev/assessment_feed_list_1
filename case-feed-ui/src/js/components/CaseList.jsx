import React, { Component } from 'react';
import { ListGroup, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import CaseListItem from './CaseListItem';

class CaseList extends Component {
  constructor(props) {
    super(props);

    this.getUpToDate = this.getUpToDate.bind(this);
  }
  componentWillMount() {
    // let now = (new Date()).getTime();
    // this.props.getUpToDateCases(now);
    this.props.fetchCases();
  }

  static renderCaseItem(supportCase, index) {
    return <CaseListItem key={index} supportCase={supportCase} />;
  }

  getUpToDate() {
    let now = new Date();
    let begin = now.getTime();
    let yesterday = now.setDate(now.getDate() - 1);
    this.props.getUpToDateCases(begin, yesterday);
  }

  render() {
    if (!this.props.cases || this.props.cases.length === 0) {
      return <div>No cases to render.</div>;
    }

    const cases = this.props.cases.map(CaseList.renderCaseItem);

    return (
      <div>
        <h1>Cases</h1>
        <Button bsStyle="primary" onClick={this.getUpToDate}>Get Up-to-date cases</Button>
        <ListGroup>{cases}</ListGroup>
      </div>
    );
  }
}

CaseList.propTypes = {
  fetchCases: PropTypes.func.isRequired,
  cases: PropTypes.arrayOf(Object).isRequired,
  getUpToDateCases: PropTypes.func
};

export default CaseList;
