import React, { useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import { useGitCloneState } from '../../contexts/GitCloneStateContext';
import './styles.css';

const Footer = function () {
  const { translation, setTranslation } = useGitCloneState();
  console.log(translation);
  return (
    <div className='footer-translation'>
      <Dropdown>
        <Dropdown.Toggle variant='primary' id='dropdown-translation'>
          {translation}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onClick={(e) => setTranslation('es')}>es</Dropdown.Item>
          <Dropdown.Item onClick={(e) => setTranslation('en')}>en</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default Footer;
