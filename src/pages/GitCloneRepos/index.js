import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import useLocalStorage from '../../hooks/UseLocalStorage';
import { localStorageKeys } from '../../utils/Consts';
import UserCard from '../../components/UserCard';
import ListRepositories from '../../components/ListRepositories';

const GitCloneRepos = function () {
  const [user] = useLocalStorage(localStorageKeys.auth);
  const [token] = useLocalStorage(localStorageKeys.authToken);
  const [gitAccessToken, setGitAccessToken] = useLocalStorage(localStorageKeys.gitAuth);
  const [favorites, setFavorites] = useState([]);
  const [gitCode, setGitCode] = useState(null);
  const queryParams = new URLSearchParams(useLocation().search);
  const code = queryParams.get('code');

  useEffect(async () => {
    async function getGitAccessToken() {
      if (code && !gitAccessToken) {
        setGitCode(code);
        const url = `/access_token?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}&code=${code}`;
        const response = await fetch(url, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            Accept: 'application/json',
          },
        });
        const data = await response.json();
        setGitAccessToken(data.access_token);
      }
    }

    await getGitAccessToken();
  }, [gitCode, setGitAccessToken, gitAccessToken]);

  return (
    <div className='container d-flex flew-row py-5'>
      <div
        className='col-md-4 col-sm-12'
        style={{
          maxHeight: 'calc(100vh-180px',
        }}
      >
        <UserCard user={user} />
        <h1>Favoritos</h1>
      </div>
      <div
        className='col-md-9 col-sm-12 px-5 overflow-auto'
        style={{
          maxHeight: 'calc(100vh - 180px)',
        }}
      />
      {gitAccessToken && <ListRepositories />}
    </div>
  );
};

export default GitCloneRepos;
