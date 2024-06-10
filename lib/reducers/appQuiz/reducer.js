import { apiHelper } from '@/helper/api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
	allQuizzes: [],
	isLoadingGetAllQuiz: false,
	isErrorGetAllQuiz: false,
	isSuccessGetAllQuiz: false,
	messageGetAllQuiz: '',

	isLoadingAddQuiz: false,
	isErrorAddQuiz: false,
	isSuccessAddQuiz: false,
	messageAddQuiz: '',

	isLoadingPublishQuiz: false,
	isErrorPublishQuiz: false,
	isSuccessPublishQuiz: false,
	messagePublishQuiz: '',

	isLoadingDeleteQuiz: false,
	isErrorDeleteQuiz: false,
	isSuccessDeleteQuiz: false,
	messageDeleteQuiz: '',

	isLoadingSubmitQuiz: false,
	isErrorSubmitQuiz: false,
	isSuccessSubmitQuiz: false,
	messageSubmitQuiz: ''
};

export const getAllQuiz = createAsyncThunk('quizzes/getAllQuiz', async (_, thunkApi) => {
	try {
		const response = await apiHelper.get('/api/appQuiz');
		return response;
	} catch (error) {
		const message = (error.response && error.response.data.message) || error.message;
		return thunkApi.rejectWithValue(message);
	}
});

export const addQuiz = createAsyncThunk('quizzes/addQuiz', async ({ title, questions }, thunkApi) => {
	try {
		const response = await apiHelper.post('/api/appQuiz', {
			title,
			questions
		});
		return response;
	} catch (error) {
		const message = (error.response && error.response.data.message) || error.message;
		return thunkApi.rejectWithValue(message);
	}
});

export const submitQuiz = createAsyncThunk('quizzes/submitQuiz', async ({ userId, quizId, answers }, thunkApi) => {
	try {
		const response = await apiHelper.post('/api/submitQuiz', {
			userId,
			quizId,
			answers
		});
		return response;
	} catch (error) {
		const message = (error.response && error.response.data.message) || error.message;
		return thunkApi.rejectWithValue(message);
	}
});

export const publishQuiz = createAsyncThunk('quizzes/publishQuiz', async ({ quizId }, thunkApi) => {
	try {
		const response = await apiHelper.put(`/api/appQuiz`, {
			quizId
		});
		return response;
	} catch (error) {
		const message = (error.response && error.response.data.message) || error.message;
		return thunkApi.rejectWithValue(message);
	}
});

export const deleteQuiz = createAsyncThunk('quizzes/deleteQuiz', async ({ quizId }, thunkApi) => {
	try {
		const response = await apiHelper.post(`/api/newAppQuiz`, {
			quizId
		});
		return response;
	} catch (error) {
		const message = (error.response && error.response.data.message) || error.message;
		return thunkApi.rejectWithValue(message);
	}
});

