import { apiHelper } from '@/helper/api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
	allUsers: [],
	isLoadingGetAllUsers: false,
	isErrorGetAllUsers: false,
	isSuccessGetAllUsers: false,
	messageGetAllUsers: '',

	isLoadingDeleteUser: false,
	isErrorDeleteUser: false,
	isSuccessDeleteUser: false,
	messageDeleteUser: ''
};

export const getAllUsers = createAsyncThunk('panel/getAllUsers', async (thunkApi) => {
	try {
		const response = await apiHelper.get('/api/panel');
		return response;
	} catch (error) {
		const message = (error.response && error.response.data.message) || error.message;
		return thunkApi.rejectWithValue(message);
	}
});

export const deleteUser = createAsyncThunk('panel/deleteUser', async ({ id }, thunkApi) => {
	try {
		const response = await apiHelper.post('/api/panel', { id });
		return response;
	} catch (error) {
		const message = (error.response && error.response.data.message) || error.message;
		return thunkApi.rejectWithValue(message);
	}
});

export const panelSlice = createSlice({
	name: 'panel',
	initialState,
	reducers: {
		resetGetAllUsers: (state) => {
			state.isLoadingGetAllUsers = false;
			state.isErrorGetAllUsers = false;
			state.isSuccessGetAllUsers = false;
		},
		resetDeleteUser: (state) => {
			state.isLoadingDeleteUser = false;
			state.isErrorDeleteUser = false;
			state.isSuccessDeleteUser = false;
		}
	},
	extraReducers: (builder) => {
		builder.addCase(getAllUsers.pending, (state) => {
			state.isLoadingGetAllUsers = true;
			state.isErrorGetAllUsers = false;
			state.isSuccessGetAllUsers = false;
			state.messageGetAllUsers = '';
		});
		builder.addCase(getAllUsers.fulfilled, (state, action) => {
			state.isLoadingGetAllUsers = false;
			state.isErrorGetAllUsers = false;
			state.isSuccessGetAllUsers = true;
			state.allUsers = action.payload;
			state.messageGetAllUsers = 'Tüm kullanıcılar başarıyla getirildi.';
		});
		builder.addCase(getAllUsers.rejected, (state, { payload }) => {
			state.isLoadingGetAllUsers = false;
			state.isErrorGetAllUsers = true;
			state.isSuccessGetAllUsers = false;
			state.allUsers = [];
			state.messageGetAllUsers = payload;
		});

		builder.addCase(deleteUser.pending, (state) => {
			state.isLoadingDeleteUser = true;
			state.isErrorDeleteUser = false;
			state.isSuccessDeleteUser = false;
			state.messageDeleteUser = '';
		});
		builder.addCase(deleteUser.fulfilled, (state, action) => {
			state.isLoadingDeleteUser = false;
			state.isErrorDeleteUser = false;
			state.isSuccessDeleteUser = true;
			state.messageDeleteUser = action.payload.message;
		});
		builder.addCase(deleteUser.rejected, (state, action) => {
			state.isLoadingDeleteUser = false;
			state.isErrorDeleteUser = true;
			state.isSuccessDeleteUser = false;
			state.messageDeleteUser = action.payload;
		});
	}
});

export const { resetGetAllUsers, resetDeleteUser } = panelSlice.actions;

export default panelSlice.reducer;
