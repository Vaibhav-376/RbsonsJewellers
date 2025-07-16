"use client";


import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const AdminLoginLogoutPage = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [formData, setformData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setformData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const endPoint = '/api/auth/login';
    try {
      const res = await fetch(endPoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Login failed');
        setformData({ email: '', password: '' });
      } else {
        alert("Admin logged in successfully!");
        router.push('/admin/addProducts');
      }
    } catch (err) {
      console.error(err);
      setError("Unexpected error. Please try again.");
    }
  };

  return (
    <div>
      <div className='text-center'>
        <h1 className='text-2xl mt-2 font-bold'>Welcome to Admin Panel</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type='email'
          name='email'
          placeholder='Email'
          onChange={handleChange}
          required
        />
        <input
          type='password'
          name='password'
          placeholder='Password'
          onChange={handleChange}
          required
        />
        <button type='submit'>Login</button>
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  );
};

export default AdminLoginLogoutPage;