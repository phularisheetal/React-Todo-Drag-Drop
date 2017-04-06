import React, { Component } from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import {TodoList} from '../components/todo-list';
import {addTask} from '../actions/addTaskAction';
import {dragDrop} from '../actions/dragDropAction';

class TasksContainer extends Component {

  constructor (props){
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.addProject = this.addProject.bind(this);
    this.drop = this.drop.bind(this);
    this.dragStart= this.dragStart.bind(this);
    this.drag= this.drag.bind(this);
    this.dragover=this.dragover.bind(this);
    this.state = {
      newProjectName:'',
      currentTaskDragged:'',
      draggedTo:''
    }
  }




    _sort(a,b) {
      let reA = /[^a-zA-Z]/g;
      let reN = /[^0-9]/g;
      let sortProp = 'name';
      const aVal = a[sortProp], bVal = b[sortProp];
      let aA = aVal.replace(reA, "");
      let bA = bVal.replace(reA, "");
      if(aA === bA) { // if alphanumeric name
          var aN = parseInt(aVal.replace(reN, ""), 10);
          var bN = parseInt(bVal.replace(reN, ""), 10);
          return aN === bN ? 0 : aN > bN ? 1 : -1;
      } else { // if just a alphabetic string
          return aA.localeCompare(bA);
      }
}

  drag(task,event) {
      event.preventDefault();
  }

  dragover(event) {
    event.preventDefault();
  }

  handleInputChange (event) {
      this.setState({newProjectName:event.target.value})
  }

  addProject() {
    this.props.addTask(this.state.newProjectName)
  }

  drop(event) {
    //event.dataTransfer.dropEffect = 'move';
    event.preventDefault();
    debugger;
    let elem = event.target.nodeName=='LI'?event.target.parentElement.parentElement:event.target.parentElement;
    let cls =  elem.getAttribute('class') != null?elem.getAttribute('class').split(' ')[1]:'';
    switch(cls) {
      case 'progress':
          this.props.dragDrop(this.state.currentTaskDragged,'inProgress');break;
      case 'todo':
        this.props.dragDrop(this.state.currentTaskDragged,'todo'); break;
      case 'done':

      this.props.dragDrop(this.state.currentTaskDragged,'done'); break
    }
    return false;
  }

  dragStart(task,event) {
    this.setState({currentTaskDragged:task});
  }
  render() {
    let sortedTasks = this.props.tasks.sort((a,b) => { return this._sort(a,b)});
    let todoTasks = sortedTasks.filter((task,key) => {
         return task.todo;
    })
    let progressTasks = sortedTasks.filter((task,key) => {
        return task.inProgress;
    })
    let doneTasks = sortedTasks.filter((task,key) => {
        return task.done;
    })
    return  <div className="main-wrapper" >
        <div className="main-header">
          <div className="add-project-section">
            <input type='text' onChange={this.handleInputChange}/>
            <button onClick={this.addProject}>Add Project</button>
          </div>
          <div className="total">
            <h6>Total</h6>
            <div>
              {this.props.tasks.length}
              Projects
            </div>
          </div>
        </div>
        <div className="lists-wrapper">
        <TodoList tasks={todoTasks} header="To Do" drop={this.drop} dragStart={this.dragStart} drag={this.drag} dragover={this.dragover}/>
        <TodoList tasks={progressTasks} header="In Progress" drop={this.drop} dragStart={this.dragStart} drag={this.drag} dragover={this.dragover}/>
        <TodoList tasks={doneTasks} header="Done" drop={this.drop} dragStart={this.dragStart} drag={this.drag} dragover={this.dragover}/>
        </div>
      </div>
  }
}


function mapStateToProps(state) {
  return {
    tasks: state.tasks
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({addTask:addTask,dragDrop:dragDrop},dispatch)
}


export default connect(mapStateToProps,matchDispatchToProps)(TasksContainer)
