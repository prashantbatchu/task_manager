import React from 'react';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AxiosError } from 'axios';
import { UseSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../store';
import { register  } from '../store/slice/authSlice';


function Register() {
    
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setpasswordError] = useState('');
    const [emailError, setEmailError] = useState('');




    return (
    <div className='min-h-screen flex items-center justify-center dark: bg-gray-900 py-12 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-md w-full space-y-8'>
            <div>
                <h2 className='mt-6 text-center text-3xl font-extrabold text-grey-900 dark: text-white'> Make your account </h2> 
            </div>

            <form action='#' method='POST' className='mt-8 space-y-6'>
                <div className='rounded-md shadow-sm -space-y-px'>
                    <div>
                        {/* <label htmlFor='username' className='sr-only'>Username</label> */}
                        <input
                            id='username'
                            name='username'
                            type='text'
                            // autoComplete='username'
                            required
                            className='appearance-none rounded-md relative block w-full px-3 py-2 border bg-transparent border-gray-300 dark:border-gray-700 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
                            placeholder='Username'
                            value={username} 
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <br />
                    <div>
                        {/* <label htmlFor='email' className='sr-only'>Email address</label> */}
                        <input
                            id='email'
                            name='email'
                            type='email'
                            // autoComplete='email'
                            required
                            className='appearance-none rounded-md relative block w-full px-3 py-2 bg-transparent border border-gray-300 dark:border-gray-700 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
                            placeholder='Email address'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <br />
                    <div>
                        {/* <label htmlFor='password' className='sr-only'>Password</label> */}
                        <input
                            id='password'
                            name='password'
                            type='password'
                            // autoComplete='current-password'
                            required
                            className='appearance-none rounded-md relative block w-full px-3 py-2 bg-transparent border border-gray-300 dark:border-gray-700 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
                            placeholder='Password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <br />
                    <div>
                        {/* <label htmlFor='confirm-password' className='sr-only'>Confirm Password</label> */}
                        <input
                            id='confirm-password'
                            name='confirm-password'
                            type='password'
                            placeholder='Confirm Password'
                            className='appearance-none rounded-md relative block w-full px-3 py-2 bg-transparent border border-gray-300 dark:border-gray-700 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            // autoComplete='new-password'
                            required    
                        /> 
                    </div>
                    <br />
                    <br />
                    <div>
                        <button
                            type='submit'
                            className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
                            Create Account
                        </button>
                    </div>
                    <br />
                    <div className='text-sm text-center'>
                        {/* <Link to="/login" className='font-medium text-indigo-600 hover:text-indigo-500'>
                            Already have an account? Sign in
                        </Link> */}
                        <a href='/login' className='font-medium text-indigo-600 hover:text-indigo-500' > Already have an account? Sign in </a>
                    </div>
                </div>
            </form>
        </div>
    </div>
  );
}
export default Register;