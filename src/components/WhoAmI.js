import React from 'react';
class WhoAmIUp extends React.Component {



  render() {
    return (
      <div class="whoami" id="whoami-header">
        I'm Tanya, a second-year student at a multimedia engineering school (IMAC).

        I'm currently looking for a 6-month internship starting January 20 2025.

        I'm mainly looking for work in the fields of video game programming and web development.

        During my studies, I worked on a number of projects that gave me a wide range of skills

        that I'm sure I'll be able to put to good use during my internship.
      </div>
    );
  }
}


class WhoAmIDown extends React.Component {



  render() {
    return (
      <div class="whoami" id="whoami-bottom">
        Email            tanya.francois@outlook.fr
        <br></br>
        Github           github/2-1-1-2
        <br></br>
        Linkedin         linkedin/tanya-fran%C3%A7ois-b3a186273/
      </div>
    );
  }
}

export { WhoAmIUp, WhoAmIDown };