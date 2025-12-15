import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// LOGIN
export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (credentials, thunkAPI) => {
    try {
      const response = await fetch('http://localhost:3001/api/v1/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (!response.ok) {
        return thunkAPI.rejectWithValue(data.message || 'Erreur de connexion');
      }

      localStorage.setItem('token', JSON.stringify(data.body.token));
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message || 'Erreur réseau');
    }
  }
);

// GET PROFILE
export const getUserProfile = createAsyncThunk(
  'user/getUserProfile',
  async (token, thunkAPI) => {
    try {
      const response = await fetch('http://localhost:3001/api/v1/user/profile', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        return thunkAPI.rejectWithValue(data.message || 'Erreur de profil');
      }

      localStorage.setItem('user', JSON.stringify(data.body));
      return data.body;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// CHANGE NAME
export const changeUserName = createAsyncThunk(
  'user/changeName',
  async ({ token, userName }, thunkAPI) => {
    try {
      const response = await fetch('http://localhost:3001/api/v1/user/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userName }),
      });

      const data = await response.json();

      if (!response.ok) {
        return thunkAPI.rejectWithValue(data.message || 'Erreur de mise à jour');
      }

      // Rafraîchir le profil à jour
      await thunkAPI.dispatch(getUserProfile(token));

      return data.body;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    data: JSON.parse(localStorage.getItem('user')) || null,
    token: JSON.parse(localStorage.getItem('token')) || null,
    status: 'idle',
    error: null,
  },
  reducers: {
    logout: (state) => {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      state.data = null;
      state.token = null;
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // LOGIN
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.token = action.payload.body?.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // GET PROFILE
      .addCase(getUserProfile.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
        localStorage.setItem('user', JSON.stringify(action.payload));
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // CHANGE NAME
      .addCase(changeUserName.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(changeUserName.fulfilled, (state, action) => {
        state.status = 'succeeded';

        // Mise à jour locale immédiate
        if (state.data) {
          state.data.userName = action.meta.arg.userName;
          localStorage.setItem('user', JSON.stringify(state.data));
        }
      })
      .addCase(changeUserName.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
