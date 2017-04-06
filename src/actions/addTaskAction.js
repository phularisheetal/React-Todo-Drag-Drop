export const addTask = (taskName)=>{
  return {
      type:'ADD_TASK',
      payload: taskName
  }
}
