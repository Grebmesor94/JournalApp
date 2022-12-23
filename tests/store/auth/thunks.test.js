import { loginWithEmailPassword, logoutFirebase, singInWithGoogle } from "../../../src/firebase/providers";
import { checkingAuthentication, checkingCredentials, login, logout, startGoogleSignIn, startLoginWithEmailPassword, startLogout } from "../../../src/store/auth";
import { clearNotesLogout } from "../../../src/store/journal";
import { testUser } from "../../fixtures/authFixtures";


jest.mock('../../../src/firebase/providers');

describe('Name of the group', () => {

  const dispatch = jest.fn()
  beforeEach(() => jest.clearAllMocks() )
  
  test('should ', async () => {

    await checkingAuthentication()(dispatch)
    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());

  });

  test('startgooglesignin should work ', async () => {
    const loginData = {
      ok: true,
      ...testUser
    }
    await singInWithGoogle.mockResolvedValue( loginData )
    await startGoogleSignIn()(dispatch)

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(login(loginData));


  });

  test('startgooglesignin with error ', async () => {
    const loginData = {
      ok: false,
      errorMessage: 'google failed'
    }

    const { errorMessage } = loginData;
    await singInWithGoogle.mockResolvedValue( loginData )
    await startGoogleSignIn()(dispatch)

    expect(dispatch).toHaveBeenCalledWith(logout(loginData.errorMessage));


  });

  test('startLoginWithEmailPassword should work', async () => {
    const loginData = { ok: true, ...testUser}
    const formData = {email: testUser.email, password: '123456'}

    await loginWithEmailPassword.mockResolvedValue( loginData )
    await startLoginWithEmailPassword( formData )( dispatch )

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith( login( loginData ) );
  });

  test('startCreatingUserWithEmailPassword ', () => {
    
  });

  test('startLogout should call logout firebase, clreanotes, logout ', async () => {
    await startLogout()( dispatch );

    expect( logoutFirebase ).toHaveBeenCalled()
    expect( dispatch ).toHaveBeenCalledWith( clearNotesLogout() );
    expect( dispatch ).toHaveBeenCalledWith( logout() );
  });


  
});