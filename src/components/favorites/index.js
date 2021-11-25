import React from 'react';
import { Card } from 'react-bootstrap';
import './styles.css';

const Favorites = function ({ favorites }) {
  return (
    <div className='mt-5 favorites-container'>
      <h3 className='favorites-h3'>{'Favorites <3'}</h3>
      <div className='favorites-scroll'>
        {favorites.map((repository, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <Card className='my-1 d-flex flex-row justify-content-between favorites-list' key={index}>
            <Card.Title>{repository.name}</Card.Title>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Favorites;
