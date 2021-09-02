import { BaseService } from "./BaseService";


//ProjectService kế thừa BaseService thông qua extends
export class TaskService extends BaseService {

  constructor(){
    super();
  }

  createTask = (taskObject) => {

    return this.post(`Project/createTask`,taskObject);
  }

  getTaskDetail = (taskId) => {
    return this.get(`Project/getTaskDetail?taskId=${taskId}`)
  }

  updateStatusTask = (taskUpdateStatus) => {
    return this.put(`Project/updateStatus`,taskUpdateStatus)
  }
}

//tạo đối tượng projectService để chứa các phương thức trên
//export để có thể dùng dc trong các file saga
export const taskService = new TaskService();