import React from "react"

import { CLOSE_DRAWER, OPEN_DRAWER, OPEN_FORM, OPEN_FORM_EDIT_PROJECT, SET_SUBMIT_EDIT_PROJECT } from "../constants/Jira/DrawerConst"

const initialState = {
  visible: false,
  title:'',
  ComponentContentDrawer: <p>default</p>,
  callBackSubmit: (propsValues)=>{alert("Please")}
}

export const DrawerJiraReducer = (state = initialState, action) => {
  switch (action.type) {

  case OPEN_DRAWER:
    return { ...state, visible: action.visible }

  case CLOSE_DRAWER:
    return { ...state, visible: action.visible }

  case OPEN_FORM_EDIT_PROJECT:{
    
    return{...state, visible: action.visible, ComponentContentDrawer: action.Component, title: action.title}
  }

  case SET_SUBMIT_EDIT_PROJECT:{
    state.callBackSubmit = action.submitFunction;

    return {...state};
  }

  case 'OPEN_FORM_CREATE_TASK':{
    return{...state, visible: action.visible, ComponentContentDrawer: action.Component,}
    
  }

  case 'SET_BUTTON_SUBMIT_CREATE_TASK':{
    return{...state,  callBackSubmit: action.submitFunction}
  }

  default:
    return state
  }
}
