import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AdminLogin: React.FC = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    // Hardcoded admin credentials
    if (username === 'user11' && password === '8710') {
      localStorage.setItem('adminToken', 'fake-admin-token') // Fake token for session
      navigate('/admin/dashboard')
    } else {
      setError('Invalid username or password')
    }
  }

  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-100'>
      <form
        onSubmit={handleLogin}
        className='bg-white p-6 rounded shadow-md w-96'
      >
        <h2 className='text-2xl font-bold mb-4 text-center'>Admin Login</h2>
        {error && <p className='text-red-500 text-sm mb-3'>{error}</p>}

        <input
          type='text'
          placeholder='Username'
          className='border p-2 w-full mb-3 rounded'
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
        />

        <input
          type='password'
          placeholder='Password'
          className='border p-2 w-full mb-4 rounded'
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />

        <button
          type='submit'
          className='bg-blue-600 text-white p-2 rounded w-full hover:bg-blue-700'
        >
          Login
        </button>
      </form>
    </div>
  )
}

export default AdminLogin
