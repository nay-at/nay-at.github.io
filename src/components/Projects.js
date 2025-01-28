import React from 'react';
let jsonData = require("../projects/projects.json");
jsonData.sort(function (a, b) {
  //return a[0] - b[0];
  if (a[0] === b[0]) return 0;
  if (a[0] < b[0]) return -1;
  return 1;
});
function skillSeparator(skills, separator = " / ") {
  return skills.split(separator)
}
function skillsDiv(skills) {
  console.log(skills)
  let allSkills = skillSeparator(skills, "/")
  return (
    <div className="skills-container ">
      {allSkills.map((item, index) => (
        <div
          className="skills-btn"
          key={index}
        >
          {item}
        </div>
      ))}
    </div>
  );

}


class ProjectsUp extends React.Component {
  render() {
    const { currentProject } = this.props;

    if (!currentProject) {
      return (<div className="projects" id="projects-header">
        Projects
      </div>)
    }
    return (

      <div>

        <div className="project-name">{currentProject[0]}</div>
        <div className="project-skills">{skillsDiv(currentProject[3])}</div>
        <div className="project-img">IMG</div>

        <div className="project-date">Date: {currentProject[4]}</div>
        <details>
          <summary>Description</summary>
          {currentProject[1]}
        </details>
        <details>
          <summary>Role</summary>
          {currentProject[1]}
        </details>
        <details>
          <summary>technical concepts</summary>
          {currentProject[1]}
        </details>
        <div className="project-link">Link: {currentProject[2]}</div>
      </div>
    );
  }
}

class ProjectsDown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: "All", // Initialize with the first name
    };
  }

  changeSkillsState(state) {
    this.setState({ categories: state });
  }



  getAllSkills() {
    let skillsData = new Set()
    let skill = []

    jsonData.map((item) => skill.push(item[3]))
    let skillS = skill.join(" / ")
    console.log("JOIN : ", skillS)
    skill = skillSeparator(skillS)
    console.log("skillSeparator : ", skill)
    skill.sort(function (a, b) {
      //return a[0] - b[0];
      if (a[0] === b[0]) return 0;
      if (a[0] < b[0]) return -1;
      return 1;
    });
    skill.map((item) => (
      skillsData.add(item)

    ))

    return skillsData

  }
  filter() {
    return jsonData.filter((item) => (this.state.categories === "All" ? true : item[3].includes(this.state.categories))).map((item, index) => (
      <div className={"project-container " + skillSeparator(item[3]).join(" ")} onClick={() => this.handleProjectClick(item)}>
        <div className="project-info" id={`project-${item[0]}`} key={index}>
          {item[0]}
        </div><div className="skills">{skillsDiv(item[3])}</div>

      </div>
    ))
  }
  handleProjectClick(project) {
    if (this.props.onProjectChange) {
      this.props.onProjectChange(project); // Notify parent of the selected project
    }
  }



  render() {
    let skillsfilter = this.getAllSkills()
    return (
      <div className="projects posts" id="projects-bottom">
        <div id="myBtnContainer">
          <button class="filter-btn active" onClick={() => this.changeSkillsState("All")}> Show all</button>
          {[...skillsfilter.values()].filter((item) => (item !== "-")).map((item) => (

            <button class="filter-btn" onClick={() => this.changeSkillsState(item)} >{item}</button>
          ))
          }
        </div>
        {this.filter()}
      </div >
    );
  }
}

export { ProjectsUp, ProjectsDown };
