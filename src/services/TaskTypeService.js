import { BaseService } from "./BaseService";


//ProjectService kế thừa BaseService thông qua extends
export class TaskTypeService extends BaseService {

  constructor(){
    super();
  }

  getAllTaskType = () => {
    return this.get(`TaskType/getAll`);
  }
}

//tạo đối tượng projectService để chứa các phương thức trên
//export để có thể dùng dc trong các file saga
export const taskTypeService = new TaskTypeService();