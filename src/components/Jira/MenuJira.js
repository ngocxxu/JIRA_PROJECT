import React from "react";
import { NavLink } from "react-router-dom";
// import logo from "../../assets/img/download.jfif"
import logo from "../../assets/img/logo.jpg";
import { Button, notification } from "antd";
import { useDispatch, useSelector } from "react-redux";
import FormCreateTask from "../Forms/FormCreateTask/FormCreateTask";

const openNotification = () => {
  notification.open({
    duration: 10,
    message: "Warning Message",
    description:
      'Để truy cập bạn vui lòng click vào "dòng chữ màu xanh" ở cột Project Name. (To access it, please click the "blue word line" at the column of Project Name)',
    onClick: () => {
      console.log("Notification Clicked!");
    }
  });
};

export default function MenuJira() {
  const userLogin = useSelector((state) => state.UserJiraReducer.userLogin);
  const dispatch = useDispatch();
  const { toggleMenu } = useSelector((state) => state.CommentReducer);
  const { toggleMenuBig } = useSelector((state) => state.CommentReducer);
  return (
    <div className=" position-relative">
      {toggleMenuBig ? (
        <div className="menu menu-big-toogle bg-glass">
          <div className="account mt-5">
            <div className="avatar">
              <img src={userLogin?.avatar} alt={userLogin?.avatar} />
            </div>
            <div className="account-info">
              <p>Jira Zupi Company</p>
              <p>
                Hello!
                <span> {userLogin?.name}</span>
              </p>
            </div>
          </div>
          <div className="control">
            <div>
              <i class="fas fa-chalkboard-teacher"></i>
              <NavLink
                onClick={openNotification}
                className="nav-text ml-2"
                to="/jira"
                activeClassName="active btn-menu"
              >
                Jira Board
              </NavLink>
            </div>
            <div>
              <i className="fa fa-cog" />
              <NavLink
                className="nav-text ml-2"
                to="/projectmanagement"
                activeClassName="active btn-menu text-white"
              >
                Project Management
              </NavLink>
            </div>
            <div>
              <i class="fas fa-folder-plus"></i>
              <NavLink
                className="nav-text ml-2"
                to="/createproject"
                activeClassName="active btn-menu text-white"
              >
                Create Project
              </NavLink>
            </div>
            <div>
              <i class="fas fa-users-cog"></i>{" "}
              <NavLink
                className="nav-text ml-1"
                to="/usermanagement"
                activeClassName="active btn-menu text-white"
              >
                User Management
              </NavLink>
            </div>
            <div>
              <i class="fas fa-layer-group"></i>{" "}
              <NavLink
                className="nav-text ml-1"
                to="/coordination"
                activeClassName="active btn-menu text-white"
              >
                Coordination
              </NavLink>
            </div>
          </div>
          <div className="feature">
            <div>
              <i class="fas fa-project-diagram"></i>{" "}
              <NavLink
                className="nav-text "
                to="/miniproject"
                activeClassName="active btn-menu text-white"
              >
                Mini Frontend Project
              </NavLink>
            </div>
            <div>
              <i class="fas fa-drafting-compass"></i>{" "}
              <NavLink
                className="nav-text "
                to="/minidesign"
                activeClassName="active btn-menu text-white"
              >
                Mini Design Project
              </NavLink>
            </div>
            <div>
              <i className="far fa-laugh-beam" />
              <NavLink
                className="nav-text ml-1"
                to="/aboutme"
                activeClassName="active btn-menu text-white"
              >
                About Me
              </NavLink>
            </div>
            <div>
              <i class="fas fa-medal"></i>{" "}
              <NavLink
                className="nav-text ml-1"
                to="/skill"
                activeClassName="active btn-menu text-white"
              >
                My Skills
              </NavLink>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      {toggleMenu ? (
        <div className="menu-toggle bg-glass">
          <div className="control">
            <div>
              <NavLink
                onClick={openNotification}
                className="nav-text ml-2"
                to="/jira"
                activeClassName="active"
              >
                Jira Board
              </NavLink>
            </div>
            <div>
              <NavLink
                className="nav-text ml-2"
                to="/projectmanagement"
                activeClassName="active menu-color-toggle"
              >
                Project Management
              </NavLink>
            </div>
            <div>
              <NavLink
                className="nav-text ml-2"
                to="/createproject"
                activeClassName="active menu-color-toggle"
              >
                Create Project
              </NavLink>
            </div>
            <div>
              <NavLink
                className="nav-text ml-2"
                to="/usermanagement"
                activeClassName="active menu-color-toggle"
              >
                User Management
              </NavLink>
            </div>
            <div>
              <NavLink
                className="nav-text ml-2"
                to="/coordination"
                activeClassName="active menu-color-toggle"
              >
                Coordination
              </NavLink>
            </div>
          </div>
          <div className="feature">
            <div>
              <NavLink
                className="nav-text ml-2"
                to="/miniproject"
                activeClassName="active menu-color-toggle"
              >
                Mini Frontend Project
              </NavLink>
            </div>
            <div>
              <NavLink
                className="nav-text ml-2"
                to="/minidesign"
                activeClassName="active menu-color-toggle"
              >
                Mini Design Project
              </NavLink>
            </div>
            <div>
              <NavLink
                className="nav-text ml-2"
                to="/aboutme"
                activeClassName="active menu-color-toggle"
              >
                About Me
              </NavLink>
            </div>
            <div>
              <NavLink
                className="nav-text ml-2"
                to="/skill"
                activeClassName="active menu-color-toggle"
              >
                My Skills
              </NavLink>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
