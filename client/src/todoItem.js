import React from 'react';

const TodoItem = (props) => {
  const priorityClsName = `icon-right ${props.priority}`;
  return (
    <li className='todo-container'>
      <div className="todo-name">
        {props.title}
      </div>
      <div>
        <span className={priorityClsName}>
          {props.priority.toLowerCase()}
        </span>
        <span className='icon-right icon-close'>
          x
        </span>
      </div>
    </li>
  )
}

export default TodoItem;
