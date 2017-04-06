var data =  require('../data.json').data;

export default function(state=null,action) {
  switch(action.type) {
    case 'ADD_TASK':

        let arr = state.slice(0);
        arr.push({
          "id":new Number(arr.length-1).toString(),
          "name": action.payload,
          "inProgress": false,
          "todo": true,
          "done": false

        });
     return arr ;


    case 'DRAG_DROP':
    debugger
        let taskStatus = action.payload.taskStatus;
        switch(taskStatus) {
          case 'inProgress':
              var tasks = state.map((task)=> {
              if(task.id == action.payload.task.id) {
                task[taskStatus] = true;
                task['todo'] = false;
                task['done'] = false;
              }
              return task;
            });
            return tasks;
          case 'done' :
              var tasks = state.map((task)=> {
              if(task.id == action.payload.task.id) {
                task[taskStatus] = true;
                task['inProgress'] = false;
                task['todo'] = false;
              }
              return task;
            });
            return tasks;

            case 'todo' :
                var tasks = state.map((task)=> {
                if(task.id == action.payload.task.id) {
                  task[taskStatus] = true;
                  task['inProgress'] = false;
                  task['done'] = false;
                }
                return task;
              });
              return tasks;
        }


  }

  return data;
}
