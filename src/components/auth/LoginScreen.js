import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { startGoogleLogin, startLoginEmailPassword } from '../../actions/auth'

import validator from 'validator';
import { useForm } from '../../hooks/useForm'
import { removeError, setError } from '../../actions/ui';

export const LoginScreen = () => {

  const { msgError, loading } = useSelector(state => state.ui)

  const dispatch = useDispatch();

  const [ formValues, handleInputChange ] = useForm({
    email: '',
    password: ''
  })

  const {email, password} = formValues;

  const handleLogin = (e) => { 
    e.preventDefault();

    if(infoIsValid()) {
      dispatch(startLoginEmailPassword(email, password));
    }
  }

  const handleGoogleLogin = () => { 
    dispatch( startGoogleLogin());
  }

  const infoIsValid = () => { 
    if ( !validator.isEmail(email) ){
      dispatch(setError('Email is not valid'))
      return false; 
    } else if ( password.length <= 5 ){
      dispatch(setError('Password incorrect'))
      return false
    }

    dispatch(removeError())
    return true; 
  }

  return (
    <>
      <h3 className="auth__title">Login</h3>

      <form className="auth__form animate__animated animate__fadeIn animate__faster" onSubmit={handleLogin}>
          
        {
          msgError && (
            <div className='auth__error'>{msgError}</div>
          )
        }

        <input
          autoComplete="off"
          className="auth__input" 
          type="text"
          placeholder="Email"
          name="email"
          value={email}
          onChange={handleInputChange}
        />

        <input
          autoComplete="off"
          className="auth__input" 
          type="password"
          placeholder="Password"
          name="password"
          value={password}
          onChange={handleInputChange}
        />

        <button type="submit" className="button" disabled={loading}>
          Login
        </button>
      </form>

      <div className="social-box">

        <p className="social-box__text">auth with social media</p>

        <div 
          className="google-btn"
          onClick={handleGoogleLogin}
        >
          <div className="google-icon-wrapper">
            <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
          </div>
          <p className="btn-text">
              <b>Sign in with google</b>
          </p>
        </div>

      </div>

      <Link
        to='/auth/register'
        className="link"
      >
        Create new account
      </Link>

    </>
  )
}
