import React from 'react';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AxiosError } from 'axios';

function Login(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    // const navigate = useNavigate();

    return (
        <div className='min-h-screen flex items-center justify-center dark: bg-gray-900 py-12 px-4 sm:px-6 lg:px-8'>
            <div className='max-w-md w-full space-y-8'>
                <div>
                    <h2 className='mt-6 text-center text-3xl font-extrabold text-grey-900 dark: text-white'>Sign in to your account</h2>
                </div>
                <form className='mt-8 space-y-6'>
                    <div className='rounded-md shadow-sm -space-y-px'>
                        <div>
                            <input
                                id='email'
                                name='email'
                                type='email'
                                required
                                className='appearance-none rounded-md relative block w-full px-3 py-2 bg-transparent border border-gray-300 dark:border-gray-700 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
                                placeholder='Email address'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                />
                        </div>
                        <br />
                        <div>
                            <input
                                id='password'
                                name='password'
                                type='password'
                                required
                                className='appearance-none rounded-md relative block w-full px-3 py-2 border bg-transparent border-gray-300 dark:border-gray-700 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
                                placeholder='Password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <br />
                        <div>
                            <button
                                type='submit'
                                className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
                                
                                Sign in / log in
                            </button>
                        </div>
                        <br/>
                        <div className='text-sm text-center'>
                            {/* <Link to="/register" className='font-medium text-indigo-600 hover:text-indigo-500'>
                                Does not have an account? Register
                            </Link> */}
                            <a href='/register' className='font-medium text-indigo-600 hover:text-indigo-500' > Does not have an account? Register </a>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );

}


export default Login;