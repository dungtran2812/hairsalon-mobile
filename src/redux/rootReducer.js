import { combineReducers } from "@reduxjs/toolkit";
import persistReducer from "redux-persist/es/persistReducer";
import userReducer from "../feature/authentication";
import appReducer from "../feature/app";
import AsyncStorage from "@react-native-async-storage/async-storage";

const userPersistConfig = {
  key: "user",
  storage: AsyncStorage,
  blacklist: [ 'isLoading']
};

const combinedReducer = combineReducers({
  app: appReducer,
  user: persistReducer(userPersistConfig, userReducer),
});

const rootReducer = (state, action) => {
	if (action.type === 'LOGOUT') {
		state = {};
	}
	return combinedReducer(state, action);
};
export default rootReducer;
