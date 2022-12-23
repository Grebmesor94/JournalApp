import { collection, deleteDoc, getDocs } from "firebase/firestore/lite";
import { FirebaseDB } from "../../../src/firebase/config";
import { addNewEmptyNote, savingNewNote, setActiveNote, startNewNote } from "../../../src/store/journal";



describe('Name of the group', () => {

  const dispatch = jest.fn();
  const getState = jest.fn();

  const testNote = {
    title: 'test title',
    body: 'test body',
    date: '127736781263781'
  }

  beforeEach(() => { 
    jest.clearAllMocks();
  })
  
  test('startNewNote should create a new note ', async () => {
    const uid = 'test_uid'
    getState.mockReturnValue({
      auth: { uid }
    })

    await startNewNote()( dispatch, getState)

    expect( getState ).toHaveBeenCalled();
    expect( dispatch ).toHaveBeenCalledWith( savingNewNote() );
    expect( dispatch ).toHaveBeenCalledWith( addNewEmptyNote({
      body: '',
      title: '',
      id: expect.any( String ),
      date: expect.any( Number )
    }) );
    expect( dispatch ).toHaveBeenCalledWith( setActiveNote({
      body: '',
      title: '',
      id: expect.any( String ),
      date: expect.any( Number )
    }) );

    // ? borrar de firebase
    
    const collectionRef = collection( FirebaseDB, `${ uid }/journal/notes`);
    const docs = await getDocs( collectionRef );

    const deletePromises = []

    docs.forEach(doc => deletePromises.push( deleteDoc( doc.ref ) ))
    
    await Promise.all( deletePromises );

  });
  
});