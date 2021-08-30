import { GET_LIST_PROJECT } from "../constants/Jira/JiraConst";

const stateDefault = {
  projectList: [
    {    "id": 1030,
    "projectName": "bono",
    "description": "<p>bono</p>",
    },

  ],
}



export const ProjectJiraReducer = (state = stateDefault,action) =>{
  switch(action.type){
    case GET_LIST_PROJECT:{
      state.projectList = action.projectList;
      return { ...state}
    }
    

    default: return { ...state};
  }
}