import './App.css';
import React from 'react';
import { ToastContainer } from 'react-toastify';
import Routes from './routes';
import 'react-toastify/dist/ReactToastify.css';
import { GitCloneStateProvider } from './contexts/GitCloneStateContext';
import Footer from './components/Footer';

const App = function () {
  return (
    <div className='app-container'>
      <GitCloneStateProvider>
        <Routes />
        <Footer />
        <ToastContainer draggable={false} autoClose={4000} />
      </GitCloneStateProvider>
    </div>
  );
};

export default App;
