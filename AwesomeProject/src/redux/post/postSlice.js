// import { createSlice } from "@reduxjs/toolkit";

// const postSlice = createSlice({
//   name: "posts",
//   initialState: false,

//   reducers: {
//     isUpdate: (state) => (state = !state),
//   },
// });

// export const postReducer = postSlice.reducer;
// export const { isUpdate } = postSlice.actions;

import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = [
  {
    id: 0,
    name: "Learn HTML and CSS",
    location: "Івано Франківськ",
    comments: "dfsfd",
  },
  {
    id: 1,
    name: "Get good at JavaScript",
    location: "Івано Франківськ",
    comments: "dfsfd",
  },
  {
    id: 2,
    name: "Master React",
    location: "Івано Франківськ",
    comments: "dfsfd",
    image: "",
  },
  {
    id: 3,
    name: "Discover Redux",
    location: "Івано Франківськ",
    comments: "dfsfd",
    image: "",
  },
  {
    id: 4,
    name: "Build amazing apps",
    location: "Івано Франківськ",
    comments: "dfsfd",
    image: "",
  },
];

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    addPost(state, action) {
      state.push(action.payload);
    },
    deletePost(state, action) {
      const index = state.findIndex((task) => task.id === action.payload);
      state.splice(index, 1);
    },
  },
});

export const { addPost, deletePost } = postSlice.actions;
export const postReducer = postSlice.reducer;

// import { createSlice } from "@reduxjs/toolkit";
// import { addContact, deleteContact, fetchContacts } from "../operations";

// const handlePending = (state) => {
//   state.isLoading = true;
// };

// const handleRejected = (state, action) => {
//   state.isLoading = false;
//   state.error = action.payload;
// };

// const contactsSlice = createSlice({
//   name: "contacts",
//   initialState: {
//     items: [],
//     isLoading: false,
//     error: null,
//   },
//   extraReducers: {
//     [fetchContacts.pending]: handlePending,
//     [fetchContacts.fulfilled](state, action) {
//       state.isLoading = false;
//       state.error = null;
//       state.items = action.payload;
//     },
//     [fetchContacts.rejected]: handleRejected,
//     [addContact.pending]: handlePending,
//     [addContact.fulfilled](state, action) {
//       state.isLoading = false;
//       state.error = null;
//       state.items.push(action.payload);
//     },
//     [addContact.rejected]: handleRejected,
//     [deleteContact.pending]: handlePending,
//     [deleteContact.fulfilled](state, action) {
//       state.isLoading = false;
//       state.error = null;
//       state.items = state.items.filter(
//         (contact) => contact.id !== action.payload.id
//       );
//     },
//     [deleteContact.rejected]: handleRejected,
//   },
// });

// export const contactsReducer = contactsSlice.reducer;
