import Swal from 'sweetalert2'
import {
  getAuth, 
  signInWithPopup, 
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth'
import {googleAuthProvider} from '../firebase/firebase-config'
import {types} from '../types/types'
import { finishLoading, startLoading } from './ui'
import { noteLogout } from './notes'

const auth = getAuth()

export const startLoginEmailPassword = (email, password) => { 
  return (dispatch) => {

    dispatch(startLoading());

    signInWithEmailAndPassword(auth, email, password)
      .then(({user: {uid, displayName}}) => { 
        dispatch(login(uid, displayName));
        dispatch(finishLoading());
      })
      .catch(err => {
        dispatch(finishLoading());
        Swal.fire('Error', err.message, 'error')
      });
  }
}

export const startGoogleLogin = () => {

  return (dispatch) => {


    signInWithPopup(auth, googleAuthProvider)
      .then(({user: {uid, displayName}}) => { 
        dispatch(
          login(uid, displayName )
        )
      })
  }
}

export const startRegister = (fname, lname, email, password) => {
  return (dispatch) => { 

    dispatch(startLoading());

    createUserWithEmailAndPassword(auth, email, password)
      .then(async ({user}) => { 
        
        await updateProfile(user, {displayName: `${fname} ${lname}`});
        dispatch(login(user.uid, user.displayName));
        dispatch(finishLoading());
      })
      .catch(err => {
        console.log(err);
        dispatch(finishLoading())
        Swal.fire('Error', err.message, 'error')
      });
  }
}


export const login = (uid, displayName) => ({
  type: types.login,
    payload: {
      uid,
      displayName
    }
})

export const startLogout = () => {
  return async(dispatch) => {
    await signOut(auth)
    dispatch(logout());
    dispatch(noteLogout());
  }
}

export const logout = () => ({
  type: types.logout
}) 



    