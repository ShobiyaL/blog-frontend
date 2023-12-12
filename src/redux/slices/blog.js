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
  },
});

export const {
  setBlog,
  setBlogs,
  setError,
  setLoading,
  setCategories,
  setBlogFlag,
} = blogSlice.actions;

export default blogSlice.reducer;

export const blogSelector = (state) => state.blog;
