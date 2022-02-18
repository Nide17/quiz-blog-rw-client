import axios from 'axios';
import { returnErrors } from '../error/error.actions'
import { returnSuccess } from '../success/success.actions'
import { GET_NOTES, GET_NOTES_FAIL, GET_NOTES_BY_CHAPTER_FAIL, NOTES_BY_CHAPTER_LOADING, GET_NOTES_BY_CHAPTER, CREATE_NOTE, CREATE_NOTE_FAIL, DELETE_NOTE, DELETE_NOTE_FAIL, UPDATE_NOTE, UPDATE_NOTE_FAIL, NOTES_LOADING, GET_LANDING_DISPLAY_NOTES, GET_LANDING_DISPLAY_NOTES_FAIL, LANDING_DISPLAY_NOTES_LOADING, GET_ONE_NOTE_PAPER, GET_ONE_NOTE_PAPER_FAIL, GET_ONE_NOTE_PAPER_LOADING, GET_LANDING_DISPLAY_NO_LIMIT_NOTES, GET_LANDING_DISPLAY_NO_LIMIT_NOTES_FAIL, LANDING_DISPLAY_NOTES_NO_LIMIT_LOADING } from "./notes.types";
import { tokenConfig, uploadConfig } from '../auth/auth.actions'
import { apiURL } from '../config'

// Axios instance
const axiosInstance = axios.create({
  baseURL: apiURL,
});

// View all notes
export const getNotes = () => async (dispatch, getState) => {
  await dispatch(getNotesLoading());

  try {
    await axiosInstance
      .get('/api/notes', tokenConfig(getState))
      .then(res =>
        dispatch({
          type: GET_NOTES,
          payload: res.data,
        }))

  } catch (err) {
    dispatch(returnErrors(err && err.response.data, err && err.response.status, 'GET_NOTES_FAIL'));
    dispatch({ type: GET_NOTES_FAIL })
  }
};

// View limited landing notes
export const getLandingDisplayNotes = (limit) => async (dispatch) => {
  await dispatch(getLandingDisplayNotesLoading());

  try {
    await axiosInstance
      .get(`/api/notes/landingDisplay?limit=${limit}`)
      .then(res =>
        dispatch({
          type: GET_LANDING_DISPLAY_NOTES,
          payload: res.data,
        }))

  } catch (err) {
    dispatch(returnErrors(err && err.response.data, err && err.response.status, 'GET_LANDING_DISPLAY_NOTES_FAIL'));
    dispatch({ type: GET_LANDING_DISPLAY_NOTES_FAIL })
  }
};

// View all landing notes
export const getLandingDisplayNotesNoLimit = () => async (dispatch) => {
  await dispatch(getLandingDisplayNotesLoadingNoLimit());

  try {
    await axiosInstance
      .get(`/api/notes/landingDisplay`)
      .then(res =>
        dispatch({
          type: GET_LANDING_DISPLAY_NO_LIMIT_NOTES,
          payload: res.data,
        }))

  } catch (err) {
    dispatch(returnErrors(err && err.response.data, err && err.response.status, 'GET_LANDING_DISPLAY_NO_LIMIT_NOTES_FAIL'));
    dispatch({ type: GET_LANDING_DISPLAY_NO_LIMIT_NOTES_FAIL })
  }
};

// View notes by chapter
export const getNotesByChapter = (chapterId) => async (dispatch, getState) => {
  await dispatch(getNotesByChapterLoading());

  try {
    await axiosInstance
      .get(`/api/notes/chapter/${chapterId}`, tokenConfig(getState))
      .then(res =>
        dispatch({
          type: GET_NOTES_BY_CHAPTER,
          payload: res.data,
        })
      )
  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status, 'GET_NOTES_BY_CHAPTER_FAIL'));
    dispatch({ type: GET_NOTES_BY_CHAPTER_FAIL })
  }
};

// View one note
export const getOneNotePaper = (notePaperId) => async (dispatch, getState) => {
  await dispatch(getOneNotePaperLoading());

  try {
    await axiosInstance
      .get(`/api/notes/${notePaperId}`, tokenConfig(getState))
      .then(res =>
        dispatch({
          type: GET_ONE_NOTE_PAPER,
          payload: res.data,
        })
      )
  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status, 'GET_ONE_NOTE_PAPER_FAIL'));
    dispatch({ type: GET_ONE_NOTE_PAPER_FAIL })
  }
};

// Create notes
export const createNotes = (newNotes, onUploadProgress) => async (dispatch, getState) => {

  try {
    await axiosInstance
      .post('/api/notes', newNotes, uploadConfig(getState, onUploadProgress))
      .then(res =>
        dispatch({
          type: CREATE_NOTE,
          payload: res.data
        }))
      .then(res =>
        dispatch(returnSuccess('Notes uploaded successfully!', 200, 'CREATE_NOTE')))

  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status, 'CREATE_NOTE_FAIL'));
    dispatch({ type: CREATE_NOTE_FAIL })
  }
};

// Update a notes
export const updateNotes = updatedNotes => async (dispatch, getState) => {

  try {
    await axiosInstance
      .put(`/api/notes/${updatedNotes.idToUpdate}`, updatedNotes, tokenConfig(getState))
      .then(() =>
        dispatch({
          type: UPDATE_NOTE,
          payload: updatedNotes
        }),
        alert('UPDATED!'))
      // Reload the page
      .then(window.location.reload())

  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status, 'UPDATE_NOTE_FAIL'));
    dispatch({ type: UPDATE_NOTE_FAIL });
  }
}

// Delete a notes
export const deleteNotes = id => async (dispatch, getState) => {

  try {
    if (window.confirm("This notes will be deleted permanently!")) {
      await axiosInstance.delete(`/api/notes/${id}`, tokenConfig(getState))
        .then(() =>
          dispatch({
            type: DELETE_NOTE,
            payload: id
          }),
          alert('DELETED!.'))
        // Reload the page
        .then(window.location.reload())
    }
  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status, 'DELETE_NOTE_FAIL'));
    dispatch({ type: DELETE_NOTE_FAIL });
  }
}

export const getNotesLoading = () => {
  //Return an action to the reducer
  return {
    //action 
    type: NOTES_LOADING

  }
}

export const getLandingDisplayNotesLoading = () => {
  //Return an action to the reducer
  return {
    //action 
    type: LANDING_DISPLAY_NOTES_LOADING

  }
}

export const getLandingDisplayNotesLoadingNoLimit = () => {
  //Return an action to the reducer
  return {
    //action 
    type: LANDING_DISPLAY_NOTES_NO_LIMIT_LOADING

  }
}

export const getOneNotePaperLoading = () => {
  //Return an action to the reducer
  return {
    //action 
    type: GET_ONE_NOTE_PAPER_LOADING

  }
}

export const getNotesByChapterLoading = () => {
  //Return an action to the reducer
  return {
    //action 
    type: NOTES_BY_CHAPTER_LOADING

  }
}