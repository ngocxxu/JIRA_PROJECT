import React from "react";
import ContentMainJira from "../../../components/Jira/Main/ContentMainJira";
import HeaderMainJira from "../../../components/Jira/Main/HeaderMainJira";
import InfoMainJira from "../../../components/Jira/Main/InfoMainJira";

export default function indexJira(props) {
  return (
    <div className="main">
      <HeaderMainJira></HeaderMainJira>
      <InfoMainJira></InfoMainJira>
      <ContentMainJira></ContentMainJira>
    </div>
  );
}
