import React from 'react'
import { Link } from 'react-router-dom'
import { useForm } from '../../hooks/useForm'
import validator from 'validator'
import { useDispatch, useSelector } from 'react-redux'
import {setError, removeError} from '../../actions/ui'
import { startRegister } from '../../actions/auth'

export const RegisterScreen = () => {

  const dispatch = useDispatch();
  const {msgError, loading} = useSelector(state => state.ui)

  const [formValues, handleInputChange] = useForm({
    fname: '',
    lname: '',
    email: '',
    password: '',
    confirm: ''
  })

  const { fname, lname, email, password, confirm } = formValues;

  const handleRegister = (e) => { 
    e.preventDefault();
    if(isFormValid()) {
      dispatch(startRegister(fname, lname, email, password))
    }
  }

  const isFormValid = () => { 

    if( fname.trim().length === 0 ){
      dispatch(setError('First name is required'))
      return false;
    } else if ( lname.trim().length === 0 ) {
      dispatch(setError('Last name is required'))
      return false; 
    } else if ( !validator.isEmail(email) ){
      dispatch(setError('Email is not valid'))
      return false; 
    } else if ( password.length <= 5 ){
      dispatch(setError('Password must have at least 6 caracters'))
      return false
    } else if ( password !== confirm ) {
      dispatch(setError('Password incorrect') )
      return false; 
    }

    dispatch(removeError())
    return true; 

  }  

  return (
    <>
    <h3 className="auth__title">Register</h3>

    <form className="auth__form animate__animated animate__fadeIn animate__faster" onSubmit={handleRegister}>

      {
        msgError && (
          <div className='auth__error'>{msgError}</div>
        )
      }

      <input
        autoComplete="off"
        className="auth__input" 
        type="text"
        placeholder="First Name"
        name="fname"
        onChange={handleInputChange}
        value={fname}

      />
      <input
        autoComplete="off"
        className="auth__input" 
        type="text"
        placeholder="Last Name"
        name="lname"
        onChange={handleInputChange}
        value={lname}

      />
      
      <input
        autoComplete="off"
        className="auth__input" 
        type="text"
        placeholder="Email"
        name="email"
        onChange={handleInputChange}
        value={email}

      />

      <input
        autoComplete="off"
        className="auth__input" 
        type="password"
        placeholder="Password"
        name="password"
        onChange={handleInputChange}
        value={password}

      />

      <input
        autoComplete="off"
        className="auth__input" 
        type="password"
        placeholder="Confirm your password"
        name="confirm"
        onChange={handleInputChange}
        value={confirm}

      />

      <button type="submit" className="button" disabled={loading}>
        Register
      </button>
    </form>

    <Link
      to="/auth/login"
      className="link"
    >
      Already registered?
    </Link>

  </>
  )
}
