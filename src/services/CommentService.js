import { BaseService } from "./BaseService";

export class CommentService extends BaseService {

  constructor(){
    super();
  }

  // createTask = (taskObject) => {
  //   return this.post(`Project/createTask`,taskObject);
  // }

  // getCommentDetail = (taskIdCmt) => {
  //   console.log('alo tao qua đây r')
  //   return this.get(`Comment/getAll?taskId=${taskIdCmt}`)
  // }

  // updateStatusTask = (taskUpdateStatus) => {
  //   return this.put(`Project/updateStatus`,taskUpdateStatus)
  // }





}

//tạo đối tượng projectService để chứa các phương thức trên
//export để có thể dùng dc trong các file saga
export const commentService = new CommentService();
