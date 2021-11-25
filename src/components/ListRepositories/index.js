import React, { useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import { toast } from 'react-toastify';

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

const ListRepositories = function () {
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
  return (
    <div>
      {repositories.map((repository, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <div key={index}>
          <div className='d-flex flex-row justify-content-between'>
            <div>{repository.name}</div>
            <div>
              Owner:
              {repository.owner.login}
            </div>
          </div>
          <div className='d-flex flex-row justify-content-between'>
            <div>
              Created At:
              {' '}
              {new Date(repository.createdAt).toDateString()}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListRepositories;
