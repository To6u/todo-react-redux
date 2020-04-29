import {combineReducers} from 'redux'
import { appReducer } from './appReducer'
import { todoReducer } from './todoReducer'

export const rootReducer = combineReducers({
  app: appReducer,
  todo: todoReducer
})