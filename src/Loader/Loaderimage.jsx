import React from 'react';
import loading from '../img/loading.gif';
import './Loader.css';

const Loaderimage = ({ show, zindex }) => {

  return ( 
    <div className="modal" role="dialog" style={{ display: show, zIndex: '100000' }}>
      <img className="loader img-fluid" src={loading} style={{ zindex }} alt="Loading..." />
    </div>
  );
};

export default Loaderimage;
