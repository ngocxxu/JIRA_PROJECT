import { BaseService } from "./BaseService";


//ProjectService kế thừa BaseService thông qua extends
export class ProjectService extends BaseService {

  constructor(){
    super();
  }

  deleteProject = (id) => {
    return this.delete(`Project/deleteProject?projectId=${id}`);
  }

  getProjectDetails = (projectId) => {
    return this.get(`Project/getProjectDetail?id=${projectId}`);
  }

}

//tạo đối tượng projectService để chứa các phương thức trên
//export để có thể dùng dc trong các file saga
export const projectService = new ProjectService();