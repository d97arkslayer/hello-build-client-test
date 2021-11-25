import React from 'react';
import { Card } from 'react-bootstrap';
import { FaUserCircle } from 'react-icons/fa';
import './styles.css';

const UserCard = function ({ user }) {
  return (
    <Card className='col-md-8 col-sm-12 ms-4 user-card-container'>
      <Card.Body className='d-flex flex-row user-card-body'>
        <div className='text'>
          <Card.Title>{`${user.name} ${user.lastname}`}</Card.Title>
          <Card.Subtitle className='mb-2 text-black'>
            {user.email}
          </Card.Subtitle>
        </div>
        <FaUserCircle size={50} style={{ marginLeft: '35%' }} />
      </Card.Body>
    </Card>
  );
};

export default UserCard;
