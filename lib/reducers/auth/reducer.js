import { apiHelper } from '@/helper/api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
	userID: typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('userID')) : null,
	session: null,
	isLoadingLogin: false,
	isErrorLogin: false,
	isSuccessLogin: false,
	messageLogin: '',
	isLoadingRegister: false,
	isErrorRegister: false,
	isSuccessRegister: false,
	messageRegister: ''
};

export const login = createAsyncThunk('users/login', async ({ email, password }, thunkApi) => {
	try {
		const response = await apiHelper.post('/api/users/login', {
			email,
			password
		});

		if (response.token) {
			localStorage.setItem('user', JSON.stringify(response.token));
			localStorage.setItem('userID', JSON.stringify(response.userID));
			return response;
		}
	} catch (error) {
		const message = (error.response && error.response.data.message) || error.message;
		return thunkApi.rejectWithValue(message);
	}
});

export const register = createAsyncThunk('users/register', async (values, thunkApi) => {
	try {
		const response = await apiHelper.post('/api/users/register', values);

		if (response.message) {
			return response;
		}
	} catch (error) {
		const message = (error.response && error.response.data.message) || error.message;
		return thunkApi.rejectWithValue(message);
	}
});

export const logout = createAsyncThunk('users/logout', async () => {
	if (typeof window !== 'undefined') {
		localStorage.clear();
	}
});

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		reset: () => initialState,
		setSession: (state, action) => {
			state.session = action.payload;
		},
		setUserID: (state, action) => {
			state.userID = action.payload;
		}
	},
	extraReducers: (builder) => {
		builder.addCase(login.pending, (state) => {
			state.isLoadingLogin = true;
			state.isErrorLogin = false;
			state.isSuccessLogin = false;
		});
		builder.addCase(login.fulfilled, (state, action) => {
			state.isLoadingLogin = false;
			state.isErrorLogin = false;
			state.isSuccessLogin = true;
			state.messageLogin = 'Başarılı bir şekilde giriş yaptın.';
		});
		builder.addCase(login.rejected, (state, action) => {
			state.isLoadingLogin = false;
			state.isErrorLogin = true;
			state.isSuccessLogin = false;
			state.messageLogin = action.payload;
		});

		builder.addCase(register.pending, (state) => {
			state.isLoadingRegister = true;
			state.isErrorRegister = false;
			state.isSuccessRegister = false;
		});
		builder.addCase(register.fulfilled, (state) => {
			state.isLoadingRegister = false;
			state.isErrorRegister = false;
			state.isSuccessRegister = true;
			state.messageRegister = 'Başarılı bir şekilde kayıt oldun.';
		});
		builder.addCase(register.rejected, (state, action) => {
			state.isLoadingRegister = false;
			state.isErrorRegister = true;
			state.isSuccessRegister = false;
			state.messageRegister = action.payload;
		});
	}
});

export const { reset, setSession, setUserID } = authSlice.actions;

export default authSlice.reducer;
