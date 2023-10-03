import { createSlice } from "@reduxjs/toolkit";
import { TaskWithId } from "../../interfaces";

const initialState: {
  isOpen: boolean;
  modalActive: string;
  taskSelected: TaskWithId | undefined;
} = {
  isOpen: false,
  modalActive: "DEFAULT",
  taskSelected: undefined,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.modalActive = action.payload.modalType;
      if (action.payload?.taskSelected)
        state.taskSelected = action.payload.taskSelected;
      state.isOpen = true;
    },
    closeModal: (state) => {
      state.isOpen = false;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
