import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startLogout } from '../../actions/auth';
import { startNewNote } from '../../actions/notes';
import { JournalEntries } from './JournalEntries'

export const Sidebar = () => {

  const {name} = useSelector(state => state.auth)

  const dispatch = useDispatch();

  const handleLogout = () => { 
    dispatch(startLogout())
  }

  const handleAddNew = () => {
    dispatch(startNewNote())
  }

  return (
    <aside className="journal__sidebar">
      <div className="journal__navbar">
        <h3>
          <i className="far fa-moon"></i>
          <span className="journal__navbar-name">{name}</span>
        </h3>

        <button 
          className="button" 
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>

      <div
        className="journal__new-entry"
        onClick={handleAddNew}
      >
        <i className="far fa-calendar-plus fa-5x"></i>
        <p>New Entry</p>        
      </div>

      <JournalEntries />
      
    </aside>
  )
}
