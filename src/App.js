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
import UserAdmin from "./pages/Admin/UserAdmin";
import Coordination from "./components/Jira/Coordination/Coordination";
import Miniproject from "./components/Jira/Coordination/Miniproject";
import Aboutme from "./components/Jira/Coordination/Aboutme";
import Minidesign from "./components/Jira/Coordination/Minidesign";
import MySkill from "./components/Jira/Coordination/MySkill";
import ContactMe from "./components/Jira/Coordination/ContactMe";



function App() {

  //????? d??ng dc useHistory th?? BrowserRouter ph???i b???c n???i dung th??? App
  //do ???? index.js dc b???c l???i =` th??? BrowserRouter ????? c?? dc props.history
  //v?? useHIstory v?? BrowserRouter l?? c???a react-router-dom n??n useHistory ph???i n???m trog BrowerRouter
  const history = useHistory();
  const dispatch = useDispatch();

  //
  useEffect(() => {
    
    //dispatch history l??n reducer x??? l??
    dispatch({
      type: 'ADD_HISTORY',
      history: history, //props
    });

  }, [])


  return (
    <>
      {/* nh???ng component ????? b??n ngo??i <Switch></Switch> th?? n?? s??? hi???n th??? ??? all c??c trang c?? ch???a trong Switch */}
      {/* <Header></Header> */}

      {/* ch??n trang loading cho website */}
      <LoadingComponent></LoadingComponent>
      <ModalJira></ModalJira>

      {/* Switch d??ng ????? khi page dc t??m th???y n?? s??? Break, gi???ng c?? ch??? Switch Case */}
      <Switch>
        {/* <HomeTemplate exact path="/home" component={Home}></HomeTemplate> */}
        {/* <HomeTemplate exact path="/dragdrop" component={DemoDragDrop}></HomeTemplate>
        <HomeTemplate exact path="/dragdropdnd" component={DragAndDropDnd}></HomeTemplate>
        <HomeTemplate exact path="/contact" component={Contact}></HomeTemplate>
        <HomeTemplate exact path="/about" component={About}></HomeTemplate> */}
        <UserLoginTemplate exact path="/login" component={LoginJira}></UserLoginTemplate>
        <UserLoginTemplate exact path="/register" component={RegisterJira}></UserLoginTemplate>
        {/* <HomeTemplate exact path="/profile" component={Profile}></HomeTemplate> */}
        {/* <HomeTemplate exact path="/todolistrcc" component={ToDoList}></HomeTemplate> */}
        {/* <HomeTemplate exact path="/todolistrfc" component={ToDoListRFC}></HomeTemplate> */}
        {/* <HomeTemplate exact path="/todolistredux" component={ToDoListRedux}></HomeTemplate> */}
        {/* <HomeTemplate exact path="/todolistsaga" component={ToDoListSaga}></HomeTemplate> */}
        {/* <HomeTemplate exact path="/detail/:id" component={Detail}></HomeTemplate> */}

        <JiraTemplate exact path="/jira" component={IndexJira}></JiraTemplate>
        <JiraTemplate exact path="/createproject" component={CreateProject}></JiraTemplate>
        <JiraTemplate exact path="/projectmanagement" component={ProjectManagement}></JiraTemplate>
        <JiraTemplate exact path="/usermanagement" component={UserAdmin}></JiraTemplate>
        <JiraTemplate exact path="/coordination" component={Coordination}></JiraTemplate>
        <JiraTemplate exact path="/miniproject" component={Miniproject}></JiraTemplate>
        <JiraTemplate exact path="/minidesign" component={Minidesign}></JiraTemplate>
        <JiraTemplate exact path="/aboutme" component={Aboutme}></JiraTemplate>
        <JiraTemplate exact path="/skill" component={MySkill}></JiraTemplate>
        <JiraTemplate exact path="/contact" component={ContactMe}></JiraTemplate>
        <JiraTemplate exact path="/projectdetail/:projectId" component={IndexJira}></JiraTemplate>
        <UserLoginTemplate exact path="/" component={LoginJira}></UserLoginTemplate>
        {/* tr??nh ng?????i d??ng g?? b???y b??? tr??n URL, khi URL ko h???p l?? th?? s??? tr??? v??? trang PageNotFound */}
        <JiraTemplate path="*" component={PageNotFound}></JiraTemplate>

      </Switch>
    </>
  );
}

export default App;
