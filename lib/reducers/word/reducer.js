import { apiHelper } from '@/helper/api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const initialState = {
	word: [],
	wordLoading: false
};

export const getWord = createAsyncThunk('word/getWord', async (thunkApi) => {
	try {
		const response = await apiHelper.get('/api/word');
		return response;
	} catch (error) {
		const message = (error.response && error.response.data.message) || error.message;
		return thunkApi.rejectWithValue(message);
	}
});

export const quizSlice = createSlice({
	name: 'word',
	initialState,
	reducers: {
		reset: () => initialState
	},
	extraReducers: (builder) => {
		builder.addCase(getWord.pending, (state) => {
			state.wordLoading = true;
		});
		builder.addCase(getWord.fulfilled, (state, action) => {
			state.word = action.payload;
			state.wordLoading = false;
		});
		builder.addCase(getWord.rejected, (state, action) => {
			state.wordLoading = false;
			state.messageSubmitWord = action.payload;
		});
	}
});

export const { reset } = quizSlice.actions;

export default quizSlice.reducer;
