import React from 'react';
import { Card } from 'react-bootstrap';
import './styles.css';
import { deleteRequest } from '../../utils/HttpRequests';
import { apiUrls, localStorageKeys } from '../../utils/Consts';
import { useGitCloneState } from '../../contexts/GitCloneStateContext';
import useLocalStorage from '../../hooks/UseLocalStorage';

const Favorites = function ({ favorites, setFavorites }) {
  const { translation } = useGitCloneState();
  const [token] = useLocalStorage(localStorageKeys.authToken);
  const removeFavorite = async (favorite) => {
    const payload = { favorite_id: favorite.id };
    const response = await deleteRequest(apiUrls.deleteFavorite, payload, translation, token);
    if (response.error) {
      return;
    }
    await setFavorites(response);
  };
  return (
    <div className='mt-5 favorites-container'>
      <h3 className='favorites-h3'>
        {'Favorites <3'}
      </h3>
      <span style={{ color: 'gray', fontSize: '24px' }}>For eliminate click over the repo name</span>
      <div className='favorites-scroll'>
        {favorites.map((repository, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <Card
            className='my-1 d-flex flex-row justify-content-between favorites-list'
            key={index}
            onClick={() => removeFavorite(repository)}
          >
            <Card.Title>{repository.name}</Card.Title>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Favorites;
