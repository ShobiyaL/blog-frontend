import axios from 'axios';
import {
  setLoading,
  setError,
  userLogin,
  userRegister,
  userLogout,
  updateUserProfile,
  resetUpdate,
} from '../slices/user';

export const register = (name, email, password) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axios.post(
      'https://blog-backend-86a4.onrender.com/api/users/register',
      { name, email, password },
      config
    );
    console.log(data);
    dispatch(userRegister(data));
    localStorage.setItem('userInfo', JSON.stringify(data));
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

export const login = (email, password) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axios.post(
      'https://blog-backend-86a4.onrender.com/api/users/login',
      { email, password },
      config
    );
    console.log(data);
    dispatch(userLogin(data));
    localStorage.setItem('userInfo', JSON.stringify(data));
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

export const logout = () => async (dispatch) => {
  localStorage.removeItem('userInfo');
  dispatch(userLogout());
};

export const updateProfile =
  (id, name, email) => async (dispatch, getState) => {
    const {
      user: { userInfo },
    } = getState();

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
          'Content-Type': 'application/json',
        },
      };
      const { data } = await axios.put(
        `https://blog-backend-86a4.onrender.com/api/protected/users/updateProfile/${id}`,
        { _id: id, name, email },
        config
      );
      console.log(data);
      localStorage.setItem('userInfo', JSON.stringify(data));
      dispatch(updateUserProfile(data));
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

export const resetUpdateSuccess = () => async (dispatch) => {
  dispatch(resetUpdate());
};
