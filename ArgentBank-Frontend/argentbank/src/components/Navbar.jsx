import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import '../styles/global.scss'
import argentBankLogo from "../assets/images/argentBankLogo.webp"
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../store/userSlice'

function Navbar() {
  const dispatch = useDispatch()
  const navigate = useNavigate()


  const token = localStorage.getItem("token")
  const profile = useSelector(state => state.user.data)

  const handleLogout = () => {
    dispatch(logout())        
    navigate('/')             
  }

  return (
    <nav className='main-nav'>
      <NavLink to="/" end className="main-nav-logo">
        <img
          className="main-nav-logo-image"
          src={argentBankLogo}
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </NavLink>

      <div>

        {token ? (
          <>
            <NavLink to="/user" className="main-nav-item">
              <i className="fa fa-user-circle"></i>
              {profile?.userName}
            </NavLink>

            <button
              onClick={handleLogout}
              className="main-nav-item"
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: 'inherit'
              }}
            >
              <i className="fa fa-sign-out"></i> Sign Out
            </button>
          </>
        ) : (
          
          <NavLink to="/sign-in" end className="main-nav-item">
            <i className="fa fa-user-circle"></i> Sign In
          </NavLink>
        )}

      </div>
    </nav>
  )
}

export default Navbar