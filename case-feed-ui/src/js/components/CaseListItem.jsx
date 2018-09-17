import React from 'react';
import { ListGroupItem } from 'react-bootstrap';
import PropTypes from 'prop-types';

function CaseListItem({ supportCase }) {
  return (
    <ListGroupItem header={supportCase.label}>
      {`${supportCase.id} ${supportCase.clientEmail}`}
    </ListGroupItem>
  );
}

CaseListItem.propTypes = {
  supportCase: PropTypes.object.isRequired,
};

export default CaseListItem;
