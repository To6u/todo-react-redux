import {combineReducers} from 'redux'
import { TypedUseSelectorHook, useSelector } from 'react-redux'
import { appReducer } from './appReducer'
import { todoReducer } from './todoReducer'

export const rootReducer = combineReducers({
  app: appReducer,
  todo: todoReducer
})

export type RootState = ReturnType<typeof rootReducer>
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector
