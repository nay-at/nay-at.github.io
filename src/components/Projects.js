import React from 'react';
let jsonData = require("../projects/projects.json");
jsonData.sort(function (a, b) {
  //return a[0] - b[0];
  if (a[0] == b[0])
    return 0;
  if (a[0] < b[0])
    return -1;
  if (a[0] > b[0])
    return 1;
});

class ProjectsUp extends React.Component {
  render() {
    const { currentProject } = this.props;

    return (
      <div>
        <div className="projects" id="projects-bottom">
          Projects
        </div>
        <div className="project-name">Current Project: {currentProject[0]}</div>
        <div className="project-date">Date: {currentProject[4]}</div>
        <div className="project-desc">Description: {currentProject[1]}</div>
        <div className="project-link">Link: {currentProject[2]}</div>
        <div className="project-skills">Skills: {currentProject[3]}</div>
        <div className="project-img">IMG</div>
      </div>
    );
  }
}

class ProjectsDown extends React.Component {
  handleProjectClick(project) {
    if (this.props.onProjectChange) {
      this.props.onProjectChange(project); // Notify parent of the selected project
    }
  }

  render() {
    return (
      <div className="projects" id="projects-header">
        {jsonData.map((item, index) => (
          <div
            className="project-button"
            id={`project-${item[0]}`}
            onClick={() => this.handleProjectClick(item)}
            key={index}
          >
            {item[0]}
          </div>
        ))}
      </div>
    );
  }
}

export { ProjectsUp, ProjectsDown };
