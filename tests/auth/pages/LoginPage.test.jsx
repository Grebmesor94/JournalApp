import { configureStore } from "@reduxjs/toolkit"
import { fireEvent, render, screen } from "@testing-library/react"
import { Provider } from "react-redux"
import { MemoryRouter } from "react-router-dom"
import { LoginPage } from "../../../src/auth/pages/LoginPage"
import { authSlice, startGoogleSignIn } from "../../../src/store/auth"
import { notAuthenticatedState } from "../../fixtures/authFixtures"

const mockStartGoogleSignIn = jest.fn()
const mockStartLoginWithEmailPassword = jest.fn()
const mockDispatch = jest.fn()

jest.mock('../../../src/store/auth/thunks', () => ({ 
  startGoogleSignIn: () => mockStartGoogleSignIn,
  startLoginWithEmailPassword: ({ email, password }) => (() => mockStartLoginWithEmailPassword({email, password}))
}))

jest.mock('react-redux', () => ({
  useDispatch: () => (fn) => fn(),
  ...jest.requireActual('react-redux')
}))

const store = configureStore({
  reducer: { 
    auth: authSlice.reducer
  },
  preloadedState: { 
    auth: notAuthenticatedState
  }
})


describe('Name of the group', () => {

  beforeEach(() => { 
    jest.clearAllMocks()
  })
  
  test('should render the component ', () => {

    render(
      <Provider store={ store }>
        <MemoryRouter>
          <LoginPage /> 
        </MemoryRouter>
      </Provider>
    )
    
    expect(screen.getAllByText('Login').length).toBeGreaterThanOrEqual(1);
  });

  test('should render the component ', () => {

    render(
      <Provider store={ store }>
        <MemoryRouter>
          <LoginPage /> 
        </MemoryRouter>
      </Provider>
    )
    
    const googlebtn = screen.getByLabelText('googlebtn')
    fireEvent.click(googlebtn)

    expect(mockStartGoogleSignIn).toHaveBeenCalled();
  });

  test('submit should call startLoginWithEmailPassword ', () => {

    const email = 'prueba@gmail.com'
    const password = '123456'

    render(
      <Provider store={ store }>
        <MemoryRouter>
          <LoginPage /> 
        </MemoryRouter>
      </Provider>
    )

    const emailField = screen.getByRole('textbox', { name: 'Correo' })
    const passwordField = screen.getByTestId('password')
    const loginForm = screen.getByLabelText('submitform')

    fireEvent.change(emailField, { target: { name: 'email', value: email } })
    fireEvent.change(passwordField, { target: { name: 'password', value: password } })
    fireEvent.submit(loginForm)

    expect(mockStartLoginWithEmailPassword).toHaveBeenCalledWith({
      email,
      password
    });
  });
});