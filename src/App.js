import './App.css';
import React from 'react';
import { ToastContainer } from 'react-toastify';
import Routes from './routes';
import 'react-toastify/dist/ReactToastify.css';
import { GitCloneStateProvider } from './contexts/GitCloneStateContext';
import Header from './components/Header';

const App = function () {
  return (
    <div className='app-container'>
      <GitCloneStateProvider>
        <Routes />
        <Header />
        <ToastContainer draggable={false} autoClose={4000} />
      </GitCloneStateProvider>
    </div>
  );
};

export default App;
