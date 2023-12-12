import axios from 'axios';
import {
  setError,
  setLoading,
  setCategories,
  setBlog,
  setBlogs,
  setBlogFlag,
} from '../slices/blog';
export const listCategories = () => async (dispatch) => {
  try {
    const data = await axios.get(
      'https://blog-backend-86a4.onrender.com/blogCategories'
    );
    // console.log(data.data);
    let categories = data.data.blogCategories;
    dispatch(setCategories(categories));
  } catch (error) {
    console.log(error);
    dispatch(
      setError(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
          ? error.message
          : 'Error'
      )
    );
  }
};

export const createBlog = (blogData) => async (dispatch, getState) => {
  console.log(blogData, 'dispatched from create blog page');
  dispatch(setLoading(true));
  const {
    user: { userInfo },
  } = getState();
  console.log(userInfo.userData.token);
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.userData.token}`,
      },
    };
    const response = await axios.post(
      'https://blog-backend-86a4.onrender.com/api/blog',
      blogData,
      config
    );
    console.log(response);
    dispatch(setBlogs(response.data.blogs));
    // dispatch(setBlogFlag());
  } catch (error) {
    console.log(error);
    dispatch(
      setError(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
          ? error.message
          : 'Error'
      )
    );
  }
};

export const allBlogs = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await axios.get(
      'https://blog-backend-86a4.onrender.com/api/read/blog'
    );
    console.log(response);
    dispatch(setBlogs(response.data.blogs));
    dispatch(setLoading(false));
  } catch (error) {
    console.log(error);
    dispatch(
      setError(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
          ? error.message
          : 'Error'
      )
    );
  }
};

export const viewBlog = (id) => async (dispatch, getState) => {
  console.log(id, 'blog id');
  dispatch(setLoading(true));

  try {
    const response = await axios.get(
      `https://blog-backend-86a4.onrender.com/api/read/blog/${id}`
    );
    console.log(response);
    dispatch(setBlog(response.data.blog));

    // dispatch(setBlogFlag());
  } catch (error) {
    console.log(error);
    dispatch(
      setError(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
          ? error.message
          : 'Error'
      )
    );
  }
};
