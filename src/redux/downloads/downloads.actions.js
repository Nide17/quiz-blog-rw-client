import axios from 'axios';
import { returnErrors } from '../error/error.actions'
import { returnSuccess } from '../success/success.actions'
import { SAVE_DOWNLOAD, SAVE_DOWNLOAD_FAIL, GET_DOWNLOADS, GET_DOWNLOADS_FAIL, DELETE_DOWNLOAD, DELETE_DOWNLOAD_FAIL, DOWNLOADS_LOADING, GET_CREATOR_DOWNLOADS, GET_CREATOR_DOWNLOADS_FAIL } from "./downloads.types";
import { tokenConfig, uploadConfig } from '../auth/auth.actions'
import { apiURL } from '../config'

// Axios instance
const axiosInstance = axios.create({
  baseURL: apiURL,
})

// View all downloads
export const getDownloads = (pageNo) => async (dispatch, getState) => {
  await dispatch(getDownloadsLoading());

  try {
    await axiosInstance
      .get(`/api/downloads?pageNo=${pageNo}`, tokenConfig(getState))
      .then(res =>
        dispatch({
          type: GET_DOWNLOADS,
          payload: res.data
        }, console.log(res.data)))

  } catch (err) {
    dispatch(returnErrors(err && err.response.data, err && err.response.status, 'GET_DOWNLOADS_FAIL'));
    dispatch({ type: GET_DOWNLOADS_FAIL })
  }
};

// View all downloads of notes created by a creator
export const getCreatorDownloads = (uId) => async (dispatch, getState) => {
  await dispatch(getDownloadsLoading())

  try {
    await axiosInstance
      .get(`/api/downloads/notes-creator/${uId}`, tokenConfig(getState))
      .then(res =>
        dispatch({
          type: GET_CREATOR_DOWNLOADS,
          payload: res.data
        })
      )
  } catch (err) {
    dispatch(returnErrors(err.response && err.response.data, err.response.status, 'GET_CREATOR_DOWNLOADS_FAIL'))
    dispatch({ type: GET_CREATOR_DOWNLOADS_FAIL })
  }
};

// Save download downloads
export const saveDownload = (newDownload) => async (dispatch, getState) => {

  try {
    await axiosInstance
      .post('/api/downloads', newDownload, uploadConfig(getState))
      .then(res =>
        dispatch({
          type: SAVE_DOWNLOAD,
          payload: res.data
        }))
      .then(res =>
        dispatch(returnSuccess('Saved download successfully!', 200, 'SAVE_DOWNLOAD')))

  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status, 'SAVE_DOWNLOAD_FAIL'));
    dispatch({ type: SAVE_DOWNLOAD_FAIL })
  }
};

// Delete a download
export const deleteDownload = id => async (dispatch, getState) => {

  try {
    if (window.confirm("This download will be deleted permanently!")) {
      await axiosInstance.delete(`/api/downloads/${id}`, tokenConfig(getState))
        .then(() =>
          dispatch({
            type: DELETE_DOWNLOAD,
            payload: id
          }),
          alert('DELETED!.'))
    }
  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status, 'DELETE_DOWNLOAD_FAIL'));
    dispatch({ type: DELETE_DOWNLOAD_FAIL });
  }
}

export const getDownloadsLoading = () => {
  //Return an action to the reducer
  return {
    //action 
    type: DOWNLOADS_LOADING

  }
}
