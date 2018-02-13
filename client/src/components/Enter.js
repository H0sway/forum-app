import React from 'react';
import { Link } from 'react-router-dom';

const Enter = () => {
  return(
    <div className="Enter">
      <h3>Head into the site!</h3>
      <div className="enter-button"><Link to="/topics">CLICKY CLICKY</Link></div>
    </div>
    )
}

export default Enter;
