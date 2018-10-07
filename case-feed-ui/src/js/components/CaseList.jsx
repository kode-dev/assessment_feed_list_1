import React, { Component } from 'react';
import { ListGroup, Button, FormGroup, FormControl } from 'react-bootstrap';
import moment from 'moment';
import PropTypes from 'prop-types';
import CaseListItem from './CaseListItem';

class CaseList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      item: null,
      day: 1,
      showFilter: false,
      valid: false,
    };
    this.toggleFilter = this.toggleFilter.bind(this);
    this.getUpToDate = this.getUpToDate.bind(this);
    this.getLimitedItem = this.getLimitedItem.bind(this);
    this.getDay = this.getDay.bind(this);
  }
  componentWillMount() {
    this.props.fetchCases();
  }

  static renderCaseItem(supportCase, index) {
    return <CaseListItem key={index} supportCase={supportCase} />;
  }

  getUpToDate() {
    const now = moment();
    const daysBefore = moment().subtract(this.state.day || 1, 'days').startOf('day');
    this.props.getUpToDateCases(now.valueOf(), daysBefore.valueOf(), this.state.item);
  }

  getLimitedItem(e) {
    this.setState({
      item: e.target.value,
    });
    this.isDataValid();
  }

  getDay(e) {
    this.setState({
      day: e.target.value,
    });
    this.isDataValid();
  }

  toggleFilter() {
    this.setState({
      showFilter: !this.state.showFilter,
    });
  }
  isDataValid() {
    if (this.state.day && this.state.item) {
      this.setState({
        valid: true,
      });
    }
  }

  render() {
    if (!this.props.cases || this.props.cases.length === 0) {
      return <div>No cases to render.</div>;
    }

    const cases = this.props.cases.map(CaseList.renderCaseItem);

    return (
      <div>
        <h1>Cases</h1>
        <div>
          <Button bsStyle="primary" onClick={this.toggleFilter}>Get Up-to-date cases</Button>
          {this.state.showFilter && <div className="filter-group">
            <span style={{ padding: '0 5px' }}>Update list cases from </span>
            <FormGroup controlId="formControlsSelect" style={{ display: 'inline-block' }}>
              <FormControl componentClass="select" placeholder="select" onChange={this.getDay}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </FormControl>
            </FormGroup>
            <span style={{ padding: '0 5px' }}>days ago with litmited</span>
            <input type="number" onChange={this.getLimitedItem} /><span style={{ padding: '0 5px' }}>items</span>
            <Button bsStyle="primary" disabled={!this.state.valid} onClick={this.getUpToDate}>Confirm</Button>
          </div>}
        </div>
        <ListGroup>{cases}</ListGroup>
      </div>
    );
  }
}

CaseList.propTypes = {
  fetchCases: PropTypes.func.isRequired,
  cases: PropTypes.arrayOf(Object).isRequired,
  getUpToDateCases: PropTypes.func,
};

export default CaseList;
