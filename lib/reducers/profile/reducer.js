import { apiHelper } from '@/helper/api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
	profile: {},
	isLoadingGetProfile: false,
	isErrorGetProfile: false,
	isSuccessGetProfile: false,
	messageGetProfile: '',

	isLoadingEditProfile: false,
	isErrorEditProfile: false,
	isSuccessEditProfile: false,
	messageEditProfile: '',

	isLoadingEditPassword: false,
	isErrorEditPassword: false,
	isSuccessEditPassword: false,
	messageEditPassword: ''
};

export const getProfile = createAsyncThunk('profile/getProfile', async ({ userID }, thunkApi) => {
	try {
		const response = await apiHelper.post('/api/profile', { userID });
		return response;
	} catch (error) {
		const message = (error.response && error.response.data.message) || error.message;
		return thunkApi.rejectWithValue(message);
	}
});

export const editProfile = createAsyncThunk('profile/editProfile', async ({ userID, profile }, thunkApi) => {
	try {
		const response = await apiHelper.put('/api/profile', { userID, profile });
		return response;
	} catch (error) {
		const message = (error.response && error.response.data.message) || error.message;
		return thunkApi.rejectWithValue(message);
	}
});

export const editPassword = createAsyncThunk('profile/editPassword', async ({ userID, password, newPassword }, thunkApi) => {
	try {
		const response = await apiHelper.patch('/api/profile', { userID, password, newPassword });
		return response;
	} catch (error) {
		const message = (error.response && error.response.data.message) || error.message;
		return thunkApi.rejectWithValue(message);
	}
});

export const profileSlice = createSlice({
	name: 'profile',
	initialState,
	reducers: {
		reset: () => initialState,
		resetEditProfile: (state) => {
			state.isLoadingEditProfile = false;
			state.isErrorEditProfile = false;
			state.isSuccessEditProfile = false;
			state.messageEditProfile = '';
		},
		resetEditPassword: (state) => {
			state.isLoadingEditPassword = false;
			state.isErrorEditPassword = false;
			state.isSuccessEditPassword = false;
			state.messageEditPassword = '';
		}
	},
	extraReducers: (builder) => {
		builder.addCase(getProfile.pending, (state) => {
			state.isLoadingGetProfile = true;
			state.isErrorGetProfile = false;
			state.isSuccessGetProfile = false;
		});
		builder.addCase(getProfile.fulfilled, (state, action) => {
			state.isLoadingGetProfile = false;
			state.isSuccessGetProfile = true;
			state.profile = action.payload;
			state.messageGetProfile = 'Profil bilgileri başarıyla getirildi.';
		});
		builder.addCase(getProfile.rejected, (state, action) => {
			state.isLoadingGetProfile = false;
			state.isErrorGetProfile = true;
			state.messageGetProfile = action.payload;
		});

		builder.addCase(editProfile.pending, (state) => {
			state.isLoadingEditProfile = true;
			state.isErrorEditProfile = false;
			state.isSuccessEditProfile = false;
		});
		builder.addCase(editProfile.fulfilled, (state, action) => {
			state.isLoadingEditProfile = false;
			state.isSuccessEditProfile = true;
			state.profile = action.payload;
			state.messageEditProfile = 'Profil bilgilerin başarıyla güncellendi.';
		});
		builder.addCase(editProfile.rejected, (state, action) => {
			state.isLoadingEditProfile = false;
			state.isErrorEditProfile = true;
			state.messageEditProfile = action.payload;
		});

		builder.addCase(editPassword.pending, (state) => {
			state.isLoadingEditPassword = true;
			state.isErrorEditPassword = false;
			state.isSuccessEditPassword = false;
		});
		builder.addCase(editPassword.fulfilled, (state, action) => {
			state.isLoadingEditPassword = false;
			state.isSuccessEditPassword = true;
			state.messageEditPassword = 'Şifren başarıyla güncellendi.';
		});
		builder.addCase(editPassword.rejected, (state, action) => {
			state.isLoadingEditPassword = false;
			state.isErrorEditPassword = true;
			state.messageEditPassword = action.payload;
		});
	}
});

export const { reset, resetEditProfile, resetEditPassword } = profileSlice.actions;

export default profileSlice.reducer;
