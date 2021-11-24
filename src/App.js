import './App.css';
import React from 'react';
import { ToastContainer } from 'react-toastify';
import Routes from './routes';
import 'react-toastify/dist/ReactToastify.css';

const App = function () {
  return (
    <div className='app-container'>
      <Routes />
      <ToastContainer draggable={false} autoClose={4000} />
    </div>
  );
};

export default App;
