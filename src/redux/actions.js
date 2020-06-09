import React from 'react'
import axios from 'axios'
import { notification } from 'antd'
import { SmileOutlined } from '@ant-design/icons';
import { SHOW_LOADER_TODO_LIST, HIDE_LOADER_TODO_LIST,
  SHOW_LOADER_FINISH_LIST, HIDE_LOADER_FINISH_LIST,
  SHOW_ALERT, HIDE_ALERT,
  ADD_TODO, REMOVE_TODO, FETCH_TODO, UPDATE_TODO, NO_TODO, NO_FINISH_TODO, SHOW_ALL_FINISH_LIST_TODO, HIDE_ALL_FINISH_LIST_TODO} from "./types";

const url = process.env.REACT_APP_DB_URL

export function showLoader(type) {
  return { type }
}
export function hideLoader(type) {
  return { type }
}

export function emptyTodo(payload) {
  return { type: NO_TODO, payload }
}

export function emptyFinishTodo(payload) {
  return { type: NO_FINISH_TODO, payload }
}

export function showFinishList() {
  return dispatch => { dispatch({ type: SHOW_ALL_FINISH_LIST_TODO }) }
}

export function hideFinishList() {
  return dispatch => {
    dispatch({
      type: HIDE_ALL_FINISH_LIST_TODO
    })
  }
}

export function showAlert(text, type = 'warning') {
  return dispatch => {
    dispatch({
      type: SHOW_ALERT,
      payload: {text, type}
    })
  }
}

export function hideAlert() {
  return {
    type: HIDE_ALERT
  }
}

export function toggleEditForm(form) {
  return {
    type: UPDATE_TODO,
    payload: form
  }
}

export function updateTodo(payload) {
  try { return { type: FETCH_TODO, payload } }
  catch(e) { throw new Error('EditTodo: ' + e.message) }
}

export function fetchTodo() {
  return async dispatch => {
    dispatch(showLoader(SHOW_LOADER_TODO_LIST))
    try {
      const res = await axios.get(`${url}/todo.json`)
      if (res.data) {
        const payload = Object.keys(res.data).map(key => {
          return {
            ...res.data[key],
            id: key
          }
        })
        setTimeout (() => {
          dispatch({type: FETCH_TODO, payload})
          dispatch(hideLoader(HIDE_LOADER_TODO_LIST))
          dispatch(emptyTodo(false))
        }, 100)
      } else {
        dispatch({type: FETCH_TODO, payload: []})
        dispatch(hideLoader(HIDE_LOADER_TODO_LIST))
        dispatch(emptyTodo(true))
      }
    } catch (e) {
      throw new Error('FetchTodo: ' + e.message)
    }
  }
}

export function addTodo(task) {
  return async dispatch => {
    const dateOptions = {year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric'}
    const dateCreate = new Date().toLocaleDateString('en-GB', dateOptions)
    const todo = {
      title: task.title,
      text: task.text,
      dateCreate,
      edit: false,
      dateModified: '',
      finish: false
    }
    try {
      const res = await axios.post(`${url}/todo.json`, todo)
      const payload = {...todo, id: res.data.name}
      dispatch({type: ADD_TODO, payload})
      notification['success']({message: 'Задача добавлена', description: dateCreate})
    } catch(e) {
      throw new Error('AddTodo: ' + e.message)
    }
  }
}

export function removeTodo(id) {
  return async dispatch => {
    dispatch(showLoader(SHOW_LOADER_TODO_LIST))
    try {
      await axios.delete(`${url}/todo/${id}.json`)
      dispatch({type: REMOVE_TODO, payload: id})
      dispatch(showLoader(HIDE_LOADER_TODO_LIST))
      notification['error']({message: 'Задача удалена'})
    } catch(e) {
      throw new Error('RemoveTodo: ' + e.masaage)
    }
  }
}

export function editTodo(todo) {
  return async dispatch => {
    try {
      await axios.put(`${url}/todo/${todo.id}.json`, todo)
      dispatch(fetchTodo())
      notification['success']({message: 'Задача изменена'})
    } catch(e) {
      throw new Error('EditTodo: ' + e.message)
    }
  }
}

export function addFinishTodo(todo, list) {
  return async dispatch => {
    dispatch(showLoader(SHOW_LOADER_FINISH_LIST))
    try {
      const dateOptions = {year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric'}
      const dateFinish = new Date().toLocaleDateString('en-GB', dateOptions)
      const payload = {...todo, finish: true, dateFinish}
      await axios.put(`${url}/todo/${todo.id}.json`, payload)
      const newList = list.map(e => {
        if (e.id === payload.id) e.finish = true
        return e
      })
      dispatch(updateTodo(newList))
      dispatch(showLoader(HIDE_LOADER_FINISH_LIST))
      notification.open({message: "Поздравляю! Задача завершена", icon: <SmileOutlined style={{ color: '#30B60B' }}/>})
    } catch(e) {
      throw new Error('FinishTodo: ' + e.message)
    }
  }
}

export function returnFinishTodo(todo, list) {
  return async dispatch => {
    dispatch(showLoader(SHOW_LOADER_TODO_LIST))
    try {
      const payload = {...todo, finish: false, dateFinish: ''}
      await axios.put(`${url}/todo/${todo.id}.json`, payload)
      const newList = list.map(e => {
        if (e.id === payload.id) e.finish = false
        return e
      })
      dispatch(updateTodo(newList))
      dispatch(showLoader(HIDE_LOADER_TODO_LIST))
      notification['success']({message: 'Вы вернули задачу'})
    } catch(e) {
      throw new Error('ReturnTodo: ' + e.message)
    }
  }
}
