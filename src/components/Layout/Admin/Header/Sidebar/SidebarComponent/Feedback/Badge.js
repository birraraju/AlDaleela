// Badge.js
import React from 'react';
import PropTypes from 'prop-types';

const Badge = ({ variant, className, children }) => {
  return (
    <span className={`badge badge-${variant} ${className}`}>
      {children}
    </span>
  );
};

Badge.propTypes = {
  variant: PropTypes.oneOf(['success', 'error']).isRequired, // Define allowed variants
  className: PropTypes.string, // Optional additional class names
  children: PropTypes.node.isRequired, // Ensure children are defined
};

Badge.defaultProps = {
  className: '', // Default to an empty string
};

export default Badge;
