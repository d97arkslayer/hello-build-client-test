import React, { useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import { toast } from 'react-toastify';
import { Card } from 'react-bootstrap';
import './styles.css';
import { post } from '../../utils/HttpRequests';
import { apiUrls, localStorageKeys } from '../../utils/Consts';
import { useGitCloneState } from '../../contexts/GitCloneStateContext';
import useLocalStorage from '../../hooks/UseLocalStorage';

const GET_REPOSITORIES = gql`
 query repoQuery($after: String) {
    viewer {
      repositories(first: 100, after: $after) {
        totalCount
        pageInfo {
          endCursor
          hasNextPage
        }
        nodes {
          id
          name
          description
          createdAt
          owner {
            login
          }
        }
      }
    }
  }`;

const ListRepositories = function ({ favorites, setFavorites }) {
  const { translation } = useGitCloneState();
  const [token] = useLocalStorage(localStorageKeys.authToken);
  const {
    loading, error, data,
  } = useQuery(GET_REPOSITORIES, {
    variables: { after: null },
  });
  const [loadingGraph, setLoadingGraph] = useState(false);
  if (loading) {
    if (!loadingGraph) {
      toast('Loading', { type: 'info', autoClose: 500 });
      setLoadingGraph(true);
    }
    return 'Loading...';
  }
  if (error) {
    toast(`Error: ${error.message}`, { type: 'error', autoClose: 5000 });
    return `Error: ${error.message}`;
  }

  const repositories = data.viewer.repositories.nodes;
  const addFavorite = async (repository) => {
    const payload = {
      github_id: repository.id,
      name: repository.name,
      description: repository.description,
      created_at: repository.createdAt,
      owner: repository.owner.login,
    };
    const response = await post(apiUrls.addFavorite, payload, translation, token);
    if (response.error) {
      return;
    }
    await setFavorites(response);
  };
  return (
    <div className='repositories-container'>
      <h1 className='repositories-h1'>My repositories!</h1>
      <div className='repositories-scroll'>
        {repositories.map((repository, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <Card key={index} className='my-1 repositories-list'>
            <div className='d-flex flex-row justify-content-between'>
              <Card.Title>{repository.name}</Card.Title>
              <div>
                {'Owner: '}
                {repository.owner.login}
              </div>
            </div>
            <div className='d-flex flex-row justify-content-between' style={{ height: '40px' }}>
              <div>
                Created At:
                {' '}
                {new Date(repository.createdAt).toDateString()}
              </div>
              <svg
                width={30}
                height={30}
                className='favorite'
                style={{
                  fill: favorites.find((favorite) => favorite.github_id === repository.id) && 'red',
                }}
                xmlns='http://www.w3.org/2000/svg'
                fillRule='evenodd'
                clipRule='evenodd'
                onClick={() => addFavorite(repository)}
              >
                <path
                  d='M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402m5.726-20.583c-2.203 0-4.446 1.042-5.726 3.238-1.285-2.206-3.522-3.248-5.719-3.248-3.183 0-6.281 2.187-6.281 6.191 0 4.661 5.571 9.429 12 15.809 6.43-6.38 12-11.148 12-15.809 0-4.011-3.095-6.181-6.274-6.181'
                />
              </svg>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ListRepositories;
