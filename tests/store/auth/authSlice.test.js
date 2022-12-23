import { authSlice, checkingCredentials, login, logout } from "../../../src/store/auth/authSlice";
import { authenticatedState, initialState, notAuthenticatedState, testUser } from "../../fixtures/authFixtures";

describe('Name of the group', () => {

  test('should return the initialstate ', () => {
    const state = authSlice.reducer(initialState, {})

    expect(authSlice.name).toBe('auth');
    expect(state).toBe(initialState);

  });

  test('should authenticate', () => {
    
    const state = authSlice.reducer(initialState, login(testUser))

    expect(state).toEqual(authenticatedState);
    
  });

  test('should logout', () => {

    const errorMessage = null;
    const state = authSlice.reducer(authenticatedState, logout({errorMessage}))

    expect(state).toEqual(notAuthenticatedState);
  });

  test('should logout with errorMessage', () => {

    const errorMessage = 'wrong credentials';
    const state = authSlice.reducer(authenticatedState, logout({errorMessage}))

    expect(state).toEqual({
      status: 'not-authenticated', // 'checking', 'not-authenticated', 'authenticated'
      uid: null,
      email: null,
      displayName: null,
      photoURL: null,
      errorMessage: errorMessage
    });
  });

  test('should check credentials', () => {
    const state = authSlice.reducer(authenticatedState, checkingCredentials());

    expect(state.status).toEqual('checking');
  });

});