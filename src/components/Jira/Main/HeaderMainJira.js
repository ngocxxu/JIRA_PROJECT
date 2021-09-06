import React from "react";

export default function HeaderMainJira({ projectDetail, ...props }) {
  return (
    <div className="header mt-3">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item ml-2">Project</li>
          <li className="breadcrumb-item">JiraZupi</li>
          <li className="breadcrumb-item">Project Management</li>
          <li className="breadcrumb-item active" aria-current="page">
            {projectDetail.projectName}
          </li>
        </ol>
      </nav>
    </div>
  );
}
