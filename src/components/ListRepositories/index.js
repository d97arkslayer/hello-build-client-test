import React, { useCallback, useRef } from 'react';
import { gql, useQuery } from '@apollo/client';

const GET_REPOSITORIES = gql`
 query repoQuery($after: String) {
    viewer {
      repositories(first: 3, after: $after) {
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
    loading, error, data, fetchMore,
  } = useQuery(GET_REPOSITORIES, {
    variables: { after: null },
  });
  const observer = useRef();
  const lastRepositoryRef = useCallback((node) => {
    if (loading || !data.viewer.repositories.pageInfo.hasNextPage) {
      return;
    }
    if (observer.current) {
      observer.current.disconnect();
    }
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        fetchMore({
          variables: { after: data.viewer.repositories.pageInfo.endCursor },
          updateQuery: ((previousQueryResult, options) => {
            options.fetchMoreResult.viewer.repositories.nodes = [
              ...previousQueryResult.viewer.repositories.nodes,
              ...options.fetchMoreResult.viewer.repositories.nodes,
            ];
            return options.fetchMoreResult;
          }),
        });
      }
    }, { threshold: 1.0 });
    if (node) {
      observer.current.observe(node);
    }
  }, [loading, fetchMore, data]);

  if (loading) {
    return 'Loading...';
  }
  if (error) {
    return `Error: ${error.message}`;
  }

  const repositories = data.viewer.repositories.nodes;
  return (
    <div>
      {repositories.map((repository, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <div key={index} ref={index === repositories.length - 1 ? lastRepositoryRef : null}>
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
