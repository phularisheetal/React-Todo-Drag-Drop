import React, {Component} from 'react';

import Draggable from 'react-draggable';


export const TodoList = (props) => {
  let tasks = props.tasks;
  let cls = "list ";
  if(props.header == 'To Do') {
    cls += 'todo';
  }else if(props.header == 'In Progress') {
      cls += 'progress';
  }else {
    cls += 'done';
  }
  let renderCards = props.tasks.map((task,key)=>{
    return <li key={task.id} draggable={true}
    onDragStart={(event)=>{props.dragStart(task,event)}}
    onDrag={(event)=>{ props.drag(task,event)}}

     >{task.name}</li>
  })
  return <div className={cls} onDrop={(event)=>props.drop(event)} onDragOver={(event)=>{ props.dragover(event)}}>
    <div className="header-count-container">
      <h4>{props.header}</h4>
      <div className="count">
        <b>{tasks.length}</b>
        <span>Projects</span>
      </div>
    </div>
      <ul>{renderCards}</ul>
  </div>
}
