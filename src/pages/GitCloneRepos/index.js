import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import useLocalStorage from '../../hooks/UseLocalStorage';
import { localStorageKeys, apiUrls } from '../../utils/Consts';
import UserCard from '../../components/UserCard';
import ListRepositories from '../../components/ListRepositories';
import { useGitCloneState } from '../../contexts/GitCloneStateContext';
import { get } from '../../utils/HttpRequests';
import Favorites from '../../components/favorites';

const GitCloneRepos = function () {
  const [user] = useLocalStorage(localStorageKeys.auth);
  const [token] = useLocalStorage(localStorageKeys.authToken);
  const [gitAccessToken, setGitAccessToken] = useLocalStorage(localStorageKeys.gitAuth);
  const [favorites, setFavorites] = useState([]);
  const [gitCode, setGitCode] = useState(null);
  const queryParams = new URLSearchParams(useLocation().search);
  const code = queryParams.get('code');
  const { translation } = useGitCloneState();
  const getFavorites = async () => {
    const headers = {
      Authorization: `Bearer ${token}`,
      'Accept-Language': translation,
      'Content-Type': 'json/application',
    };
    const response = await get(
      apiUrls.getFavorites,
      headers,
    );
    if (response.error) {
      setFavorites([]);
      return;
    }
    setFavorites(response);
  };

  const getGitAccessToken = async () => {
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
  };

  useEffect(async () => {
    if (!gitAccessToken) {
      await getGitAccessToken();
    }
    await getFavorites();
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
        <Favorites favorites={favorites} setFavorites={setFavorites} />
      </div>
      <div
        className='col-md-4 col-sm-6 col-lg-9'
        name='my_repositories'
      >
        {/* eslint-disable-next-line max-len */}
        {gitAccessToken && <ListRepositories favorites={favorites} setFavorites={setFavorites} />}
      </div>
    </div>
  );
};

export default GitCloneRepos;
