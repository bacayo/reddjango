import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type ModalState = "login" | "signup";

interface modalStateState {
  modalState: ModalState;
  modalOpen: boolean;
}

const initialState: modalStateState = {
  modalState: "login",
  modalOpen: false,
};

const modalStateSlice = createSlice({
  name: "modalState",
  initialState,
  reducers: {
    setModalState: (state, action: PayloadAction<ModalState>) => {
      state.modalState = action.payload;
    },
    setModalOpen: (state) => {
      state.modalOpen = !state.modalOpen;
    },
  },
});

export default modalStateSlice.reducer;
export const { setModalState, setModalOpen } = modalStateSlice.actions;
