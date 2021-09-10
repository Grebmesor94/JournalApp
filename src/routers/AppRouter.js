import React, { useEffect, useState } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Redirect
} from "react-router-dom";

import { useDispatch } from 'react-redux';
import {onAuthStateChanged, getAuth} from 'firebase/auth'
import { JournalScreen } from '../components/journal/JournalScreen';
import { AuthRouter } from './AuthRouter';
import { login } from '../actions/auth';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';
import { startLoadingNotes } from '../actions/notes';


export const AppRouter = () => {
  const auth = getAuth();

  const dispatch = useDispatch();

  const [checking, setChecking] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if(user?.uid) {
        dispatch(login(user.uid, user.displayName))
        setIsLoggedIn(true);
        dispatch(startLoadingNotes(user.uid));
        
      } else {
        setIsLoggedIn(false);
      }

      setChecking(false);
    })    
  }, [dispatch, auth, setChecking, setIsLoggedIn])

  if(checking) {
    return (
      <h1>Por favor espere...</h1>
    )
  }

  return (
    <Router>
      <div>
        <Switch>

          <PublicRoute isAunthenticated={isLoggedIn} path='/auth' component={AuthRouter} />

          <PrivateRoute isAuthenticated={isLoggedIn} exact path='/' component={JournalScreen} />

          <Redirect to='/auth/login' />

        </Switch>
      </div>
    </Router>
  )
}
