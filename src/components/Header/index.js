import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { useGitCloneState } from '../../contexts/GitCloneStateContext';
import './styles.css';

const Footer = function () {
  const { translation, setTranslation } = useGitCloneState();
  return (
    <div className='footer-translation'>
      <Dropdown>
        <Dropdown.Toggle variant='success' id='dropdown-translation'>
          {translation}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onClick={() => setTranslation('es')}>es</Dropdown.Item>
          <Dropdown.Item onClick={() => setTranslation('en')}>en</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default Footer;