export const AppQuizSlice = createSlice({
	name: 'appQuiz',
	initialState,
	reducers: {
		resetNewAddQuiz: (state) => {
			state.isLoadingAddQuiz = false;
			state.isErrorAddQuiz = false;
			state.isSuccessAddQuiz = false;
			state.messageAddQuiz = '';
		},
		resetNewPublishQuiz: (state) => {
			state.isLoadingPublishQuiz = false;
			state.isErrorPublishQuiz = false;
			state.isSuccessPublishQuiz = false;
			state.messagePublishQuiz = '';
		},
		resetNewDeleteQuiz: (state) => {
			state.isLoadingDeleteQuiz = false;
			state.isErrorDeleteQuiz = false;
			state.isSuccessDeleteQuiz = false;
			state.messageDeleteQuiz = '';
		},
		resetSubmitQuiz: (state) => {
			state.isLoadingSubmitQuiz = false;
			state.isErrorSubmitQuiz = false;
			state.isSuccessSubmitQuiz = false;
			state.messageSubmitQuiz = '';
		}
	},
	extraReducers: (builder) => {
		builder.addCase(getAllQuiz.pending, (state) => {
			state.isLoadingGetAllQuiz = true;
			state.isErrorGetAllQuiz = false;
			state.isSuccessGetAllQuiz = false;
		});
		builder.addCase(getAllQuiz.fulfilled, (state, action) => {
			state.isLoadingGetAllQuiz = false;
			state.isErrorGetAllQuiz = false;
			state.isSuccessGetAllQuiz = true;
			state.allQuizzes = action.payload;
		});
		builder.addCase(getAllQuiz.rejected, (state, action) => {
			state.isLoadingGetAllQuiz = false;
			state.isErrorGetAllQuiz = true;
			state.isSuccessGetAllQuiz = false;
			state.messageGetAllQuiz = action.payload;
		});

		builder.addCase(addQuiz.pending, (state) => {
			state.isLoadingAddQuiz = true;
			state.isErrorAddQuiz = false;
			state.isSuccessAddQuiz = false;
		});
		builder.addCase(addQuiz.fulfilled, (state, action) => {
			state.isLoadingAddQuiz = false;
			state.isErrorAddQuiz = false;
			state.isSuccessAddQuiz = true;
			state.messageAddQuiz = action.payload?.message;
		});
		builder.addCase(addQuiz.rejected, (state, action) => {
			state.isLoadingAddQuiz = false;
			state.isErrorAddQuiz = true;
			state.isSuccessAddQuiz = false;
			state.messageAddQuiz = action.payload;
		});

		builder.addCase(publishQuiz.pending, (state) => {
			state.isLoadingPublishQuiz = true;
			state.isErrorPublishQuiz = false;
			state.isSuccessPublishQuiz = false;
		});
		builder.addCase(publishQuiz.fulfilled, (state, action) => {
			state.isLoadingPublishQuiz = false;
			state.isErrorPublishQuiz = false;
			state.isSuccessPublishQuiz = true;
			state.messagePublishQuiz = action.payload?.message;
		});
		builder.addCase(publishQuiz.rejected, (state, action) => {
			state.isLoadingPublishQuiz = false;
			state.isErrorPublishQuiz = true;
			state.isSuccessPublishQuiz = false;
			state.messagePublishQuiz = action.payload;
		});

		builder.addCase(deleteQuiz.pending, (state) => {
			state.isLoadingDeleteQuiz = true;
			state.isErrorDeleteQuiz = false;
			state.isSuccessDeleteQuiz = false;
		});
		builder.addCase(deleteQuiz.fulfilled, (state, action) => {
			state.isLoadingDeleteQuiz = false;
			state.isErrorDeleteQuiz = false;
			state.isSuccessDeleteQuiz = true;
			state.messageDeleteQuiz = action.payload?.message;
		});
		builder.addCase(deleteQuiz.rejected, (state, action) => {
			state.isLoadingDeleteQuiz = false;
			state.isErrorDeleteQuiz = true;
			state.isSuccessDeleteQuiz = false;
			state.messageDeleteQuiz = action.payload;
		});

		builder.addCase(submitQuiz.pending, (state) => {
			state.isLoadingSubmitQuiz = true;
			state.isErrorSubmitQuiz = false;
			state.isSuccessSubmitQuiz = false;
		});
		builder.addCase(submitQuiz.fulfilled, (state, action) => {
			state.isLoadingSubmitQuiz = false;
			state.isErrorSubmitQuiz = false;
			state.isSuccessSubmitQuiz = true;
			state.messageSubmitQuiz = action.payload?.message;
		});
		builder.addCase(submitQuiz.rejected, (state, action) => {
			state.isLoadingSubmitQuiz = false;
			state.isErrorSubmitQuiz = true;
			state.isSuccessSubmitQuiz = false;
			state.messageSubmitQuiz = action.payload;
		});
	}
});

export const { resetNewAddQuiz, resetNewPublishQuiz, resetNewDeleteQuiz, resetSubmitQuiz } = AppQuizSlice.actions;

export default AppQuizSlice.reducer;
