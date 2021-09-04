import { DOMAIN, DOMAIN_JIRA, TOKEN } from "../util/constants/settingSystem";
import Axios from "axios";

export const jiraService = {
  signinJira: (userLogin) => {
    return Axios({
      url: `${DOMAIN_JIRA}/users/signin`,
      method: "POST",
      data: userLogin,
    });
  },
  getAllProjectCategory: () => {
    return Axios({
      url: `${DOMAIN_JIRA}/ProjectCategory`,
      method: "GET",
    })
  },
  createProject:(newProject)=>{
    return Axios({
      url: `${DOMAIN_JIRA}/Project/createProject`,
      method: "POST",
      data: newProject,
    })
  },
  createProjectAuthorization: (newProject)=>{
    return Axios({
      url: `${DOMAIN_JIRA}/Project/createProjectAuthorize`,
      method: "POST",
      data: newProject,
      headers: {'Authorization': 'Bearer ' + localStorage.getItem(TOKEN)}, //bearer là của lib JWT dùng để render ra các token
    })
  },
  getListProject:()=>{
    return Axios({
      url: `${DOMAIN_JIRA}/Project/getAllProject`,
      method: 'GET',
      headers: {'Authorization': 'Bearer ' + localStorage.getItem(TOKEN)}, //bearer là của lib JWT dùng để render ra các token
    })
  },
  updateProject:(projectUpdate)=>{
    return Axios({
      url: `${DOMAIN_JIRA}/Project/updateProject?projectId=${projectUpdate.id}`,
      method: 'PUT',
      data: projectUpdate, //gửi data len server api xử lý
      headers: {'Authorization': 'Bearer ' + localStorage.getItem(TOKEN)}, //bearer là của lib JWT dùng để render ra các token
    })
  },


  updateStatusTask:(taskUpdateStatus)=>{
    return Axios({
      url: `${DOMAIN_JIRA}/Project/updateStatus`,
      method: 'PUT',
      data: taskUpdateStatus, //gửi data len server api xử lý
      headers: {'Authorization': 'Bearer ' + localStorage.getItem(TOKEN)}, //bearer là của lib JWT dùng để render ra các token
    })
  },

  createTask: (taskObject)=>{
    return Axios({
      url: `${DOMAIN_JIRA}/Project/createTask`,
      method: "POST",
      data: taskObject,
      headers: {'Authorization': 'Bearer ' + localStorage.getItem(TOKEN)}, //bearer là của lib JWT dùng để render ra các token
    })
  },

  //get all comment
  getCommentDetail:(taskIdCmt)=>{
    return Axios({
      url: `${DOMAIN_JIRA}/Comment/getAll?taskId=${taskIdCmt}`,
      method: 'GET',
      data:taskIdCmt,
      headers: {'Authorization': 'Bearer ' + localStorage.getItem(TOKEN)}, //bearer là của lib JWT dùng để render ra các token
    })
  },
  //insert comment
  insertComment:(postComment)=>{
    return Axios({
      url: `${DOMAIN_JIRA}/Comment/insertComment`,
      method: 'POST',
      data:postComment,
      headers: {'Authorization': 'Bearer ' + localStorage.getItem(TOKEN)}, //bearer là của lib JWT dùng để render ra các token
    })
  },

  //delete comment
  deleteComment:(idComment)=>{
    return Axios({
      url: `${DOMAIN_JIRA}/Comment/deleteComment?idComment=${idComment}`,
      method: 'DELETE',
      data:idComment,
      headers: {'Authorization': 'Bearer ' + localStorage.getItem(TOKEN)}, //bearer là của lib JWT dùng để render ra các token
    })
  },


  
};


