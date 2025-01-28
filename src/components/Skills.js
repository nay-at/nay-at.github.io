import React from 'react';
class SkillsUp extends React.Component {


  render() {
    return (
      <div class="skills" id="skills-header">skills</div>
    );
  }
}


class SkillsDown extends React.Component {


  render() {
    return (
      <div class="skills" id="skills-bottom">Skills</div>
    );
  }
}

export { SkillsUp, SkillsDown };