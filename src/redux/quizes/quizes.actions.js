import axios from 'axios';
import { returnErrors } from '../error/error.actions'
import { returnSuccess } from '../success/success.actions'
import { SET_QUIZES, GET_ONE_QUIZ, GET_ONE_QUIZ_FAIL, CREATE_QUIZ, CREATE_QUIZ_FAIL, DELETE_QUIZ, DELETE_QUIZ_FAIL, UPDATE_QUIZ, UPDATE_QUIZ_FAIL, QUIZES_LOADING, NOTIFY_USERS, NOTIFY_USERS_FAIL, SET_ALL_QUIZES, ALL_QUIZES_LOADING } from "./quizes.types";
import { tokenConfig } from '../auth/auth.actions'
import { apiURL } from '../config'

// Axios instance
const axiosInstance = axios.create({
  baseURL: apiURL,
});

// View limited quizes
export const setQuizes = (limit, skip) => async (dispatch) => {
  await dispatch(setQuizesLoading());

  try {
    await axiosInstance
      .get(`/api/quizes?limit=${limit}&skip=${skip}`)
      .then(res =>
        dispatch({
          type: SET_QUIZES,
          payload: res.data,
        }))
  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status));
  }
};

// View all quizes
export const setAllNoLimitQuizes = () => async (dispatch) => {
  await dispatch(setAllNoLimitQuizesLoading());

  try {
    await axiosInstance
      .get(`/api/quizes`)
      .then(res =>
        dispatch({
          type: SET_ALL_QUIZES,
          payload: res.data,
        }))
  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status));
  }
};

// View one quiz
export const getOneQuiz = (quizId) => async (dispatch) => {
  await dispatch(setQuizesLoading());

  try {
    await axiosInstance
      .get(`/api/quizes/${quizId}`)
      .then(res =>
        dispatch({
          type: GET_ONE_QUIZ,
          payload: res.data,
        })
      )
  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status, 'GET_ONE_QUIZ_FAIL'));
    dispatch({ type: GET_ONE_QUIZ_FAIL })
  }
};

// Create Quiz
export const createQuiz = (newQuiz) => async (dispatch, getState) => {

  try {
    await axiosInstance
      .post('/api/quizes', newQuiz, tokenConfig(getState))
      .then(res =>
        dispatch({
          type: CREATE_QUIZ,
          payload: res.data
        }))
      // Reload the page
      .then(res =>
        dispatch(
          returnSuccess('Quiz created! Reloading the page ...', 200, 'CREATE_QUIZ'),
          // Reload after 4 seconds
          window.setTimeout(() => window.location.reload(), 4000)
        ))

  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status, 'CREATE_QUIZ_FAIL'));
    dispatch({ type: CREATE_QUIZ_FAIL })
  }
};

// Send Mail after quiz full
export const notifying = (newQuizInfo) => async (dispatch, getState) => {

  try {
    await axiosInstance
      .post('/api/quizes/notifying', newQuizInfo, tokenConfig(getState))
      .then(res =>
        dispatch({
          type: NOTIFY_USERS,
          payload: res.data
        }),
        alert('Sending emails ...'))

      // Reload the page
      .then(window.location.href = "/webmaster")

  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status, 'NOTIFY_USERS_FAIL'));
    dispatch({ type: NOTIFY_USERS_FAIL })
  }
};

// Update a Quiz
export const updateQuiz = updatedQuiz => async (dispatch, getState) => {

  try {
    await axiosInstance
      .put(`/api/quizes/${updatedQuiz.quizID}`, updatedQuiz, tokenConfig(getState))
      .then(res =>
        dispatch({
          type: UPDATE_QUIZ,
          payload: updatedQuiz
        }),
        alert('UPDATED!'))
      // Reload the page update
      .then(window.location.reload())

  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status, 'UPDATE_QUIZ_FAIL'));
    dispatch({ type: UPDATE_QUIZ_FAIL })
  }
}

// Delete a Quiz
export const deleteQuiz = id => async (dispatch, getState) => {

  try {
    if (window.confirm("This quiz will be deleted permanently!")) {
      await axiosInstance
        .delete(`/api/quizes/${id}`, tokenConfig(getState))
        .then(res =>
          dispatch({
            type: DELETE_QUIZ,
            payload: id
          }),
          alert('DELETED!.'))
        // Reload the page
        .then(window.location.reload())
    }

  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status, 'DELETE_QUIZ_FAIL'));
    dispatch({ type: DELETE_QUIZ_FAIL })
  }
}

export const setQuizesLoading = () => {
  //Return an action to the reducer
  return {
    //action 
    type: QUIZES_LOADING

  };
}

export const setAllNoLimitQuizesLoading = () => {
  //Return an action to the reducer
  return {
    //action 
    type: ALL_QUIZES_LOADING

  };
}
