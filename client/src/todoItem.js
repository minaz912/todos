import React from 'react';

const TodoItem = (props) => {
  const containerClsName = `todo-container ${props.completed ? 'checked': ''}`;
  const priorityClsName = `icon-right ${props.priority}`;
  return (
    <li className={containerClsName}>
      <div className="todo-name">
        {props.title || '<Untitled Todo>'}
      </div>
      <div>
        <span className={priorityClsName}>
          {props.priority.toLowerCase()}
        </span>
        <span className='icon-right icon-close' onClick={props.editCb.bind(this, props.guid, props.title, props.desc, props.priority, props.dueDate, !props.completed, props.completionDate)}>
          &#9745;
        </span>
        <span className='icon-right icon-close'>
          x
        </span>
      </div>
    </li>
  )
}

export default TodoItem;
