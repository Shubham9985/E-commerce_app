import React from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { Routes, Route } from 'react-router-dom';
import AddItem from './pages/Add.jsx';
import ListItems from './pages/List.jsx';
import Orders from './pages/Orders.jsx';
import Login from './components/Login';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const backendUrl = import.meta.env.VITE_BACKEND_URL;
export const currency = '$';

const App = () => {
  const [token, setToken] = React.useState(localStorage.getItem('token') || '');

  React.useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    }
  }, [token]);



  return (
    <div className='bg-gray-50 min-h-screen '>
      <ToastContainer />
      {token === "" ? <Login setToken={setToken} /> :
        <>
          <Navbar  setToken={setToken} />
          <hr />
          <div className='flex w-full'>
            <Sidebar />
            <div className='w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base'>
              <Routes>
                <Route path='/add' element={<AddItem token={token} />} />
                <Route path='/list' element={<ListItems token={token} />} />
                <Route path='/orders' element={<Orders token={token} />} />
              </Routes>
            </div>
          </div>
        </>
      }

    </div>
  );
};

export default App;
