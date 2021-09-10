import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { activeNote, startDelete } from '../../actions/notes'
import { useForm } from '../../hooks/useForm'
import { NotesAppBar } from './NotesAppBar'

export const NoteScreen = () => {

  const {active:note} = useSelector(state => state.notes)
  const dispatch = useDispatch();
  const [formValues, handleInputChange, reset ] = useForm(note)
  const {body, title, url, id} = formValues

  const activeId = useRef(note.id)
  
  useEffect(() => {
    if(note.id !== activeId.current){
      reset(note);
      activeId.current = note.id;
    }
  }, [note, reset])

  useEffect(() => {
    dispatch(activeNote(formValues.id, {...formValues}))
  }, [formValues, dispatch])
  
  const handleDelete = () => { 
    dispatch(startDelete(id));
  }

  return (
    <div className="notes__main-content">
      <NotesAppBar />
      
      <div className="notes__content">
        
          <input 
            type="text"
            placeholder="Some awesome title"
            className="notes__title-input"
            autoComplete="off"
            value={title}
            name="title"
            onChange={handleInputChange}
          />

          <textarea
            name="body"
            placeholder="What happened today?"
            className="notes__textarea"
            value={body}
            onChange={handleInputChange}
          ></textarea>

          {
            (url) &&
            (
              <div 
                className="notes__image"
              >
                <img 
                  src={url}
                  alt="note img"            
                />
              </div>
            )
          }
      </div>
      <button
        className="button button--danger"
        onClick={handleDelete}
      >
        Delete
      </button>
    </div>
  )
}
