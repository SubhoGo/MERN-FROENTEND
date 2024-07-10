import { useMutation } from '@tanstack/react-query';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { register } from '../Utils/Api';

const Register = () => {
  const navigate = useNavigate();
  const [alldata, setAlldata] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAlldata({ ...alldata, [name]: value });
  };

  const mutation = useMutation({
    mutationKey: ['register'],
    mutationFn: register,
    onSuccess: () => {
      navigate('/login');
      toast.success('Registered Successfully');
    },
    onError: (error) => {
      toast.error(`Registration failed: ${error.message}`);
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(alldata);
    mutation.mutate(alldata);
  };

  return (
    <div className="flex min-h-screen justify-center items-center bg-gradient-to-br from-blue-200 to-indigo-100">
      <div className="sm:mx-auto sm:w-full sm:max-w-md p-6 bg-white shadow-md rounded-md">
        <h2 className="mt-4 mb-6 text-center text-3xl font-bold text-gray-900">Create An Account</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-700">
              Name
            </label>
            <input
              id="name"
              name="name"
              value={alldata.name}
              onChange={handleChange}
              type="text"
              autoComplete="name"
              required
              className="block w-full rounded-md border border-blue-300 shadow-sm mt-4 mb-4 h-10 focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-700">
              Email
            </label>
            <input
              id="email"
              name="email"
              value={alldata.email}
              onChange={handleChange}
              type="email"
              autoComplete="email"
              required
              className="block w-full rounded-md border border-blue-300 shadow-sm mt-4 mb-4 h-10 focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-700">
              Password
            </label>
            <input
              id="password"
              name="password"
              value={alldata.password}
              onChange={handleChange}
              type="password"
              autoComplete="current-password"
              required
              className="block w-full rounded-md border border-blue-300 shadow-sm focus:border-indigo-500 mt-4 mb-4 h-10 focus:ring-indigo-500"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mt-4 mb-4"
              disabled={mutation.isLoading}
            >
              {mutation.isLoading ? 'Registering...' : 'Register'}
            </button>
            <p className="text-sm font-light text-gray-500">
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-primary-600 hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
