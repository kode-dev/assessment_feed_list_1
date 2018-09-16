import React, { Component } from 'react';
import { ListGroup } from 'react-bootstrap'
import CaseListItem from './CaseListItem'

class CaseList extends Component {

  componentWillMount() {
    this.props.fetchCases();
  }

  renderCaseItem(item) {
    return (<CaseListItem case={supportCase} />);
  }

  render() {
    if (!this.props.cases || this.props.cases.isEmpty()) {
      return; //TODO: render empty view
    }
    let cases = this.props.cases.map(renderCaseItem);

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
