import { combineReducers } from '@reduxjs/toolkit';
import userProfilesReducer from './userProfilesReducer';

export const RootReducer = combineReducers({
    userProfiles: userProfilesReducer
});