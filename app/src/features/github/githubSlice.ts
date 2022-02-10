import {
  createSlice,
  PayloadAction,
  createAsyncThunk,
  SerializedError,
} from '@reduxjs/toolkit';
import axios from 'axios';

interface GithubState {
  loading: boolean;
  location: string;
  login: string;
  name: string;
  error: any;
}

const initialState: GithubState = {
  loading: false,
  location: '',
  login: '',
  name: '',
  error: null,
};

export const fetchGithubUserData = createAsyncThunk(
  'github/user',
  async (userId: string, { rejectWithValue }) => {
    try {
      const res = await axios.get(`https://api.github.com/users/${userId}`);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const githubSlice = createSlice({
  name: 'github',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGithubUserData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchGithubUserData.fulfilled, (state: GithubState, action) => {
        state.loading = false;
        state.location = action.payload.location;
        state.login = action.payload.login;
        state.name = action.payload.name;
      })
      .addCase(
        fetchGithubUserData.rejected,
        (state: GithubState, action: any) => {
          state.loading = false;
          state.error = action.payload.message;
        }
      );
  },
});

export const {} = githubSlice.actions;
export default githubSlice;
