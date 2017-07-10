import React from 'react';
import { itemIsDue } from '../utils';


const TodoItem = (props) => {

  let isDue = false;

  if (!props.completed && props.dueDate) {
    isDue = itemIsDue(props.dueDate);
  }

  const containerClsName = `todo-container ${props.completed ? 'checked': (isDue ? 'due' : '')}`;
  const priorityClsName = `icon-right ${props.priority}`;

  return (
    <li className={containerClsName}>
      <div className="todo-row todo-row-first">
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
          <span onClick={props.deleteCb.bind(this, props.guid)} className='icon-right icon-close'>
            x
          </span>
        </div>
      </div>
      <div className="todo-row todo-row-second">
        {props.desc || '<No Description>'}
      </div>
    </li>
  )
}

export default TodoItem;
