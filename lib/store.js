import appQuizReducer from '@/lib/reducers/appQuiz/reducer';
import authReducer from '@/lib/reducers/auth/reducer';
import panelReducer from '@/lib/reducers/panel/reducer';
import profileReducer from '@/lib/reducers/profile/reducer';
import wordReducer from '@/lib/reducers/word/reducer';
import { combineReducers, configureStore } from '@reduxjs/toolkit';

const appReducer = combineReducers({
	auth: authReducer,
	profile: profileReducer,
	word: wordReducer,
	panel: panelReducer,
	appQuiz: appQuizReducer
});

const store = configureStore({
	reducer: appReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false
		}),
	devTools: false
});

export default store;
