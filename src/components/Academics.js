import React from 'react';
class AcademicsUp extends React.Component {

  render() {
    return (
      <div class="academics" id="academics-header">Academics</div>
    );
  }
}


class AcademicsDown extends React.Component {

  render() {
    return (
      <div class="academics" id="academics-bottom">Academics</div>
    );
  }
}

export { AcademicsUp, AcademicsDown };