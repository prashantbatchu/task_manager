import {createSlice , createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

const User = {
    _id: String,
    name: String,   
    email: String,
}

const AuthState = {
    user: User | null,
    loading: Boolean,
    error: String | null,
}

const initialState = {
  user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
  loading: false,
  error: null
};

// Async thunk for login
export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }) => {
    const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/login`,{ email, password },{withCredentials: true});
    localStorage.setItem('user', JSON.stringify(data));
    return data;
  }
);

export const register = createAsyncThunk(
    'auth/register',
    async ({ name, email, password }) => {
        const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/register`, { name, email, password }, { withCredentials: true });
        localStorage.setItem('user', JSON.stringify(data));
        return data;
    }
);

export const logout = createAsyncThunk(
    'auth/logout',
    async () => {
        await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/users/logout`, { withCredentials: true });
        localStorage.removeItem('user');
        return null;
    }
);


// export default initialState;
export const updateProfile = createAsyncThunk(
    'auth/updateProfile',           
    async ({ name, currentpassword, newpassword }) => {
        const { data } = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/users/profile`, { name, currentpassword, newpassword }, { withCredentials: true });
        localStorage.setItem('user', JSON.stringify(data));
        return data;
    }
);

const authSlice = createSlice({
  name: 'auth', 
  initialState,
  reducers: {
    extraReduceres:(builders) => {
        builders.addCase(login.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(login.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
            // state.error = null;
        })
        .addCase(login.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Login failed';
        }) 
        .addCase(register.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        builders.addCase(register.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
            // state.error = null;
        })
        .addCase(register.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Registration failed';
        })
        .addCase(logout.fulfilled, (state) => {
            state.user = null;
        })
        .addCase(updateProfile.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
    }
  },    
})

export default authSlice.reducer;