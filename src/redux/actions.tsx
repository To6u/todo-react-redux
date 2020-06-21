import React from 'react'
import axios from 'axios'
import { notification } from 'antd'
import { SmileOutlined } from '@ant-design/icons';
import { TodoType } from './todoReducer'
import { SHOW_LOADER_TODO_LIST, HIDE_LOADER_TODO_LIST, SHOW_LOADER_FINISH_LIST, HIDE_LOADER_FINISH_LIST, TODO_COUNT,
  ADD_TODO, REMOVE_TODO, FETCH_TODO, NO_TODO, NO_FINISH_TODO, SHOW_ALL_FINISH_LIST_TODO, HIDE_ALL_FINISH_LIST_TODO, FINISH_COUNT} from "./types";

const url = process.env.REACT_APP_DB_URL

type VisibleLoaderType = typeof SHOW_LOADER_TODO_LIST | typeof SHOW_LOADER_FINISH_LIST | typeof HIDE_LOADER_TODO_LIST | typeof HIDE_LOADER_FINISH_LIST

type VisibleFinishListType = typeof SHOW_ALL_FINISH_LIST_TODO | typeof HIDE_ALL_FINISH_LIST_TODO

type VisbleFinishListActionType = {
  type: VisibleFinishListType
}
type VisibleLoaderActionType = {
  type: VisibleLoaderType
}
type EmptyTodoActiontype = {
  type: typeof NO_TODO
  payload: boolean
}
type EmptyFinishTodoActiontype = {
  type: typeof NO_FINISH_TODO
  payload: boolean
}
type updateTodoActionType = {
  type: typeof FETCH_TODO
  payload: any
}

export function visibleLoader(type:VisibleLoaderType): VisibleLoaderActionType {
  return { type }
}
export function visibleFinishList(type:VisibleFinishListType ):VisbleFinishListActionType {
  return { type }
}

export function emptyTodo(payload:boolean): EmptyTodoActiontype {
  return { type: NO_TODO, payload }
}

export function emptyFinishTodo(payload: boolean): EmptyFinishTodoActiontype {
  return { type: NO_FINISH_TODO, payload }
}

export function showFinishList() {
  return (dispatch: any) => { dispatch({ type: SHOW_ALL_FINISH_LIST_TODO }) }
}

export function hideFinishList() {
  return (dispatch: any) => { dispatch({ type: HIDE_ALL_FINISH_LIST_TODO }) }
}

export function toggleEditForm(payload: TodoType[]) {
  return { type: FETCH_TODO, payload }
}

export function updateTodo(payload: TodoType[]): updateTodoActionType {
  try { return { type: FETCH_TODO, payload } }
  catch(e) { throw new Error('EditTodo: ' + e.message) }
}

export function fetchTodo() {
  return async (dispatch: any)=> {
    dispatch(visibleLoader(SHOW_LOADER_TODO_LIST))
    dispatch(visibleLoader(SHOW_LOADER_FINISH_LIST))
    try {
      const res = await axios.get(`${url}/todo.json`)
      let finishCount: number = 0
      let taskCount: number = 0
      if (res.data) {
        const payload = Object.keys(res.data).map(key => {
          finishCount = res.data[key].finish ? finishCount + 1 : finishCount + 0
          taskCount = !res.data[key].finish ? taskCount + 1 : taskCount + 0
          return {
            ...res.data[key],
            id: key
          }
        })
        dispatch({type: FETCH_TODO, payload})
        dispatch({type: FINISH_COUNT, payload: finishCount})
        dispatch({type: TODO_COUNT, payload: taskCount})
        dispatch(visibleLoader(HIDE_LOADER_TODO_LIST))
        dispatch(visibleLoader(HIDE_LOADER_FINISH_LIST))
        dispatch(emptyTodo(false))
      } else {
        dispatch({type: FETCH_TODO, payload: []})
        dispatch(visibleLoader(HIDE_LOADER_TODO_LIST))
        dispatch(visibleLoader(HIDE_LOADER_FINISH_LIST))
        dispatch(emptyTodo(true))
      }
    } catch (e) {
      throw new Error('FetchTodo: ' + e.message)
    }
  }
}

export function addTodo(task: TodoType) {
  return async (dispatch: any) => {
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
      dispatch({type: TODO_COUNT, payload: 1})
      notification['success']({message: 'Задача добавлена', description: dateCreate})
    } catch(e) {
      throw new Error('AddTodo: ' + e.message)
    }
  }
}

export function removeTodo(id: string, list: TodoType[]) {
  return async (dispatch: any) => {
    dispatch(visibleLoader(SHOW_LOADER_TODO_LIST))
    try {
      await axios.delete(`${url}/todo/${id}.json`)
      dispatch({type: REMOVE_TODO, payload: id})
      dispatch(visibleLoader(HIDE_LOADER_TODO_LIST))
      list.map(task => {
        return task.id === id
          ? task.finish
            ? dispatch({type: FINISH_COUNT, payload: -1})
            : dispatch({type: TODO_COUNT, payload: -1})
          : null
      })
      notification['error']({message: 'Задача удалена'})
    } catch(e) {
      throw new Error('RemoveTodo: ' + e.masaage)
    }
  }
}

export function editTodo(todo: TodoType, list: TodoType[]) {
  return async (dispatch: any) => {
    try {
      await axios.put(`${url}/todo/${todo.id}.json`, todo)
      const newList = list.map((e: TodoType) => {
        if (e.id === todo.id) e = todo
        return e
      })
      dispatch(updateTodo(newList))
      notification['success']({message: 'Задача изменена'})
    } catch(e) {
      throw new Error('EditTodo: ' + e.message)
    }
  }
}

export function addFinishTodo(todo: TodoType, list: any) {
  return async (dispatch: any) => {
    dispatch(visibleLoader(SHOW_LOADER_FINISH_LIST))
    try {
      const dateOptions = {year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric'}
      const dateFinish = new Date().toLocaleDateString('en-GB', dateOptions)
      const payload = {...todo, finish: true, dateFinish}
      await axios.put(`${url}/todo/${todo.id}.json`, payload)
      const newList = list.map((e: TodoType) => {
        if (e.id === payload.id) {
          e.finish = true
          e.dateFinish = dateFinish
        }
        return e
      })
      dispatch(updateTodo(newList))
      dispatch({type: FINISH_COUNT, payload: 1})
      dispatch({type: TODO_COUNT, payload: -1})
      dispatch(visibleLoader(HIDE_LOADER_FINISH_LIST))
      notification.open({message: "Поздравляю! Задача завершена", icon: <SmileOutlined style={{ color: '#30B60B' }}/>})
    } catch(e) {
      throw new Error('FinishTodo: ' + e.message)
    }
  }
}

export function returnFinishTodo(todo: TodoType, list: any) {
  return async (dispatch: any) => {
    dispatch(visibleLoader(SHOW_LOADER_TODO_LIST))
    try {
      const payload = {...todo, finish: false, dateFinish: ''}
      await axios.put(`${url}/todo/${todo.id}.json`, payload)
      const newList = list.map((e: TodoType) => {
        if (e.id === payload.id) {
          e.finish = false
          e.dateFinish = ''
        }
        return e
      })
      dispatch({type: FINISH_COUNT, payload: -1})
      dispatch({type: TODO_COUNT, payload: 1})
      dispatch(updateTodo(newList))
      dispatch(visibleLoader(HIDE_LOADER_TODO_LIST))
      notification['success']({message: 'Вы вернули задачу'})
    } catch(e) {
      throw new Error('ReturnTodo: ' + e.message)
    }
  }
}
