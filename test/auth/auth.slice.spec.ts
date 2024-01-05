import authReducer, { AuthState, logout, setUser } from 'src/features/authSlice';
import 'jest-localstorage-mock';

describe('authSlice reducer', () => {
  const initialState: AuthState = {
    nome: null,
    token: null,
  };

  beforeEach(() => {
    localStorage.clear();
  });

  it('should handle setUser', () => {
    const action = setUser({ token: 'fakeToken' });
    const newState = authReducer(initialState, action);
    expect(newState.token).toEqual('fakeToken');
  });

  it('should handle logout', () => {
    const action = logout();
    const newState = authReducer(initialState, action);
    expect(newState.token).toBeNull();
  });
});
