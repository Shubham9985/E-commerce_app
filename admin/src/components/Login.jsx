import React from 'react';
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';

const Login = ({ setToken }) => {

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [error, setError] = React.useState('');
    const [loading, setLoading] = React.useState(false);

    const onSubmitHandler = async (e) =>{
        try{
            e.preventDefault();
            setLoading(true);
            setError('');

             

            const response = await axios.post(backendUrl + '/api/user/adminLogin', { email, password });
            console.log('Response:', response.data);

            if(response.data.success){
                localStorage.setItem('token', response.data.token);
                setToken(response.data.token);
            } else {
                 toast.error(response.data.message);
            }

        }catch(error){
            console.error('Login error:', error);
            toast.error(error.message)
        } finally {
            setLoading(false);
        }

    }
  return (
    <div className='min-h-screen flex items-center justify-center w-full'>
        <div className='bg-white shadow-md rounded-lg px-8 py-6 max-w-md'>
            <h1 className='text-2xl font-bold text-gray-700 mb-4'>
                Admin Panel
            </h1>
            {error && (
                <div className='mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded'>
                    {error}
                </div>
            )}
            <form onSubmit={onSubmitHandler}>
                <div className='mb-3 min-w-72'>
                    <p className='text-sm font-medium text-gray-700 mb-2'>
                        Email-address
                    </p>
                    <input onChange={(e)=> setEmail(e.target.value)} value={email} className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none' type='email' placeholder='ypur@email.com' required/>
                </div>
                <div className='mb-3 min-w-72'>
                    <p className='text-sm font-medium text-gray-700 mb-2'>
                        Password
                    </p>
                    <input onChange={(e)=> setPassword(e.target.value)} value={password} type='password' placeholder='your Password' required className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none'/>
                </div>
                <button
                    type='submit'
                    disabled={loading}
                    className='mt-2 w-full py-2 px-4 rounded-md text-white bg-black disabled:bg-gray-400 disabled:cursor-not-allowed'
                >
                    {loading ? 'Logging in...' : 'Login'}
                </button>
            </form>
        </div>
    </div>
  );
};

export default Login;