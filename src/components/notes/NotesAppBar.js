import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startSaveNote, StartUploading } from '../../actions/notes';

export const NotesAppBar = () => {

  const dispatch = useDispatch();
  const {active:note} = useSelector(state => state.notes)

  const handleSave = () => { 
    dispatch(startSaveNote(note));
  }

  const handlePictureUpload = () => { 
    document.getElementById('fileSelector').click()
  }

  const handleFileChange = (e) => { 
    const file = e.target.files[0]
    
    if(file) {
      dispatch(StartUploading(file))
    }
  }

  return (
    <div className="notes__appbar">
      <span>06 de septiembre 2021</span>

      <input 
        id="fileSelector"
        type='file'
        style={{display: 'none'}}
        onChange={handleFileChange}
      />

      <div>
        <button 
          className="button"
          onClick={handlePictureUpload}
        >
          Picture
        </button>
        <button 
          className="button"
          onClick={handleSave}
        >
          Save
        </button>
      </div>
    </div>
  )
}
