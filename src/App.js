import logo from './logo.svg';
import './App.css';
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
    return (
        <>
            <ToastContainer draggable={false} autoClose={4000}/>
        </>
    );
}

export default App;
