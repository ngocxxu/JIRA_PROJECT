import { GET_ALL_PROJECT, GET_LIST_PROJECT } from "../constants/Jira/JiraConst";

const stateDefault = {
  projectList: [
    {    "id": 1030,
    "projectName": "bono",
    "description": "<p>bono</p>",
    },

  ],

  arrProject:[], //dành cho nghiệp vụ Get all project cho dropdown
}



export const ProjectJiraReducer = (state = stateDefault,action) =>{
  switch(action.type){
    case GET_LIST_PROJECT:{
      state.projectList = action.projectList;
      return { ...state}
    }

    case GET_ALL_PROJECT:{
      state.arrProject = action.arrProject;
      return { ...state }
    }
    
    

    default: return { ...state};
  }
}