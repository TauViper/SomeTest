import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface ProfileState {
  visible: boolean;
  name: string;
  auth: boolean;
}

const initialState: ProfileState = {
  visible: true,
  name: "default name",
  auth: false,
};
const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    toggleProfile: (state) => {
      state.visible = !state.visible;
    },
    changeName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    changeAuth: (state, action: PayloadAction<boolean>) => {
      state.auth = action.payload;
    },
  },
});
export const { toggleProfile, changeName, changeAuth } = profileSlice.actions;
export const profileReducer = profileSlice.reducer;
