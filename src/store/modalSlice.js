import { createSlice } from "@reduxjs/toolkit";

console.log(JSON.parse(window.sessionStorage.getItem("modals")))

const init = {
  currentModals: JSON.parse(window.sessionStorage.getItem("modals")) || [],
};

const modalSlice = createSlice({
  name: "modal",
  initialState: init,
  reducers: {
    addModal: (state, { payload }) => {
      const id = payload.id;
      const type = payload.type;
      const isExistId = state.currentModals.find((d) => d.id == id);

      if (!isExistId) {
        state.currentModals.push({ id, type });
      } else {
        const existTaken = state.currentModals.splice(
          state.currentModals.findIndex((d) => d.id === id),
          1
        );
        state.currentModals.push(existTaken[0]);
      }

      window.sessionStorage.setItem(
        "modals",
        JSON.stringify(state.currentModals)
      );
    },
    removeModal: (state, { payload }) => {
      const id = payload.id;
      state.currentModals = state.currentModals.filter((d) => d.id !== id);
      window.sessionStorage.setItem(
        "modals",
        JSON.stringify(state.currentModals)
      );
    },
  },
});

export const { addModal, removeModal } = modalSlice.actions;

export default modalSlice.reducer;
