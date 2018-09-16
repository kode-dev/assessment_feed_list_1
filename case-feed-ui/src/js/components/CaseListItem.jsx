import React, { Component } from 'react';
import { ListGroupItem } from 'react-bootstrap'

// props:
// - case
class CaseListItem extends Component {
  render() {
    return (
      <ListGroupItem header={this.props.case.label}>
      	{`${this.props.case.id} ${this.props.case.clientEmail}`}
      </ListGroupItem>
    );
  }
}

export default CaseListItem;
