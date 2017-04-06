export const dragDrop = (task,taskStatus)=>{
  return {
      type:'DRAG_DROP',
      payload: {task,taskStatus}
  }
}
