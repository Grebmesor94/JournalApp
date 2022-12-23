export const initialState = { 
  status: 'checking', // 'checking', 'not-authenticated', 'authenticated'
  uid: null,
  email: null,
  displayName: null,
  photoURL: null,
  errorMessage: null,
}

export const authenticatedState = { 
  status: 'authenticated', // 'checking', 'not-authenticated', 'authenticated'
  uid: '123abc',
  email: 'prueba@gmail.com',
  displayName: 'usuario prueba',
  photoURL: 'https://prueba.jpg',
  errorMessage: null,
}

export const notAuthenticatedState = { 
  status: 'not-authenticated', // 'checking', 'not-authenticated', 'authenticated'
  uid: null,
  email: null,
  displayName: null,
  photoURL: null,
  errorMessage: null,
}

export const testUser = { 
  uid: '123abc',
  email: 'prueba@gmail.com',
  displayName: 'usuario prueba',
  photoURL: 'https://prueba.jpg'
}