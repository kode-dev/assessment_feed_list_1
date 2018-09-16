import React, { Component } from 'react';
import { ListGroup } from 'react-bootstrap'
import CaseListItem from './CaseListItem'

class CaseList extends Component {

  componentDidMount() {
    this.props.fetchCases();
  }

  render() {
    let cases = this.props.cases.map((supportCase) => {
      return (<CaseListItem case={supportCase} />);
    });

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
