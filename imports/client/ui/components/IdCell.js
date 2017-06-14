import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

const IdCell = props => (
  <div style={{ cursor: 'pointer', textDecoration: 'underline' }} onClick={() => props.history.push(`/documents/${props.value}`)}>
    { props.value }
  </div>
);

IdCell.defaultProps = {
  history: null,
};

IdCell.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  history: PropTypes.object,
};

export default withRouter(IdCell);
