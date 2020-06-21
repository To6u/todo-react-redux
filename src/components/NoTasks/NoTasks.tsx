import React from 'react'
import { useTypedSelector } from '../../redux/rootReducer'
import { CSSTransition } from 'react-transition-group'

interface NoTasksProps {
  finish: boolean
}

const NoTasks: React.FC<NoTasksProps> = ({finish}) => {
  const noTasks = useTypedSelector(state => state.todo.noTasks)
  const noFinishTask = useTypedSelector(state => state.todo.noFinishTask)
  return (
    <CSSTransition
      in={finish ? noFinishTask : noTasks}
      timeout={{enter: 300, exit: 400}}
      classNames='no-task'
    >
      {
        !finish
        ? <p className='no-task text-left font-weight-light mb-1'>Любую задачу реально выполнить, если разбить ее на выполнимые части</p>
        : <p className='no-task text-left font-weight-light mb-1'>Большинство задач решаются удивительно просто: надо взять и сделать</p>
      }
    </CSSTransition>
  )
}

export default NoTasks
