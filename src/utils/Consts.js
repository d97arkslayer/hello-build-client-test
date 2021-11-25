export const gitClonePrefix = 'git-clone-';
export const lang = 'es';

export const localStorageKeys = {
  prefixUsers: `${gitClonePrefix}users`,
  prefixAuth: `${gitClonePrefix}auth`,
  prefixGitAuth: `${gitClonePrefix}git-auth`,
  users: 'users',
  auth: 'auth',
  gitAuth: 'git-auth',
  authToken: 'auth-jwt-token',
};

export const apiUrls = {
  login: `${process.env.REACT_APP_AUTH_API_URL}/api/users/login`,
  signUp: `${process.env.REACT_APP_AUTH_API_URL}/api/users`,
  getFavorites: `${process.env.REACT_APP_AUTH_API_URL}/api/users/favorites`,
  addFavorite: `${process.env.REACT_APP_AUTH_API_URL}/api/users/favorites`,
  deleteFavorite: `${process.env.REACT_APP_AUTH_API_URL}/api/users/favorites`,

};
