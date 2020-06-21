import React, {useRef} from 'react'
import { useDrag, useDrop, DropTargetMonitor } from 'react-dnd'
import {TodoType} from '../../redux/todoReducer'
import { XYCoord } from 'dnd-core'
import TodoItem from '../TodoItem/ToDoItem'

interface TodoItemDragDropProps {
  className?: string
  task: TodoType
  list: TodoType[]
  moveTodo(dragIndex: number, hoverIndex: number ): void
  index: number
}

interface DragItem {
  index: number
  id: string
  type: string
}

const TodoItemDragDrop: React.FC<TodoItemDragDropProps> = ({className, task, list, index, moveTodo}) => {
  const dragRef = useRef<any>(null)
  const [, drop] = useDrop({
    accept: 'todo',
    hover(item: DragItem, monitor: DropTargetMonitor) {
      if (!dragRef.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index
      if (dragIndex === hoverIndex) {
        return
      }
      const hoverBoundingRect = dragRef.current?.getBoundingClientRect()
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

      const clientOffset = monitor.getClientOffset()
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }
      moveTodo(dragIndex, hoverIndex)
      item.index = hoverIndex
    },

  })
  let id = task.id

  const [{ isDragging }, drag] = useDrag({
    item: { type: 'todo', id, index },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  })
  if(!task.finish) {
    drag(drop(dragRef))
  }

  className = isDragging ? 'todo-item--drag-active' : 'todo-item'

  return (
    <>
      <TodoItem className={className} task={task} list={list} TodoItemRef={dragRef} />
    </>
  );
}

export default TodoItemDragDrop
