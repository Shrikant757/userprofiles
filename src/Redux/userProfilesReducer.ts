import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { userDetailsTypes, userProfileState } from '../types';

const initialState: userProfileState = {
    userProfiles: [],
    editUserDetails: null
};

export const userProfilesSlice = createSlice({
    name: 'userProfiles',
    initialState,
    reducers: {
        addUserProfile(state, action: PayloadAction<userDetailsTypes>) {
            state.userProfiles?.push(action.payload);
        },
        removeUserProfile(state, action: PayloadAction<number>) {
            state.userProfiles = state.userProfiles.filter(item => item.id !== action.payload);
        },
        updateUserProfile(state, action: PayloadAction<userDetailsTypes>) {
            const index = state.userProfiles.findIndex(item => item.id === action.payload.id);
            if (index !== -1) {
                state.userProfiles[index] = action.payload;
            }
        },
        SetEditUserDetails(state, action: PayloadAction<userDetailsTypes | null>) {
            state.editUserDetails = action.payload;
        },
    },
});

export const { addUserProfile, removeUserProfile, updateUserProfile, SetEditUserDetails } = userProfilesSlice.actions;

export default userProfilesSlice.reducer;
