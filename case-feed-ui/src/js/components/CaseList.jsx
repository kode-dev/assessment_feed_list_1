import React, { Component } from 'react';
import { ListGroup } from 'react-bootstrap'
import CaseListItem from './CaseListItem'

class CaseList extends Component {

  componentWillMount() {
    this.props.fetchCases();
  }

  renderCaseItem(supportCase, index) {
    return (<CaseListItem key={index} case={supportCase} />);
  }

  render() {
    if (!this.props.cases || this.props.cases.length == 0) {
      return (<div>No cases to render.</div>)
    }
    
    let cases = this.props.cases.map(this.renderCaseItem.bind(this));

    return (
    	<div>
    		<h1>Cases</h1>
  			<ListGroup>
  				{cases}
  			</ListGroup>
		</div>
    );
  }
}

export default CaseList;
