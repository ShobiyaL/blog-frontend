import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  error: null,
  blogs: [],
  blog: null,
  categories: [],
  blogFlag: false,
};

export const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },
    setBlogs: (state, { payload }) => {
      console.log(payload);
      state.loading = false;
      state.error = null;
      state.blogs = payload;
    },
    setError: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },
    setBlog: (state, { payload }) => {
      console.log(payload);
      state.blog = payload;
      state.loading = false;
      state.error = null;
    },
    setCategories: (state, { payload }) => {
      //   console.log(payload);
      state.categories = payload;
    },
    setBlogFlag: (state) => {
      state.blogFlag = true;
      state.loading = false;
    },
    removeBlog: (state, { payload }) => {
      // console.log(payload);
      let index = state.notes.findIndex((blog) => blog._id === payload._id);
      if (index !== -1) {
        state.notes = state.notes.filter((blog, i) => i !== index);
      }
    },
  },
});

export const {
  setBlog,
  setBlogs,
  setError,
  setLoading,
  setCategories,
  setBlogFlag,
  removeBlog
} = blogSlice.actions;

export default blogSlice.reducer;

export const blogSelector = (state) => state.blog;
