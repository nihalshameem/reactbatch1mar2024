import React from 'react';
import PropTypes from 'prop-types';
import './Logo.css';
import LogoPath from '../../assets/sriramlogo.jpeg'
const Logo = () => (
  <img src={LogoPath} className="Logo"/>
);

Logo.propTypes = {};

Logo.defaultProps = {};

export default Logo;
