import React, {useState, useEffect} from "react";
import { BrowserRouter, Router, Switch, NavLink } from "react-router-dom";
import LoadingComponent from "./components/GlobalSetting/LoadingComponent/LoadingComponent";
import Header from "./components/Home/Header/Header";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import Detail from "./pages/Detail/Detail";
import Home from "./pages/Home/Home";
import LoginJira from "./pages/Jira/LoginJira/LoginJira";
import Login from "./pages/Login/Login";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import Profile from "./pages/Profile/Profile";
import ToDoList from "./pages/ToDoList/ToDoList";
import ToDoListRedux from "./pages/ToDoList/ToDoListRedux";
import ToDoListRFC from "./pages/ToDoList/ToDoListRFC";
import ToDoListSaga from "./pages/ToDoListSaga/ToDoListSaga";
import {HomeTemplate} from "./templates/HomeTemplate";
import {UserLoginTemplate} from "./templates/UserLoginTemplate";
import './App.css';
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch } from "react-redux";
import { JiraTemplate } from "./templates/JiraTemplate";
import IndexJira from "./pages/Jira/ProjectDetail/IndexJira";
import './index.css'
import CreateProject from "./pages/Jira/CreateProject/CreateProject";
import ProjectManagement from "./pages/Jira/ProjectManagement/ProjectManagement";
import ModalJira from "./HOC/JiraHOC/DrawerJira";
import DemoDragDrop from "./pages/DemoDragDrop/DemoDragDrop";
import DragAndDropDnd from "./pages/DragAndDropDnd/DragAndDropDnd";
import RegisterJira from "./pages/Jira/LoginJira/RegisterJira";



function App() {

  //để dùng dc useHistory thì BrowserRouter phải bọc nội dung thẻ App
  //do đó index.js dc bọc lại =` thẻ BrowserRouter để có dc props.history
  //vì useHIstory và BrowserRouter là của react-router-dom nên useHistory phải nằm trog BrowerRouter
  const history = useHistory();
  const dispatch = useDispatch();

  //
  useEffect(() => {
    
    //dispatch history lên reducer xử lý
    dispatch({
      type: 'ADD_HISTORY',
      history: history, //props
    });

  }, [])


  return (
    <>
      {/* những component để bên ngoài <Switch></Switch> thì nó sẽ hiển thị ở all các trang có chứa trong Switch */}
      {/* <Header></Header> */}

      {/* chèn trang loading cho website */}
      <LoadingComponent></LoadingComponent>
      <ModalJira></ModalJira>

      {/* Switch dùng để khi page dc tìm thấy nó sẽ Break, giống cơ chế Switch Case */}
      <Switch>
        <HomeTemplate exact path="/home" component={Home}></HomeTemplate>
        <HomeTemplate exact path="/dragdrop" component={DemoDragDrop}></HomeTemplate>
        <HomeTemplate exact path="/dragdropdnd" component={DragAndDropDnd}></HomeTemplate>
        <HomeTemplate exact path="/contact" component={Contact}></HomeTemplate>
        <HomeTemplate exact path="/about" component={About}></HomeTemplate>
        <UserLoginTemplate exact path="/login" component={LoginJira}></UserLoginTemplate>
        <UserLoginTemplate exact path="/register" component={RegisterJira}></UserLoginTemplate>
        <HomeTemplate exact path="/profile" component={Profile}></HomeTemplate>
        {/* <HomeTemplate exact path="/todolistrcc" component={ToDoList}></HomeTemplate> */}
        {/* <HomeTemplate exact path="/todolistrfc" component={ToDoListRFC}></HomeTemplate> */}
        {/* <HomeTemplate exact path="/todolistredux" component={ToDoListRedux}></HomeTemplate> */}
        {/* <HomeTemplate exact path="/todolistsaga" component={ToDoListSaga}></HomeTemplate> */}
        <HomeTemplate exact path="/detail/:id" component={Detail}></HomeTemplate>

        <JiraTemplate exact path="/jira" component={IndexJira}></JiraTemplate>
        <JiraTemplate exact path="/createproject" component={CreateProject}></JiraTemplate>
        <JiraTemplate exact path="/projectmanagement" component={ProjectManagement}></JiraTemplate>
        <JiraTemplate exact path="/projectdetail/:projectId" component={IndexJira}></JiraTemplate>
        <JiraTemplate exact path="/login" component={ProjectManagement}></JiraTemplate>
        {/* tránh người dùng gõ bậy bạ trên URL, khi URL ko hợp lý thì sẽ trả về trang PageNotFound */}
        <HomeTemplate path="*" component={PageNotFound}></HomeTemplate>

      </Switch>
    </>
  );
}

export default App;
