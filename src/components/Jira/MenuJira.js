import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/img/download.jfif"

export default function MenuJira() {
  return (
    <div className="menu">
      <div className="account">
        <div className="avatar">
          <img src={logo} alt />
        </div>
        <div className="account-info">
          <p>CyberLearn.vn</p>
          <p>Report bugs</p>
        </div>
      </div>
      <div className="control">
        <div>
          <i className="fa fa-credit-card" />
          <NavLink className="text-dark" to='/jira' activeClassName = 'active font-weight-bold'>Cyber Board</NavLink>
        </div>
        <div>
          <i className="fa fa-cog" />
          <NavLink className="text-dark" to='/projectmanagement' activeClassName = 'active font-weight-bold' font-weight-bold>Project Management</NavLink>
        </div>
        <div>
          <i className="fa fa-cog" />
          <NavLink className="text-dark" to='/createproject' activeClassName = 'active font-weight-bold' font-weight-bold>Create Project</NavLink>
        </div>
      </div>
      <div className="feature">
        <div>
          <i className="fa fa-truck" />
          <span>Releases</span>
        </div>
        <div>
          <i className="fa fa-equals" />
          <span>Issues and filters</span>
        </div>
        <div>
          <i className="fa fa-paste" />
          <span>Pages</span>
        </div>
        <div>
          <i className="fa fa-location-arrow" />
          <span>Reports</span>
        </div>
        <div>
          <i className="fa fa-box" />
          <span>Components</span>
        </div>
      </div>
    </div>
  );
}
