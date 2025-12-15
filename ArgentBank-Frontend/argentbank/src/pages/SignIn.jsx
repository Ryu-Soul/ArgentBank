import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../store/userSlice'
import { useNavigate } from 'react-router-dom'
import '../styles/global.scss'

export default function SignIn() {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { status, error } = useSelector(state => state.user)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(loginUser({ email, password }))
      .unwrap()
      .then(() => {
        navigate('/User')
      })
      .catch(() => {
      })
  }

  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>

        <form onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <label htmlFor="username">Username</label>
            <input 
              type="text" 
              id="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="username"
            />
          </div>

          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
          </div>

          <div className="input-remember">
            <input type="checkbox" id="remember-me" />
            <label htmlFor="remember-me">Remember me</label>
          </div>

          <button className="sign-in-button" type="submit">
            {status === 'loading' ? 'Connexion...' : 'Sign In'}
          </button>

          {status === 'failed' && (
            <p style={{ color: 'red', marginTop: '1rem' }}>{error}</p>
          )}

        </form>
      </section>
    </main>
  )
}